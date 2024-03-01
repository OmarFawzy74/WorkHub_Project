
import jwt from 'jsonwebtoken'
import AdminModel from '../../DB/models/admin_model.js'
import ClientModel from '../../DB/models/client_model.js'
import FreelancerModel from '../../DB/models/freelancer_model.js'


const auth = (data) => {
    return async (req, res, next) => {
        try {
            const headerToken = req.headers.token;

            if (!headerToken || !headerToken.startsWith('Bearer ')) {
                return res.status(400).json({ message: 'Invalid header token' });
            }

            const token = headerToken.split(" ")[1];
            const decoded = jwt.verify(token, process.env.TOKEN_SECRETkEY);
            let user;

            if(!decoded) {
                return res.status(400).send("invalid or expired token");
            }
            else {
                user = await AdminModel.findOne({ _id: decoded.userId });
                if(!user) {
                    user = await ClientModel.findOne({ _id: decoded.userId });
                    if(!user) {
                        user = await FreelancerModel.findOne({ _id: decoded.userId });
                        if(!user) {
                            return res.status(400).send("invalid or expired token");
                        }
                    }
                }
            }

            if (data.includes(user.role)) {
                return next();
            } else {
                return res.status(403).json({ message: 'You are not authorized' });
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };
};

export default auth