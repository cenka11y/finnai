import { Router } from 'express';
import { body, param } from 'express-validator';
import { authenticate } from '@/middleware/auth';
import { validate } from '@/middleware/validate';
import { cvController } from '@/controllers/cvController';

const router = Router();

// All CV routes require authentication
router.use(authenticate);

// Get user's CV profiles
router.get('/profiles', cvController.getProfiles);

// Create new CV profile
router.post(
  '/profiles',
  [
    body('name')
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage('CV name must be between 1 and 100 characters'),
    body('personalInfo').optional().isObject().withMessage('Personal info must be an object'),
    body('summary').optional().isObject().withMessage('Summary must be an object'),
    body('workExperience').optional().isObject().withMessage('Work experience must be an object'),
    body('education').optional().isObject().withMessage('Education must be an object'),
    body('skills').optional().isObject().withMessage('Skills must be an object'),
    body('languages').optional().isObject().withMessage('Languages must be an object'),
    body('certificates').optional().isObject().withMessage('Certificates must be an object'),
  ],
  validate,
  cvController.createProfile
);

// Get single CV profile
router.get(
  '/profiles/:id',
  [
    param('id').isUUID().withMessage('Invalid CV profile ID'),
  ],
  validate,
  cvController.getProfile
);

// Update CV profile
router.patch(
  '/profiles/:id',
  [
    param('id').isUUID().withMessage('Invalid CV profile ID'),
    body('name')
      .optional()
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage('CV name must be between 1 and 100 characters'),
    body('personalInfo').optional().isObject().withMessage('Personal info must be an object'),
    body('summary').optional().isObject().withMessage('Summary must be an object'),
    body('workExperience').optional().isObject().withMessage('Work experience must be an object'),
    body('education').optional().isObject().withMessage('Education must be an object'),
    body('skills').optional().isObject().withMessage('Skills must be an object'),
    body('languages').optional().isObject().withMessage('Languages must be an object'),
    body('certificates').optional().isObject().withMessage('Certificates must be an object'),
  ],
  validate,
  cvController.updateProfile
);

// Delete CV profile
router.delete(
  '/profiles/:id',
  [
    param('id').isUUID().withMessage('Invalid CV profile ID'),
  ],
  validate,
  cvController.deleteProfile
);

// Generate CV document
router.post(
  '/profiles/:id/generate',
  [
    param('id').isUUID().withMessage('Invalid CV profile ID'),
    body('language')
      .isIn(['fi', 'en'])
      .withMessage('Language must be either fi or en'),
    body('format')
      .isIn(['pdf', 'docx'])
      .withMessage('Format must be either pdf or docx'),
    body('template')
      .optional()
      .isIn(['modern', 'classic', 'minimal'])
      .withMessage('Invalid template selection'),
  ],
  validate,
  cvController.generateDocument
);

// Get CV documents
router.get('/documents', cvController.getDocuments);

// Delete CV document
router.delete(
  '/documents/:id',
  [
    param('id').isUUID().withMessage('Invalid document ID'),
  ],
  validate,
  cvController.deleteDocument
);

export { router as cvRouter };