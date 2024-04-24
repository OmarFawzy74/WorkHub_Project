import express from 'express';
import {
  createReview,
  getAllReviews,
  getReviewById,
  deleteReview,
} from './reviewController.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import auth from '../../middleware/auth.middleware.js';
import endPoints from '../../middleware/endPoints.js';
import { validation } from '../../middleware/val.middleware.js';
import { reviewSchema } from './reviewSchema.js';

const router = express.Router();

// Routes

router.post('/addReview', validation(reviewSchema),asyncHandler(createReview) ); //, auth(endPoints.allUsers)
router.get('/getAllReviews', asyncHandler(getAllReviews)); // auth(endPoints.allUsers),
router.get('/reviews/:id', asyncHandler(getReviewById) );
router.delete('/reviews/:id', asyncHandler(deleteReview) );

export default router;