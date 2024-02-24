
import client from "../../../DB/models/client_model.js";
import bcrypt from "bcrypt";
import { validatePassword } from "../../middleware/val.middleware.js";

// Unfinished Tasks

// 1. Add Last Login Time
// 2. Check Authentication
// 3. Check Authorization

export const getAllClients = async (req, res) => {
    try {
        const allClients = await client.find();
        if(allClients.length !== 0) {
            res.status(200).send(allClients);
        }
        else {
            res.status(200).send("No clients found!");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Somthing went wrong!");
    }
}

export const addClient = async (req, res) => {
    try {
        const email = {clientEmail: req.body.clientEmail};
        const data = await client.find(email);

        if(data.length === 0) {
            const password = req.body.clientPassword;
            const confirmPassword = req.body.clientConfirmPassword;

            if(validatePassword(password)){
                if(password === confirmPassword) {
                    const hash = bcrypt.hashSync(password, 8);
                    const newClient = new client({
                        ...req.body,
                        clientPassword: hash
                    });
    
                    await newClient.save();
                    return res.status(200).send("Client has been created successfuly.");
                }
                return res.status(400).send("Passwords don't match.");
            }
            return res.status(400).send("Password is not valid. Please follow the password pattern.");
        }
        res.status(400).send("Client is already exists.");
    } catch (error) {
        console.log(error);
        res.status(500).send("Somthing went wrong!");
    }
}

export const updateClient = async (req, res) => {
    try {
        const clientId = req.params.id;
        const clientToUpdate = await client.findById(clientId);

        if(clientToUpdate) {
            const email = {clientEmail: req.body.clientEmail};
            const data = await client.find(email);

            var condition = data.length === 0;

            if(!condition) {
                condition = data[0].clientEmail === req.body.clientEmail;
            }

            if(condition) {
                const passwordInput = req.body.clientPassword;
                const clientPassword = data[0].clientPassword
                const match = await bcrypt.compare(passwordInput, clientPassword);

                if(match){
                    const newPassword = req.body.clientNewPassword;
                    const confirmNewPassword = req.body.clientConfirmNewPassword;

                    const newMatch = await bcrypt.compare(newPassword, clientPassword);
                    
                    if(!newMatch){
                        if(newPassword === confirmNewPassword) {
                            const filter = { _id: clientId };
                            if(validatePassword(newPassword)){
                                const newPasswordHash = bcrypt.hashSync(newPassword, 8);
                                const update = { $set: { clientName: req.body.clientName, clientDesc: req.body.clientDesc, clientEmail: req.body.clientEmail, clientPassword: newPasswordHash, clientImage_url: req.body.clientImage_url, clientCountry: req.body.clientCountry} }; // specify the update operation
            
                                await client.updateOne(filter, update);
                                return res.status(200).send("Client has been updated successfuly.");
                            }
                            return res.status(400).send("Password is not valid. Please follow the password pattern.");
                        }
                        return res.status(400).send("Passwords don't match.");
                    }
                    return res.status(400).send("You cannot use your current password as new password.");
                }
                return res.status(400).send("Wrong password.");
            }
            return res.status(400).send("You cannot use this email.");
        }

        res.status(200).send("There is no Client with such id to update.");
    } catch (error) {
        console.log(error);
        res.status(500).send("Somthing went wrong!");
    }
}

export const deleteClient = async (req, res) => {
    try {
        const clientId = req.params.id
        const clientToDelete = await client.findById(clientId);

        if(clientToDelete){
            const filter = { _id: clientId };

            await client.deleteOne(filter);
            return res.status(200).send("Client has been deleted successfuly.");
        }

        res.status(200).send("Client deletion failed.");
    } catch (error) {
        console.log(error);
        res.status(500).send("Somthing went wrong!");
    }
}