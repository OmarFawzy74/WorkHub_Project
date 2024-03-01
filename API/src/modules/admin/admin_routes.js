
import express from "express";
import login from '../../../login.js'
import valMiddleware from '../../middleware/val.middleware.js'
import validation from '../validation/validation.js'
import signupForAdmin from './adminController.js'

const router = express.Router();

router.post('/user/admin/signup', signupForAdmin);
router.post('/user/admin/login/:role', valMiddleware(validation.loginSchema), login);

export default router;