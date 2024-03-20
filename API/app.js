
import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import { DBconnection } from './DB/connection.js';

import freelancersRoutes from './src/modules/freelancer/freelancer_routes.js'
import adminRoutes from './src/modules/admin/admin_routes.js'
import categoriesRoute from './src/modules/categories/categoriesRoutes.js'
import clientsRoute from './src/modules/clients/clientsRoutes.js'
import ordersRoute from './src/modules/orders/ordersRoutes.js'
import requestsRoute from './src/modules/requests/requestsRoutes.js'
import communitiesRoutes from './src/modules/communities/communitiesRoutes.js'
import conversationsRoutes from './src/modules/conversations/conversationsRoutes.js'
import messagesRoutes from './src/modules/messages/messagesRoutes.js'
import postsRoutes from './src/modules/posts/post_routes.js'
import professorsRoutes from './src/modules/professors/professorsRoutes.js'
import authRoutes from './src/modules/auth/authRoutes.js'
import servicesRoutes from './src/modules/service/service.router.js'
import reviewsRoutes from './src/modules/reviews/reviewRouter.js'
import coursesRoutes from './src/modules/courses/coursesRoutes.js'

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/categories", categoriesRoute);
app.use("/api/clients", clientsRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/requests", requestsRoute);
app.use("/api/freelancers", freelancersRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/communities", communitiesRoutes);
app.use("/api/conversations", conversationsRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/professors", professorsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/courses", coursesRoutes);



// app.use(freelncerRoutes,adminRoutes,clientRoutes);

app.all("*", (req, res) => {
    return res.status(404).json({ success: false, message: "Page Not Found !!! :(" });
});

app.use((error, req, res, next) => {
    const statusCode = error.cause || 500;
    return res.status(statusCode).json({
        success: false,
        message: error.message,
        stack: error.stack
    });
});

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploadImages')
//     },
//     filename: function(req, file, cb) {
  
//         cb(null, nanoid() + "_" + file.originalname)
//     }
//   })

// const upload = multer({dest:'uploadImages', fileFilter, storage});
// app.use(upload.array('image', 15));

// app.use('/uploadImages',express.static(path.join(__dirname,'uploadImages')));
// app.use('/uploadImages', express.static(new URL('uploadImages', import.meta.url).pathname));

// function fileFilter (req, file, cb) {
//     if(file.mimetype==='image/png'||file.mimetype==='image/jpg'||file.mimetype==='image/jpeg') {
//         cb(null, true)
//     }
//     else {
//         cb('sorry invalid image', false)
//     }
// }

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
    DBconnection();
});