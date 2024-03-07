
import FreelancerModel from "../../../DB/models/freelancer_model.js";
import { validatePassword } from '../../middleware/val.middleware.js';
import bcrypt from 'bcrypt'


// Get All Freelancers
export const getAllFreelancers = async (req,res) => {
  try {
    const freelancers = await FreelancerModel.find();
    if(freelancers[0]){
      res.status(200).json({ freelancers });
    }else{
      res.status(400).json({msg:'No freelancers found'})
    }
  } catch (error) {
    res.status(500).json({msg:'Internal server error'});
  }
}

// Get A Freelancer
// Freelancer Photo
// medicine.image_url = "http://" + req.hostname + ":4000/" + medicine.image_url;

// Upload Image
export const uploadImage = async (req, res) => {
  try {
      if (!req.files || !req.files[0]) {
          console.log('No files found');
          return res.status(400).json({ msg: 'No files uploaded' });
      }

      console.log(req.files[0]);

      const imageUrl = `${req.protocol}://${req.headers.host}/${req.files[0].destination}/${req.files[0].filename}`;

      const freelancer = await FreelancerModel.findOneAndUpdate(
          { _id: req.user.id },
          { freelancerImage_url: imageUrl },
       
      );

      if (freelancer) {
          console.log('Freelancer updated:', freelancer);
          return res.status(200).json({ msg: 'Freelancer image updated successfully', imageUrl });
      } else {
          console.log('Invalid freelancer ID:', req.user.id);
          return res.status(400).json({ msg: 'Invalid freelancer ID' });
      }
  } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ msg: 'Internal server error', error: error.msg });
  }
};

export const createInforForFreelancer = async (req, res) => {
  try {
      const freelancerId = req.user.id;
      if (!freelancerId) {
          return res.status(400).json({ msg: 'You must log in first to create profile' });
      }

      // Await the findById() method to get the actual document
      const existFreelancer = await FreelancerModel.findById(freelancerId);
      if (!existFreelancer) {
          return res.status(400).json({ msg: 'Freelancer not found' });
      }

      const { freelancerPhoneNumber, freelancerCountry, freelancerDesc } = req.body;

      // Use findByIdAndUpdate() to update the document
      const newInfo = await FreelancerModel.findByIdAndUpdate(
          freelancerId,
          { freelancerPhoneNumber, freelancerCountry, freelancerDesc },
       
      );

      return res.status(200).json({ msg: 'Created info correct', newInfo });
  } catch (error) {
      console.error('Error creating freelancer info:', error);
      return res.status(500).json({ msg: 'Internal server error' });
  }
};

export const getFreelancerInfo = async (req, res) => {
  try {
    const freelancerId = req.params.id;

    // Query the database to find the freelancer by ID
    const freelancer = await FreelancerModel.findById(freelancerId);

    if (!freelancer) {
        return res.status(404).json({ msg: 'Freelancer not found' });
    }

    // Return the freelancer information
    res.status(200).json({ freelancer });
} catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
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
        update = { $set: { name: req.body.name, email: req.body.email, image_url: req.body.image_url, phoneNumber: req.body.phoneNumber, desc: req.body.desc, country: req.body.country } }
      }
      else {
        update = { $set: { name: req.body.name, email: req.body.email, image_url: req.body.image_url, phoneNumber: req.body.phoneNumber, desc: req.body.desc, country: req.body.country, image_url: req.file.filename } }
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
              return res.status(200).json({ msg: "Freelancer has been updated successfuly." });
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
