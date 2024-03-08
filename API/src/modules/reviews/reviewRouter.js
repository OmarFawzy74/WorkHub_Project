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

router.post('/reviews', auth(endPoints.allUsers),validation(reviewSchema),asyncHandler(createReview) );
router.get('/reviews', auth(endPoints.allUsers), asyncHandler(getAllReviews));
router.get('/reviews/:id', auth(endPoints.allUsers),asyncHandler(getReviewById) );
router.delete('/reviews/:id', auth(endPoints.allUsers),asyncHandler(deleteReview) );

export default router;