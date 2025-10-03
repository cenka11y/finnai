import { Router } from 'express';
import { query } from 'express-validator';
import { optionalAuth } from '@/middleware/auth';
import { validate } from '@/middleware/validate';
import { servicesController } from '@/controllers/servicesController';

const router = Router();

// Get municipal services
router.get(
  '/',
  optionalAuth,
  [
    query('city').optional().trim().isLength({ max: 100 }).withMessage('City name too long'),
    query('category').optional().isIn(['immigration', 'housing', 'employment', 'health', 'education', 'finance']).withMessage('Invalid category'),
    query('language').optional().isIn(['fi', 'en']).withMessage('Language must be fi or en'),
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  ],
  validate,
  servicesController.getServices
);

// Search services
router.get(
  '/search',
  optionalAuth,
  [
    query('q').trim().isLength({ min: 2 }).withMessage('Search query must be at least 2 characters'),
    query('city').optional().trim().isLength({ max: 100 }).withMessage('City name too long'),
    query('category').optional().isIn(['immigration', 'housing', 'employment', 'health', 'education', 'finance']).withMessage('Invalid category'),
    query('language').optional().isIn(['fi', 'en']).withMessage('Language must be fi or en'),
  ],
  validate,
  servicesController.searchServices
);

// Get service categories
router.get('/categories', servicesController.getCategories);

// Get cities with services
router.get('/cities', servicesController.getCities);

export { router as servicesRouter };