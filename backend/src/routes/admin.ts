import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { authenticate } from '@/middleware/auth';
import { validate } from '@/middleware/validate';
import { adminController } from '@/controllers/adminController';

const router = Router();

// All admin routes require authentication
// TODO: Add admin role check middleware
router.use(authenticate);

// Dashboard stats
router.get('/stats', adminController.getDashboardStats);

// User management
router.get('/users', adminController.getUsers);
router.get('/users/:id', adminController.getUser);

// Content management
router.get('/content', adminController.getContent);
router.post('/content/refresh', adminController.refreshContent);

// Feedback management
router.get('/feedback', adminController.getFeedback);
router.patch(
  '/feedback/:id/status',
  [
    param('id').isUUID().withMessage('Invalid feedback ID'),
    body('status').isIn(['open', 'in_progress', 'resolved', 'closed']).withMessage('Invalid status'),
  ],
  validate,
  adminController.updateFeedbackStatus
);

// Service management
router.get('/services', adminController.getServices);
router.patch(
  '/services/:id/verify',
  [
    param('id').isUUID().withMessage('Invalid service ID'),
    body('isVerified').isBoolean().withMessage('isVerified must be a boolean'),
  ],
  validate,
  adminController.verifyService
);

// Audit logs
router.get('/audit', adminController.getAuditLogs);

export { router as adminRouter };