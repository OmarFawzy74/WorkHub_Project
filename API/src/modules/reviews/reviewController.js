import Review from '../../../DB/models/review_model.js';

// Create a new review
export const createReview = async (req, res) => {

    const { client, rating, reviewDesc } = req.body;
    const newReview = new Review({
      client,
      rating,
      reviewDesc,
    });
    await newReview.save();
    res.status(201).json({success:true, message: 'Review created successfully', newReview });
 
};

// Get all reviews
export const getAllReviews = async (req, res) => {
    const reviews = await Review.find();
    res.status(200).json({success:true, message:"here u r", reviews});
};

// Get review by ID
export const getReviewById = async (req, res) => {

    const review = await Review.findById(req.params.id);
    if (!review) {
      return next(new Error("review not found",{cause:404}));
    }
    res.status(200).json({success:true, message:"here u r", review});

};

// Delete a review
export const deleteReview = async (req, res) => {
  
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
        return next(new Error("review not found",{cause:404}));
    }
    res.status(200).json({success:true, message:"review deleted successfully", review});
 
};