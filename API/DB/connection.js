
const mongoose = require("mongoose");

export const DBconnection = async () => {
    return await mongoose.connect(process.env.CONNECTION_URL).
        then(() => console.log(" Database connected succefully")).
        catch(((error)=> console.log("Database connection failed :(")));
}