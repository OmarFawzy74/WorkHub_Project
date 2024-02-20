
import express from 'express';
import { DBconnection } from './DB/connection.js';
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

// app.use("/api/category", categoryRoute);
// app.use("/api/auth", authRoute);
// app.use("/api/client", clientRoute);
// app.use("/api/service", serviceRoute);
// app.use("/api/message", messageRoute);
// app.use("/api/conversation", conversationRoute);
// app.use("/api/order", orderRoute);
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