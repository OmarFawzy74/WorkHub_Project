
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
// import AdminModel from "./DB/models/admin_model.js"
import ClientModel from "./DB/models/client_model.js"
import FreelancerModel from "./DB/models/freelancer_model.js"

const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.TOKEN_SECRETkEY, { expiresIn: '1h' });
};

const signup = async (req, res) => {
  try {
    const { role } = req.params;
    const { username, email, password } = req.body;

    // Validate role
    if (!['client', 'freelancer'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Check if the user already exists in any of the models
    let existingUser;
    switch (role) {
      case 'client':
        existingUser = await ClientModel.findOne({ email });
        break;
      case 'freelancer':
        existingUser = await FreelancerModel.findOne({ email });
        break;
    }

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));

    // Create a new user instance based on the role
    let newUser;
    switch (role) {
      case 'client':
        newUser = new ClientModel({ username, email, password: hashedPassword });
        break;
      case 'freelancer':
        newUser = new FreelancerModel({ username, email, password: hashedPassword });
        break;
    }

    // Save the new user to the database
    await newUser.save();

    // Generate token for the new user
    const token = generateToken(newUser._id, role);

    // Respond with token and success message
    return res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default signup
