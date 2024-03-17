
import client from "../../../DB/models/client_model.js";
import bcrypt from "bcrypt";
import { validatePassword } from "../../middleware/val.middleware.js";
import ClientModel from "../../../DB/models/client_model.js"

// Get All Clients
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

// Update Client Info
export const updateClientInfo = async (req, res) => {
    try {
  
        let update;
        console.log(req);
        if(!req.file) {
          update = { $set: { name: req.body.name, email: req.body.email } }
        }
        else {
          update = { $set: { name: req.body.name, email: req.body.email, image_url: req.file.filename } }
        }
  
        const clientId = req.params.id;
        console.log(clientId);
        const clientToUpdate = await ClientModel.findById(clientId);
  
        if(clientToUpdate) {
            const clientEmail = {email: req.body.email};
            const clientData = await ClientModel.find(clientEmail);
            console.log(clientData);
  
            let condition = clientData.length === 0;
  
            if(!condition) {
                condition = clientData[0].email === req.body.email;
            }
  
            if(condition) {
                const filter = { _id: clientId };

                await ClientModel.updateOne(filter, update);
                return res.status(200).json({ msg: "Client has been updated successfuly." });
            }
            return res.status(400).json({ msg: "You cannot use this email." });
        }
        res.status(200).json({ msg: "There is no Client with such id to update." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Somthing went wrong!" });
    }
}
  
// Update Client Password
export const updateClientPassword = async (req, res) => {
    try {
        const clientId = req.params.id;
        const clientToUpdate = await ClientModel.findById(clientId);

  
        if (clientToUpdate) {
          const passwordInput = req.body.password;
          const clientPassword = clientToUpdate.password;
          const match = await bcrypt.compare(passwordInput, clientPassword);
  
          if (match) {
            const newPassword = req.body.newPassword;
            const confirmNewPassword = req.body.confirmNewPassword;
            const newMatch = await bcrypt.compare(newPassword, clientPassword);
  
            if (!newMatch) {
              if (newPassword === confirmNewPassword) {
                if (validatePassword(newPassword)) {
                  const filter = { _id: clientId };
                  const newPasswordHash = bcrypt.hashSync(newPassword, parseInt(process.env.SALT_ROUND));
  
                  const update = { $set: { password: newPasswordHash, token: "null" } };
  
                  await ClientModel.updateOne(filter, update);
                  return res.status(200).json({ msg:"Client has been updated successfuly." });
                }
                return res.status(400).json({ msg: "Password is not valid. Please follow the password pattern." });
              }
              return res.status(400).json({ msg: "Passwords don't match." });
            }
            return res.status(400).json({ msg: "You cannot use your current password as new password." });
          }
          return res.status(400).json({ msg: "Wrong password." });
        }
        res.status(200).json({ msg: "There is no Client with such id to update." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Somthing went wrong!" });
    }
}

// Delete Client
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