// import { User } from "../../DB/models/user.model.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import jwt from "jsonwebtoken";
// export const isAuthenticated = asyncHandler(async(req, res, next) => {
//     let { token } = req.headers;
//     if (!token) {
//         return next(new Error("tokenIsMissing :("));
//     }
//     if (!token.startsWith(process.env.BEARER_KEY)) {
//         return next(new Error("Invalid token :**"));
//     }
//     token = token.split(process.env.BEARER_KEY)[1];
//     const payload = jwt.verify(token, process.env.TOKEN_SECRETkEY);
//     const isUser = await User.findById(payload.id);
//     if (!isUser) {
//         return next(new Error("User not found :("));
//     }
//     req.payload = payload;
//     return next();
// });

// const jwt = require('jsonwebtoken');
// const AdminModel = require('../../DB/models/admin_model');
// const ClientModel = require('../../DB/models/client_model');
// const FreelancerModel = require('../../DB/models/freelancer_model');

import jwt from 'jsonwebtoken'
import AdminModel from '../../DB/models/admin_model.js'
import ClientModel from '../../DB/models/client_model.js'
import FreelancerModel from '../../DB/models/freelancer_model.js'


const auth = (data) => {
    return async (req, res, next) => {
        try {
            const headerToken = req.headers['authorization'];
            if (!headerToken || !headerToken.startsWith('Bearer')) {
                return res.status(400).json({ message: 'Invalid header token' });
            }
            const token = headerToken.split(" ")[1];
            const decoded = await jwt.verify(token, process.env.TOKENSECRETkEY);
            let user;
            switch (decoded.role) {
                case 'admin':
                    user = await AdminModel.findOne({ _id: decoded.userId });
                    break;
                case 'client':
                    user = await ClientModel.findOne({ _id: decoded.userId });
                    break;
                case 'freelancer':
                    user = await FreelancerModel.findOne({ _id: decoded.userId });
                    break;
                default:
                    return res.status(400).json({ message: "Invalid role" });
            }
            if (!user) {
                return res.status(400).json({ message: "Invalid token data" });
            } else {
                if (data.includes(user.role)) {
                    req.user = user;
                    return next();
                } else {
                    return res.status(403).json({ message: 'You are not authorized' });
                }
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };
};

export default auth