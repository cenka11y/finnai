import { Router } from 'express';
import { body, param, query } from 'express-validator';

import { authController } from '@/controllers/authController';
import { authenticate } from '@/middleware/auth';
import { validate } from '@/middleware/validate';
import { rateLimiter } from '@/middleware/rateLimiter';

const router = Router();

// Registration
router.post(
  '/register',
  rateLimiter.register,
  [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 8, max: 128 })
      .withMessage('Password must be between 8 and 128 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
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
  ],
  validate,
  authController.register
);

// Login
router.post(
  '/login',
  rateLimiter.login,
  [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Valid email is required'),
    body('password')
      .notEmpty()
      .withMessage('Password is required'),
  ],
  validate,
  authController.login
);

// Logout
router.post(
  '/logout',
  authenticate,
  authController.logout
);

// Refresh token
router.post(
  '/refresh',
  authController.refreshToken
);

// Email verification
router.get(
  '/verify-email/:token',
  [
    param('token')
      .isUUID()
      .withMessage('Invalid verification token'),
  ],
  validate,
  authController.verifyEmail
);

// Forgot password
router.post(
  '/forgot-password',
  rateLimiter.forgotPassword,
  [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Valid email is required'),
  ],
  validate,
  authController.forgotPassword
);

// Reset password
router.post(
  '/reset-password',
  rateLimiter.resetPassword,
  [
    body('token')
      .isUUID()
      .withMessage('Invalid reset token'),
    body('password')
      .isLength({ min: 8, max: 128 })
      .withMessage('Password must be between 8 and 128 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  ],
  validate,
  authController.resetPassword
);

// Get current user
router.get(
  '/me',
  authenticate,
  authController.getCurrentUser
);

export { router as authRouter };
