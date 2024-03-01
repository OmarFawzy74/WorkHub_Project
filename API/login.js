
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import AdminModel from "./DB/models/admin_model.js"
import ClientModel from "./DB/models/client_model.js"
import FreelancerModel from "./DB/models/freelancer_model.js"

const generateToken = async (userId, role) => {
    return jwt.sign({ userId, role }, process.env.TOKEN_SECRETkEY, { expiresIn: '1h' });
}

const login = async (req, res) => {
    try {
        const { role } = req.params;
        const { email, password} = req.body;
        let user;

        switch (role) {
            case 'admin':
                user = await AdminModel.findOne({ email });
                break;
            case 'client':
                user = await ClientModel.findOne({ email });
                break;
            case 'freelancer':
                user = await FreelancerModel.findOne({ email });
                break;
            default:
                return res.status(400).json({ message: "Role undefined" });
        }

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = await generateToken(user._id, role);
        res.status(200).json({ message: "Sign in successful", token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default login
