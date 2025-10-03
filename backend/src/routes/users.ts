import { Router } from 'express';
import { body, param } from 'express-validator';
import { authenticate } from '@/middleware/auth';
import { validate } from '@/middleware/validate';
import { usersController } from '@/controllers/usersController';

const router = Router();

// All user routes require authentication
router.use(authenticate);

// Get user profile
router.get('/profile', usersController.getProfile);

// Update user profile
router.patch(
  '/profile',
  [
    body('firstName')
      .optional()
      .trim()
      .isLength({ max: 50 })
      .withMessage('First name must be less than 50 characters'),
    body('lastName')
      .optional()
      .trim()
      .isLength({ max: 50 })
      .withMessage('Last name must be less than 50 characters'),
    body('preferredLanguage')
      .optional()
      .isIn(['fi', 'en', 'tr', 'ar', 'ru', 'so'])
      .withMessage('Invalid language selection'),
    body('city')
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage('City must be less than 100 characters'),
    body('countryOfOrigin')
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage('Country must be less than 100 characters'),
    body('educationLevel')
      .optional()
      .isIn(['primary', 'secondary', 'vocational', 'university', 'postgraduate'])
      .withMessage('Invalid education level'),
    body('workExperience')
      .optional()
      .isIn(['none', '0-1', '1-3', '3-5', '5-10', '10+'])
      .withMessage('Invalid work experience range'),
  ],
  validate,
  usersController.updateProfile
);

// Get user progress
router.get('/progress', usersController.getProgress);

// Get user notifications
router.get('/notifications', usersController.getNotifications);

// Mark notification as read
router.patch(
  '/notifications/:id/read',
  [
    param('id').isUUID().withMessage('Invalid notification ID'),
  ],
  validate,
  usersController.markNotificationRead
);

export { router as usersRouter };