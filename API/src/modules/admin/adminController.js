
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import AdminModel from '../../../DB/models/admin_model.js'


const signupForAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if admin with given email already exists
        const admin = await AdminModel.findOne({ email });
        if (admin) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password asynchronously
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALTROUND));

        // Create a new admin instance
        const newAdmin = new AdminModel({
            username,
            email,
            password: hashedPassword
        });

        // Save the new admin to the database
        await newAdmin.save();

        // Generate token for the new admin
        const token = jwt.sign({ userId: newAdmin._id }, process.env.TOKEN_SECRETkEY, { expiresIn: '1h' });

        // Send response with token
        res.status(200).json({ message: 'Admin added successfully', token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error',error });
    }
};

export default signupForAdmin