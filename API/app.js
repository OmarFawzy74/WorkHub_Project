
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const DBconnection = require('./DB/connection.js');
const categoriesRoutes = require('./src/modules/categories/categoriesRoutes.js');
const patients = require('./routes/Patients');
const categories = require('./routes/Categories');
const orders = require('./routes/Orders');

const app = express()
dotenv.config();
const port = process.env.PORT;

//API's
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//freelanncer api
app.use("/freelanncer", freelanncerRouter);
//client api
app.use("/client", client);
//Categories api
app.use("/Categories", categoriesRoutes);

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