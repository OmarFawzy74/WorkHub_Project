import { User } from "../../DB/models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
export const isAuthenticated = asyncHandler(async(req, res, next) => {
    let { token } = req.headers;
    if (!token) {
        return next(new Error("tokenIsMissing :("));
    }
    if (!token.startsWith(process.env.BEARER_KEY)) {
        return next(new Error("Invalid token :**"));
    }
    token = token.split(process.env.BEARER_KEY)[1];
    const payload = jwt.verify(token, process.env.TOKEN_SECRETkEY);
    const isUser = await User.findById(payload.id);
    if (!isUser) {
        return next(new Error("User not found :("));
    }
    req.payload = payload;
    return next();
});