import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import AdminModel from "../../../DB/models/admin_model.js";
import ClientModel from "../../../DB/models/client_model.js";
import FreelancerModel from "../../../DB/models/freelancer_model.js";

const generateToken = async (userId, role) => {
  return jwt.sign({ userId, role }, process.env.TOKEN_SECRETkEY);
  // return jwt.sign({ userId, role }, process.env.TOKEN_SECRETkEY, { expiresIn: '1h' });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    let user;

    user = await AdminModel.findOne({ email: email });
    if (!user) {
      user = await ClientModel.findOne({ email: email });
      if (!user) {
        user = await FreelancerModel.findOne({ email: email });
        if (!user) {
          return res.status(400).json({ msg: "Wrong email or password" });
        }
      }
    }

    if(user.activityStatus === "online") {
      return res.status(400).json({ msg: "Already loged in" });
    }

    if(user.activityStatus === "online" && user.lastLogin === undefined) {
      return res.status(400).json({ msg: "Already loged in" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Wrong email or password" });
    }

    const token = await generateToken(user._id, user.role);
    const filter = { _id: user._id };
    const update = {
      $set: { lastLogin: new Date(), activityStatus: "online", token: token },
    };
    let process;

    switch (user.role) {
      case "admin":
        process = await AdminModel.updateOne(filter, update);
        break;
      case "client":
        process = await ClientModel.updateOne(filter, update);
        break;
      case "freelancer":
        process = await FreelancerModel.updateOne(filter, update);
        break;
      default:
        return res.status(400).json({ msg: "Role undefined" });
    }


    let userData;
    switch (user.role) {
      case "admin":
        userData = await AdminModel.findById(filter);
        break;
      case "client":
        userData = await ClientModel.findById(filter);
        break;
      case "freelancer":
        userData = await FreelancerModel.findById(filter);
        break;
      default:
        return res.status(400).json({ msg: "Role undefined" });
    }

    res.status(200).json({ msg: "Sign in successful" , userData});
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const logout = async (req, res) => {
    try {
        const id = req.params.id
        let data;

        data = await AdminModel.findById(id);
        if (!data) {
          data = await ClientModel.findById(id);
          if (!data) {
            data = await FreelancerModel.findById(id);
            if (!data) {
              return res.status(400).json({ msg: "User not found" });
            }
          }
        }

        const filter = { _id: id };
        const update = { $set: { activityStatus: "offline", token: "null"} }

        let user;

        if(data){
            if(data.activityStatus === "online") {
                switch (data.role) {
                    case "admin":
                        user = await AdminModel.updateOne(filter, update);
                      break;
                    case "client":
                        user = await ClientModel.updateOne(filter, update);
                      break;
                    case "freelancer":
                        user = await FreelancerModel.updateOne(filter, update);
                      break;
                    default:
                      return res.status(400).json({ msg: "Role undefined" });
                }
                return res.status(200).json({ msg: "loged out successfuly."});
            }
            return res.status(400).json({ msg: "already loged out"});
        }
        res.status(400).json({ msg: "Invalid id"});
    } catch (error) {
        console.log(error);
        res.status(500).send("Somthing went wrong!");
    }
};

export const signup = async (req, res) => {
    try {
      const { role } = req.params;
      const { name, email, password, country, desc, phoneNumber } = req.body;
      let image_url;
  
      if(req.file) {
        image_url = req.file.filename;
      }

      const adminEmail = await AdminModel.findOne({ email });
  
      if(adminEmail) {
        return res.status(400).json({ message: "This Email is already registerd" });
      }
  
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
      const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUND));
  
      // Create a new user instance based on the role
      let newUser;
      switch (role) {
        case 'client':
          newUser = new ClientModel({ name, email, password: hashedPassword, country, image_url });
          break;
        case 'freelancer':
          newUser = new FreelancerModel({ name, email, password: hashedPassword, country, image_url, desc, phoneNumber });
          break;
      }
  
      await newUser.save();
  
      const token = await generateToken(newUser._id, role);
      const filter = { _id: newUser._id };
      const update = { $set: { token: token, activityStatus: "online" } }
      let query;
  
      switch (role) {
        case 'client':
          query = await ClientModel.updateOne(filter, update);
          break;
        case 'freelancer':
          query = await FreelancerModel.updateOne(filter, update);
          break;
      }
  
      let userData;
      switch (role) {
        case 'client':
          userData = await ClientModel.findOne({ email });
          break;
        case 'freelancer':
          userData = await FreelancerModel.findOne({ email });
          break;
      }
  
      return res.status(201).json({ message: 'User created successfully', userData });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
};

export default login