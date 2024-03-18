import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import AdminModel from "./DB/models/admin_model.js";
import ClientModel from "./DB/models/client_model.js";
import FreelancerModel from "./DB/models/freelancer_model.js";

export const generateToken = async (userId, role) => {
  return jwt.sign({ userId, role }, process.env.TOKEN_SECRETkEY);
  // return jwt.sign({ userId, role }, process.env.TOKEN_SECRETkEY, { expiresIn: '1h' });
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
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
        process = await ClientModel.findById(filter);
        break;
      case "freelancer":
        process = await FreelancerModel.findById(filter);
        break;
      default:
        return res.status(400).json({ msg: "Role undefined" });
    }

    res.status(200).json({ msg: "Sign in successful", token , userData});
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export default login;
