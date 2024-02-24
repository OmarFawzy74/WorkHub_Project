
import express from 'express';
import { DBconnection } from './DB/connection.js';
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import categoriesRoute from './src/modules/categories/categoriesRoutes.js'
import clientsRoute from './src/modules/clients/clientsRoutes.js'
import ordersRoute from './src/modules/orders/ordersRoutes.js'
import requestsRoute from './src/modules/requests/requestsRoutes.js'

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());


app.use("/api/categories", categoriesRoute);
app.use("/api/clients", clientsRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/requests", requestsRoute);
// app.use("/api/auth", authRoute);
// app.use("/api/service", serviceRoute);
// app.use("/api/message", messageRoute);
// app.use("/api/conversation", conversationRoute);
// app.use("/api/review", reviewRoute);

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

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
    DBconnection();
});