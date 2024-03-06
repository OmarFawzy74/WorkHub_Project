
import FreelancerModel from "../../../DB/models/freelancer_model.js";

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
      res.status(500).send("Somthing went wrong!");
  }
}

// Update Freelancer Info
export const updateFreelancerInfo = async (req, res) => {
  try {
      const adminId = req.params.id;
      console.log(adminId);
      const adminToUpdate = await FreelancerModel.findById(adminId);

      if(adminToUpdate) {
          const adminEmail = {email: req.body.email};
          const adminData = await FreelancerModel.find(adminEmail);
          console.log(adminData);

          let condition = adminData.length === 0;

          if(!condition) {
              condition = adminData[0].email === req.body.email;
          }

          if(condition) {
              const filter = { _id: adminId };
              const update = { $set: { username: req.body.username, email: req.body.email, image_url: req.body.image_url } }
              await FreelancerModel.updateOne(filter, update);
              return res.status(200).send("Freelancer has been updated successfuly.");
          }
          return res.status(400).send("You cannot use this email.");
      }
      res.status(200).send("There is no Freelancer with such id to update.");
  } catch (error) {
      console.log(error);
      res.status(500).send("Somthing went wrong!");
  }
}

// Update Freelancer Password
export const updateFreelancerPassword = async (req, res) => {
  try {
      const adminId = req.params.id;
      console.log(adminId);
      const adminToUpdate = await FreelancerModel.findById(adminId);

      if(adminToUpdate) {
          const adminEmail = {email: req.body.email};
          const adminData = await FreelancerModel.find(adminEmail);
          console.log(adminData);

          let condition = adminData.length === 0;

          if(!condition) {
              condition = adminData[0].email === req.body.email;
          }

          if(condition) {
              if(adminData.includes(req.body.password)) {
                  const passwordInput = req.body.adminPassword;
                  const adminPassword = data[0].adminPassword;
                  const match = await bcrypt.compare(passwordInput, adminPassword);

                  if(match){
                      const newPassword = req.body.adminNewPassword;
                      const confirmNewPassword = req.body.adminConfirmNewPassword;

                      const newMatch = await bcrypt.compare(newPassword, adminPassword);
                      
                      if(!newMatch){
                          if(newPassword === confirmNewPassword) {
                              const filter = { _id: adminId };
                              if(validatePassword(newPassword)){
                                  const newPasswordHash = bcrypt.hashSync(newPassword, process.env.SALT_ROUND);
                                  const update = { $set: { Password: newPasswordHash, token: "null" } };
              
                                  await FreelancerModel.updateOne(filter, update);
                                  return res.status(200).send("Freelancer has been updated successfuly.");
                              }
                              return res.status(400).send("Password is not valid. Please follow the password pattern.");
                          }
                          return res.status(400).send("Passwords don't match.");
                      }
                      return res.status(400).send("You cannot use your current password as new password.");
                  }
                  return res.status(400).send("Wrong password.");
              }
              const filter = { _id: adminId };
              const update = { $set: { username: req.body.username, email: req.body.email, image_url: req.body.image_url } }
              await FreelancerModel.updateOne(filter, update);
              return res.status(200).send("Freelancer has been updated successfuly.");
          }
          return res.status(400).send("You cannot use this email.");
      }
      res.status(200).send("There is no Freelancer with such id to update.");
  } catch (error) {
      console.log(error);
      res.status(500).send("Somthing went wrong!");
  }
}
