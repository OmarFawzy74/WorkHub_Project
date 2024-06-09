
import mongoose from "mongoose";
import FreelancerModel from "../../../DB/models/freelancer_model.js";
import { validatePassword } from '../../middleware/val.middleware.js';
import bcrypt from 'bcrypt'
import blockedUsers_model from "../../../DB/models/blockedUsers_model.js";

// Get All Freelancers
export const getAllFreelancers = async (req,res) => {
  try {
      var freelancers = await FreelancerModel.find();
      if(freelancers[0]){
        const modifiedFreelancers = freelancers.map((freelancer) => {
          const modifiedFreelancer = { ...freelancer._doc }; // Create a copy of the service object
          modifiedFreelancer.image_url = "http://" + req.hostname + ":3000/" + modifiedFreelancer.image_url;
          return modifiedFreelancer;
      });

      freelancers = modifiedFreelancers;

      return res.status(200).json({ freelancers });
    }
    res.status(400).json({msg:'No freelancers found'})
  } 
  catch (error) {
    res.status(500).json({msg:'Internal server error'});
    console.log(error);
  }
}

export const getBlockedAndFreeFreelancers = async (req, res) => {
  try {
      var freelancers = await FreelancerModel.find();
      const blockedusersdata = await blockedUsers_model.find();

      if(!freelancers[0]) {
        return res.status(404).json({ msg:"No freelancers found!"});
      }

      const blockedFreelancers = [];

      const modifiedFreelancers = freelancers.map((freelancer) => {
        const modifiedFreelancer = { ...freelancer._doc }; // Create a copy of the service object
        modifiedFreelancer.image_url = "http://" + req.hostname + ":3000/" + modifiedFreelancer.image_url;

        if(blockedusersdata[0]) {
          blockedusersdata.filter((user) => {
            if(user.userId.valueOf() == modifiedFreelancer._id.valueOf()) {
              blockedFreelancers.push(modifiedFreelancer);
            }
          })
        }

        return modifiedFreelancer;
      });

      freelancers = modifiedFreelancers;

      res.status(200).json({freelancers, blockedFreelancers});
  } catch (error) {
      console.log(error);
      res.status(500).send("Somthing went wrong!");
  }
}

// Get FreelancerById
export const getFreelancerById = async (req, res, next) => {
  try {
    const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send({ success: false, message: "Invalid id" });
  }

  const freelancer = await FreelancerModel.findById(id);

  if (!freelancer) {
    return res.status(404).json({msg: "Freelancer not found"});
  }

  freelancer.image_url = "http://" + req.hostname + ":3000/" + freelancer.image_url;
  freelancer.coverImage_url = "http://" + req.hostname + ":3000/" + freelancer.coverImage_url;

  res.status(200).json({ freelancer });
  } catch (error) {
    console.log(error);
    res.status(500).json({msg: "Internal Server Error"});
  }
};

// Delete Freelancer
export const deleteFreelancer = async (req, res) => {
  try {
      const freelancerId = req.params.id
      const freelancerToDelete = await FreelancerModel.findById(freelancerId);

      if(freelancerToDelete){
          const filter = { _id: freelancerId };

          await FreelancerModel.deleteOne(filter);
          return res.status(200).json({ msg: "Freelancer has been deleted successfuly." });
      }
      res.status(200).json({ msg: "Freelancer doesn't exist." });
  } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Somthing went wrong!" });
  }
}

// Update Freelancer Info
export const updateFreelancerInfo = async (req, res) => {
  try {

      let update;
      console.log(req);
      if(!req.file) {
        update = { $set: { name: req.body.name, email: req.body.email, phoneNumber: req.body.phoneNumber, desc: req.body.desc, country: req.body.country, skills: req.body.skills, languages: req.body.languages } }
      }
      else {
        update = { $set: { name: req.body.name, email: req.body.email, phoneNumber: req.body.phoneNumber, desc: req.body.desc, country: req.body.country, image_url: req.file.filename, skills: req.body.skills, languages: req.body.languages} }
      }

      const freelancerId = req.params.id;
      console.log(freelancerId);
      const freelancerToUpdate = await FreelancerModel.findById(freelancerId);

      if(freelancerToUpdate) {
          const freelancerEmail = {email: req.body.email};
          const freelancerData = await FreelancerModel.find(freelancerEmail);
          console.log(freelancerData);

          let condition = freelancerData.length === 0;

          if(!condition) {
              condition = freelancerData[0].email === req.body.email;
          }

          if(condition) {
              const filter = { _id: freelancerId };
            //   const update = { $set: { name: req.body.name, email: req.body.email, image_url: req.body.image_url, phoneNumber: req.body.phoneNumber, desc: req.body.desc, country: req.body.country } }
              await FreelancerModel.updateOne(filter, update);

              const freelancerNewData = await FreelancerModel.findById(freelancerId);
              freelancerNewData.image_url = "http://" + req.hostname + ":3000/" + freelancerNewData.image_url;
              return res.status(200).json({ msg: "Freelancer has been updated successfuly.", freelancerNewData});
          }
          return res.status(400).json({ msg: "You cannot use this email." });
      }
      res.status(200).json({ msg: "There is no Freelancer with such id to update." });
  } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Somthing went wrong!" });
  }
}

// Update Freelancer Password
export const updateFreelancerPassword = async (req, res) => {
  try {
      const freelancerId = req.params.id;
    //   console.log(freelancerId);
      const freelancerToUpdate = await FreelancerModel.findById(freelancerId);
    //   console.log(freelancerToUpdate.password);

      if (freelancerToUpdate) {
        const passwordInput = req.body.password;
        const freelancerPassword = freelancerToUpdate.password;
        const match = await bcrypt.compare(passwordInput, freelancerPassword);

        if (match) {
          const newPassword = req.body.newPassword;
          const confirmNewPassword = req.body.confirmNewPassword;
        //   const newPasswordHash = bcrypt.hashSync(newPassword, parseInt(process.env.SALT_ROUND));
          const newMatch = await bcrypt.compare(newPassword, freelancerPassword);

          if (!newMatch) {
            if (newPassword === confirmNewPassword) {
              if (validatePassword(newPassword)) {
                const filter = { _id: freelancerId };
                const newPasswordHash = bcrypt.hashSync(newPassword, parseInt(process.env.SALT_ROUND));

                const update = { $set: { password: newPasswordHash, token: "null" } };

                await FreelancerModel.updateOne(filter, update);
                return res.status(200).json({ msg:"Freelancer has been updated successfuly." });
              }
              return res.status(400).json({ msg: "Password is not valid. Please follow the password pattern." });
            }
            return res.status(400).json({ msg: "Passwords don't match." });
          }
          return res.status(400).json({ msg: "You cannot use your current password as new password." });
        }
        return res.status(400).json({ msg: "Wrong password." });
      }
      res.status(200).json({ msg: "There is no Freelancer with such id to update." });
  } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Somthing went wrong!" });
  }
}