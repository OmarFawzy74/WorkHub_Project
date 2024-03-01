
import FreelancerModel from "../../../DB/models/freelancer_model.js"

export const uploadImage = async (req, res) => {
  try {
      if (!req.files || !req.files[0]) {
          console.log('No files found');
          return res.status(400).json({ message: 'No files uploaded' });
      }

      console.log(req.files[0]);

      const imageUrl = `${req.protocol}://${req.headers.host}/${req.files[0].destination}/${req.files[0].filename}`;

      const freelancer = await FreelancerModel.findOneAndUpdate(
          { _id: req.user.id },
          { freelancerImage_url: imageUrl },
       
      );

      if (freelancer) {
          console.log('Freelancer updated:', freelancer);
          return res.status(200).json({ message: 'Freelancer image updated successfully', imageUrl });
      } else {
          console.log('Invalid freelancer ID:', req.user.id);
          return res.status(400).json({ message: 'Invalid freelancer ID' });
      }
  } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const allFreelancer = async (req,res) => {
  try {
    const freelancers=await FreelancerModel.find({}).select('-password');
    if(freelancers){
      res.status(200).json({message:'all freelancer',freelancers});
    }else{
      res.status(400).json({message:'invalid request'})
    }
  } catch (error) {
    res.status(500).json({message:'Internal server error'});

    
  }

}

export const createInforForFreelancer = async (req, res) => {
  try {
      const freelancerId = req.user.id;
      if (!freelancerId) {
          return res.status(400).json({ message: 'You must log in first to create profile' });
      }

      // Await the findById() method to get the actual document
      const existFreelancer = await FreelancerModel.findById(freelancerId);
      if (!existFreelancer) {
          return res.status(400).json({ message: 'Freelancer not found' });
      }

      const { freelancerPhoneNumber, freelancerCountry, freelancerDesc } = req.body;

      // Use findByIdAndUpdate() to update the document
      const newInfo = await FreelancerModel.findByIdAndUpdate(
          freelancerId,
          { freelancerPhoneNumber, freelancerCountry, freelancerDesc },
       
      );

      return res.status(200).json({ message: 'Created info correct', newInfo });
  } catch (error) {
      console.error('Error creating freelancer info:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getFreelancerInfo = async (req, res) => {
  try {
    const freelancerId = req.params.id;

    // Query the database to find the freelancer by ID
    const freelancer = await FreelancerModel.findById(freelancerId);

    if (!freelancer) {
        return res.status(404).json({ message: 'Freelancer not found' });
    }

    // Return the freelancer information
    res.status(200).json({ freelancer });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
}
};


// module.exports = {
//   uploadImage,
//   allFreelancer,
//   createInforForFreelancer,
//   getFreelancerInfo,
// }