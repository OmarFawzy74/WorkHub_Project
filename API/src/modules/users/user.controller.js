import { User } from "../../../DB/models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { Note } from "../../../DB/models/note.model.js";
export const signup = async (req, res, next) => {

    const { name, email, password, age, confirmPassword } = req.body;
    if (password != confirmPassword) {
        return next(new Error("password dosen't match :(", { cause: 400 }));
    }
    const confirmEmail = await User.findOne({ email });
    if (confirmEmail) {
        return next(new Error("this email is already exist :(", { cause: 400 }));
    }
    const hashPassword = bcryptjs.hashSync(password, parseInt(process.env.SALT_ROUND));
    await User.create({ name, email, password: hashPassword, age });
    return res.status(201).json({ success: true, message: "user created successfully <3" });
};

export const signin = async (req, res, next) => {

    const { email, password } = req.body;

    const isUser = await User.findOne({ email });
    if (!isUser) {
        return next(new Error("wrong email", { cause: 401 }));
    }


    const confirmPassword = bcryptjs.compareSync(password, isUser.password);
    if (!confirmPassword) {
        return next(new Error("wrong password :(", { cause: 400 }));
    }

    const token = jwt.sign({ id: isUser._id, email: isUser.email }, process.env.TOKEN_SECRETkEY);

    return res.status(200).json({ success: true, token });

}

