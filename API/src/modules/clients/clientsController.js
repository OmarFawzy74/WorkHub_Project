
import client from "../../../DB/models/Client_model.js";

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
        const newClient = new client({
            ...req.body,
        });

        await newClient.save();
        res.status(200).send("Client has been created successfuly.");
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
            const filter = { _id: clientId }; // specify the condition to match the document
            const update = { $set: { clientName: req.body.clientName, clientDesc: req.body.clientDesc, clientEmail: req.body.clientEmail, clientPassword: req.body.clientPassword, clientImage_url: req.body.clientImage_url, clientCountry: req.body.clientCountry} }; // specify the update operation

            await client.updateOne(filter, update);
            res.status(200).send("Client has been updated successfuly.");
        }
        else {
            res.status(200).send("There is no Client with such id to update.");
        }
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
            res.status(200).send("Client has been deleted successfuly.");
        }
        else {
            res.status(200).send("Client deletion failed.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Somthing went wrong!");
    }
}