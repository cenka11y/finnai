import { Response } from 'express';
import { prisma } from '@/config/database';
import { logger } from '@/utils/logger';
import { AuthenticatedRequest } from '@/middleware/auth';

class CVController {
  // Get user's CV profiles
  async getProfiles(req: AuthenticatedRequest, res: Response) {
    try {
      const profiles = await prisma.cVProfile.findMany({
        where: { userId: req.user!.id },
        include: {
          documents: {
            select: {
              id: true,
              name: true,
              language: true,
              format: true,
              template: true,
              fileUrl: true,
              createdAt: true
            }
          }
        },
        orderBy: { updatedAt: 'desc' }
      });

      res.json({
        success: true,
        data: profiles
      });
    } catch (error) {
      logger.error('Get CV profiles error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch CV profiles'
      });
    }
  }

  // Create new CV profile
  async createProfile(req: AuthenticatedRequest, res: Response) {
    try {
      const {
        name,
        personalInfo = {},
        summary = {},
        workExperience = {},
        education = {},
        skills = {},
        languages = {},
        certificates = {}
      } = req.body;

      const profile = await prisma.cVProfile.create({
        data: {
          userId: req.user!.id,
          name,
          personalInfo,
          summary,
          workExperience,
          education,
          skills,
          languages,
          certificates
        }
      });

      logger.info(`CV profile created for user: ${req.user!.email}`);

      res.status(201).json({
        success: true,
        message: 'CV profile created successfully',
        data: profile
      });
    } catch (error) {
      logger.error('Create CV profile error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create CV profile'
      });
    }
  }

  // Get single CV profile
  async getProfile(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;

      const profile = await prisma.cVProfile.findUnique({
        where: { 
          id,
          userId: req.user!.id // Ensure user owns this profile
        },
        include: {
          documents: {
            select: {
              id: true,
              name: true,
              language: true,
              format: true,
              template: true,
              fileUrl: true,
              createdAt: true
            }
          }
        }
      });

      if (!profile) {
        return res.status(404).json({
          success: false,
          error: 'CV profile not found'
        });
      }

      res.json({
        success: true,
        data: profile
      });
    } catch (error) {
      logger.error('Get CV profile error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch CV profile'
      });
    }
  }

  // Update CV profile
  async updateProfile(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const {
        name,
        personalInfo,
        summary,
        workExperience,
        education,
        skills,
        languages,
        certificates
      } = req.body;

      const profile = await prisma.cVProfile.update({
        where: { 
          id,
          userId: req.user!.id // Ensure user owns this profile
        },
        data: {
          ...(name !== undefined && { name }),
          ...(personalInfo !== undefined && { personalInfo }),
          ...(summary !== undefined && { summary }),
          ...(workExperience !== undefined && { workExperience }),
          ...(education !== undefined && { education }),
          ...(skills !== undefined && { skills }),
          ...(languages !== undefined && { languages }),
          ...(certificates !== undefined && { certificates }),
        }
      });

      logger.info(`CV profile updated for user: ${req.user!.email}`);

      res.json({
        success: true,
        message: 'CV profile updated successfully',
        data: profile
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('Record to update not found')) {
        return res.status(404).json({
          success: false,
          error: 'CV profile not found'
        });
      }

      logger.error('Update CV profile error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update CV profile'
      });
    }
  }

  // Delete CV profile
  async deleteProfile(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;

      await prisma.cVProfile.delete({
        where: { 
          id,
          userId: req.user!.id // Ensure user owns this profile
        }
      });

      logger.info(`CV profile deleted for user: ${req.user!.email}`);

      res.json({
        success: true,
        message: 'CV profile deleted successfully'
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
        return res.status(404).json({
          success: false,
          error: 'CV profile not found'
        });
      }

      logger.error('Delete CV profile error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete CV profile'
      });
    }
  }

  // Generate CV document (placeholder - implement with PDF/DOCX generation)
  async generateDocument(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const { language, format, template = 'modern' } = req.body;

      // Check if profile exists and belongs to user
      const profile = await prisma.cVProfile.findUnique({
        where: { 
          id,
          userId: req.user!.id
        }
      });

      if (!profile) {
        return res.status(404).json({
          success: false,
          error: 'CV profile not found'
        });
      }

      // TODO: Implement actual document generation
      // For now, create a placeholder document record
      const document = await prisma.cVDocument.create({
        data: {
          userId: req.user!.id,
          cvProfileId: id,
          name: `${profile.name}_${language}.${format}`,
          language,
          format,
          template,
          fileUrl: null, // Will be set after actual file generation
          fileSize: null
        }
      });

      logger.info(`CV document generation requested: ${document.name}`);

      res.status(201).json({
        success: true,
        message: 'CV document generation started',
        data: {
          ...document,
          status: 'pending' // Indicates document is being generated
        }
      });
    } catch (error) {
      logger.error('Generate CV document error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to generate CV document'
      });
    }
  }

  // Get user's CV documents
  async getDocuments(req: AuthenticatedRequest, res: Response) {
    try {
      const documents = await prisma.cVDocument.findMany({
        where: { userId: req.user!.id },
        include: {
          cvProfile: {
            select: {
              id: true,
              name: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      res.json({
        success: true,
        data: documents
      });
    } catch (error) {
      logger.error('Get CV documents error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch CV documents'
      });
    }
  }

  // Delete CV document
  async deleteDocument(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;

      await prisma.cVDocument.delete({
        where: { 
          id,
          userId: req.user!.id // Ensure user owns this document
        }
      });

      logger.info(`CV document deleted for user: ${req.user!.email}`);

      res.json({
        success: true,
        message: 'CV document deleted successfully'
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
        return res.status(404).json({
          success: false,
          error: 'CV document not found'
        });
      }

      logger.error('Delete CV document error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete CV document'
      });
    }
  }
}

export const cvController = new CVController();