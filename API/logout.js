import admin_model from "./DB/models/admin_model.js";
import client_model from "./DB/models/client_model.js";
import freelancer_model from "./DB/models/freelancer_model.js";

const logout = async (req, res) => {
    try {
        const id = req.params.id
        let data;

        data = await admin_model.findById(id);
        if (!data) {
          data = await client_model.findById(id);
          if (!data) {
            data = await freelancer_model.findById(id);
            if (!data) {
              return res.status(400).json({ msg: "User not found" });
            }
          }
        }

        const filter = { _id: id };
        const update = { $set: { activityStatus: "offline", token: "null"} }

        let user;

        if(data){
            if(data.activityStatus === "online") {
                switch (data.role) {
                    case "admin":
                        user = await admin_model.updateOne(filter, update);
                      break;
                    case "client":
                        user = await client_model.updateOne(filter, update);
                      break;
                    case "freelancer":
                        user = await freelancer_model.updateOne(filter, update);
                      break;
                    default:
                      return res.status(400).json({ msg: "Role undefined" });
                }
                return res.status(200).json({ msg: "loged out successfuly."});
            }
            return res.status(400).json({ msg: "already loged out"});

        }
        res.status(400).json({ msg: "Invalid id"});
    } catch (error) {
        console.log(error);
        res.status(500).send("Somthing went wrong!");
    }
}

export default logout;