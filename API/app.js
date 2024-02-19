import express from 'express'
import { DBconnection } from './DB/connection.js';
import userRouter from './src/modules/users/user.router.js';
import noteRouter from './src/modules/notes/note.router.js';
import dotenv from "dotenv";
import cors from "cors";
import path from "path"
import { User } from './DB/models/user.model.js';
const app = express()
dotenv.config();
const port = process.env.PORT;

//API's
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//user api
app.use("/user", userRouter);
//note api
app.use("/note", noteRouter);

app.all("*", (req, res) => {
    return res.status(404).json({ success: false, message: "Page Not Found !!! :(" })
});

app.use((error, req, res, next) => {
    const statusCode = error.cause || 500;
    return res.status(statusCode).json({
        success: false,
        message: error.message,
        stack: error.stack
    });
})
await DBconnection();
app.listen(port, () => console.log(`App listening on port ${port}<3`))