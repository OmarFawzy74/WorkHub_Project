
import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import { DBconnection } from './DB/connection.js';
import multer from 'multer'
import { nanoid } from 'nanoid';
import path from 'path'

import freelancersRoutes from './src/modules/freelancer/freelancer_routes.js'
import adminRoutes from './src/modules/admin/admin_routes.js'
import categoriesRoute from './src/modules/categories/categoriesRoutes.js'
import clientsRoute from './src/modules/clients/clientsRoutes.js'
import ordersRoute from './src/modules/orders/ordersRoutes.js'
import requestsRoute from './src/modules/requests/requestsRoutes.js'
import communitiesRoutes from './src/modules/communities/communitiesRoutes.js'

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

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploadImages')
    },
    filename: function(req, file, cb) {
  
        cb(null, nanoid() + "_" + file.originalname)
    }
  })

const upload = multer({dest:'uploadImages', fileFilter, storage});
app.use(upload.array('image', 15));

// app.use('/uploadImages',express.static(path.join(__dirname,'uploadImages')));
app.use('/uploadImages', express.static(new URL('uploadImages', import.meta.url).pathname));

function fileFilter (req, file, cb) {
    if(file.mimetype==='image/png'||file.mimetype==='image/jpg'||file.mimetype==='image/jpeg') {
        cb(null, true)
    }
    else {
        cb('sorry invalid image', false)
    }
}

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
    DBconnection();
});