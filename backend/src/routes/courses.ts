import { Router } from 'express';
import { query, param } from 'express-validator';
import { authenticate, optionalAuth } from '@/middleware/auth';
import { validate } from '@/middleware/validate';
import { coursesController } from '@/controllers/coursesController';

const router = Router();

// Public routes
router.get(
  '/',
  optionalAuth,
  [
    query('level').optional().isIn(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']).withMessage('Invalid CEFR level'),
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  ],
  validate,
  coursesController.getCourses
);

router.get(
  '/:id',
  optionalAuth,
  [
    param('id').isUUID().withMessage('Invalid course ID'),
  ],
  validate,
  coursesController.getCourse
);

// Protected routes
router.use(authenticate);

router.post(
  '/:id/enroll',
  [
    param('id').isUUID().withMessage('Invalid course ID'),
  ],
  validate,
  coursesController.enrollCourse
);

router.get(
  '/:id/progress',
  [
    param('id').isUUID().withMessage('Invalid course ID'),
  ],
  validate,
  coursesController.getCourseProgress
);

router.get(
  '/:courseId/modules/:moduleId/lessons',
  [
    param('courseId').isUUID().withMessage('Invalid course ID'),
    param('moduleId').isUUID().withMessage('Invalid module ID'),
  ],
  validate,
  coursesController.getModuleLessons
);

router.get(
  '/:courseId/lessons/:lessonId',
  [
    param('courseId').isUUID().withMessage('Invalid course ID'),
    param('lessonId').isUUID().withMessage('Invalid lesson ID'),
  ],
  validate,
  coursesController.getLesson
);

router.post(
  '/:courseId/lessons/:lessonId/complete',
  [
    param('courseId').isUUID().withMessage('Invalid course ID'),
    param('lessonId').isUUID().withMessage('Invalid lesson ID'),
  ],
  validate,
  coursesController.completeLesson
);

export { router as coursesRouter };