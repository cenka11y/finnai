import { Response } from 'express';
import { prisma } from '@/config/database';
import { logger } from '@/utils/logger';
import { AuthenticatedRequest } from '@/middleware/auth';

class UsersController {
  // Get user profile
  async getProfile(req: AuthenticatedRequest, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user!.id },
        include: {
          profile: true
        }
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      res.json({
        success: true,
        data: {
          id: user.id,
          email: user.email,
          profile: user.profile
        }
      });
    } catch (error) {
      logger.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch profile'
      });
    }
  }

  // Update user profile
  async updateProfile(req: AuthenticatedRequest, res: Response) {
    try {
      const { 
        firstName, 
        lastName, 
        preferredLanguage, 
        city, 
        countryOfOrigin, 
        educationLevel, 
        workExperience 
      } = req.body;

      const updatedProfile = await prisma.userProfile.update({
        where: { userId: req.user!.id },
        data: {
          ...(firstName !== undefined && { firstName }),
          ...(lastName !== undefined && { lastName }),
          ...(preferredLanguage !== undefined && { preferredLanguage }),
          ...(city !== undefined && { city }),
          ...(countryOfOrigin !== undefined && { countryOfOrigin }),
          ...(educationLevel !== undefined && { educationLevel }),
          ...(workExperience !== undefined && { workExperience }),
        }
      });

      logger.info(`Profile updated for user: ${req.user!.email}`);

      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: updatedProfile
      });
    } catch (error) {
      logger.error('Update profile error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update profile'
      });
    }
  }

  // Get user progress
  async getProgress(req: AuthenticatedRequest, res: Response) {
    try {
      const [enrollments, assessments, lessonAttempts] = await Promise.all([
        // Course enrollments with progress
        prisma.courseEnrollment.findMany({
          where: { userId: req.user!.id },
          include: {
            course: {
              select: {
                id: true,
                title: true,
                cefrLevel: true,
                estimatedDuration: true
              }
            }
          }
        }),

        // Language assessments
        prisma.languageAssessment.findMany({
          where: { userId: req.user!.id },
          orderBy: { createdAt: 'desc' },
          take: 5
        }),

        // Recent lesson attempts
        prisma.lessonAttempt.findMany({
          where: { userId: req.user!.id },
          include: {
            lesson: {
              select: {
                id: true,
                title: true,
                lessonType: true
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        })
      ]);

      res.json({
        success: true,
        data: {
          enrollments,
          assessments,
          recentLessons: lessonAttempts,
          stats: {
            totalCourses: enrollments.length,
            completedCourses: enrollments.filter(e => e.status === 'completed').length,
            totalLessons: lessonAttempts.length,
            averageScore: lessonAttempts.length > 0 
              ? lessonAttempts.reduce((sum, attempt) => sum + attempt.score, 0) / lessonAttempts.length 
              : 0
          }
        }
      });
    } catch (error) {
      logger.error('Get progress error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch progress data'
      });
    }
  }

  // Get user notifications
  async getNotifications(req: AuthenticatedRequest, res: Response) {
    try {
      const notifications = await prisma.notification.findMany({
        where: { userId: req.user!.id },
        orderBy: { createdAt: 'desc' },
        take: 20
      });

      res.json({
        success: true,
        data: notifications
      });
    } catch (error) {
      logger.error('Get notifications error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch notifications'
      });
    }
  }

  // Mark notification as read
  async markNotificationRead(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;

      const notification = await prisma.notification.update({
        where: { 
          id,
          userId: req.user!.id // Ensure user owns this notification
        },
        data: { isRead: true }
      });

      res.json({
        success: true,
        message: 'Notification marked as read',
        data: notification
      });
    } catch (error) {
      logger.error('Mark notification read error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update notification'
      });
    }
  }
}

export const usersController = new UsersController();