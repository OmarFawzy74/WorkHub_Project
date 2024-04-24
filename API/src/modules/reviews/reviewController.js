import Review from '../../../DB/models/review_model.js';

// Create a new review
export const createReview = async (req, res) => {
    try {
        const { clientId, rating, reviewDesc } = req.body;
        const newReview = new Review({
          clientId,
          rating,
          reviewDesc,
        });
    
        await newReview.save();
    
        res.status(201).json({success:true, message: 'Review created successfully', newReview });
    } catch (error) {
        res.status(500).json({msg:'Internal server error'});
        console.log(error);
    }
};

// Get all reviews
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json({success:true, message:"here u r", reviews});
    } catch (error) {
        res.status(500).json({msg:'Internal server error'});
        console.log(error);
    }
};

// Get review by ID
export const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
          return next(new Error("review not found",{cause:404}));
        }
        
        res.status(200).json({success:true, message:"here u r", review});
    } catch (error) {
        res.status(500).json({msg:'Internal server error'});
        console.log(error);
    }
};

// Delete a review
export const deleteReview = async (req, res) => {
  
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
        return next(new Error("review not found",{cause:404}));
    }
    res.status(200).json({success:true, message:"review deleted successfully", review});
 
};