import { Request, Response } from 'express';
import { prisma } from '@/config/database';
import { logger } from '@/utils/logger';
import { AuthenticatedRequest } from '@/middleware/auth';

class AdminController {
  // Get dashboard statistics
  async getDashboardStats(req: AuthenticatedRequest, res: Response) {
    try {
      const [
        totalUsers,
        totalCourses,
        totalServices,
        totalFeedback,
        activeEnrollments,
        recentUsers
      ] = await Promise.all([
        prisma.user.count(),
        prisma.course.count({ where: { isActive: true } }),
        prisma.service.count({ where: { isVerified: true } }),
        prisma.feedback.count({ where: { status: 'open' } }),
        prisma.courseEnrollment.count({ where: { status: 'active' } }),
        prisma.user.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
            }
          }
        })
      ]);

      res.json({
        success: true,
        data: {
          users: {
            total: totalUsers,
            recentlyJoined: recentUsers
          },
          courses: {
            total: totalCourses,
            activeEnrollments
          },
          services: {
            total: totalServices
          },
          feedback: {
            pending: totalFeedback
          }
        }
      });
    } catch (error) {
      logger.error('Get dashboard stats error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch dashboard statistics'
      });
    }
  }

  // Get users with pagination
  async getUsers(req: AuthenticatedRequest, res: Response) {
    try {
      const { page = 1, limit = 20, search } = req.query;
      const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

      const where = search ? {
        OR: [
          { email: { contains: search as string, mode: 'insensitive' as any } },
          { profile: { firstName: { contains: search as string, mode: 'insensitive' as any } } },
          { profile: { lastName: { contains: search as string, mode: 'insensitive' as any } } }
        ]
      } : {};

      const [users, total] = await Promise.all([
        prisma.user.findMany({
          where,
          skip,
          take: parseInt(limit as string),
          include: {
            profile: true,
            enrollments: {
              select: { status: true }
            },
            cvProfiles: {
              select: { id: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        }),
        prisma.user.count({ where })
      ]);

      res.json({
        success: true,
        data: {
          users,
          pagination: {
            page: parseInt(page as string),
            limit: parseInt(limit as string),
            total,
            pages: Math.ceil(total / parseInt(limit as string))
          }
        }
      });
    } catch (error) {
      logger.error('Get users error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch users'
      });
    }
  }

  // Get single user details
  async getUser(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          profile: true,
          enrollments: {
            include: {
              course: {
                select: {
                  id: true,
                  title: true,
                  cefrLevel: true
                }
              }
            }
          },
          cvProfiles: true,
          assessments: true,
          lessonAttempts: {
            include: {
              lesson: {
                select: {
                  id: true,
                  title: true
                }
              }
            },
            take: 10,
            orderBy: { createdAt: 'desc' }
          }
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
        data: user
      });
    } catch (error) {
      logger.error('Get user error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch user details'
      });
    }
  }

  // Get content management data
  async getContent(req: AuthenticatedRequest, res: Response) {
    try {
      const [sources, contents] = await Promise.all([
        prisma.contentSource.findMany({
          include: {
            contents: {
              select: { id: true }
            }
          },
          orderBy: { lastCrawled: 'desc' }
        }),
        prisma.content.findMany({
          include: {
            source: {
              select: {
                id: true,
                name: true
              }
            }
          },
          take: 50,
          orderBy: { lastFetched: 'desc' }
        })
      ]);

      res.json({
        success: true,
        data: {
          sources,
          recentContent: contents
        }
      });
    } catch (error) {
      logger.error('Get content error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch content data'
      });
    }
  }

  // Refresh content (trigger content ingestion)
  async refreshContent(req: AuthenticatedRequest, res: Response) {
    try {
      // TODO: Trigger content ingestion service
      logger.info(`Content refresh triggered by admin: ${req.user!.email}`);

      res.json({
        success: true,
        message: 'Content refresh initiated'
      });
    } catch (error) {
      logger.error('Refresh content error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to refresh content'
      });
    }
  }

  // Get feedback with filtering
  async getFeedback(req: AuthenticatedRequest, res: Response) {
    try {
      const { status, type, page = 1, limit = 20 } = req.query;
      const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

      const where = {
        ...(status && { status: status as string }),
        ...(type && { type: type as string })
      };

      const [feedback, total] = await Promise.all([
        prisma.feedback.findMany({
          where,
          skip,
          take: parseInt(limit as string),
          include: {
            user: {
              select: {
                id: true,
                email: true,
                profile: {
                  select: {
                    firstName: true,
                    lastName: true
                  }
                }
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        }),
        prisma.feedback.count({ where })
      ]);

      res.json({
        success: true,
        data: {
          feedback,
          pagination: {
            page: parseInt(page as string),
            limit: parseInt(limit as string),
            total,
            pages: Math.ceil(total / parseInt(limit as string))
          }
        }
      });
    } catch (error) {
      logger.error('Get feedback error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch feedback'
      });
    }
  }

  // Update feedback status
  async updateFeedbackStatus(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const feedback = await prisma.feedback.update({
        where: { id },
        data: { status }
      });

      logger.info(`Feedback ${id} status updated to ${status} by admin: ${req.user!.email}`);

      res.json({
        success: true,
        message: 'Feedback status updated',
        data: feedback
      });
    } catch (error) {
      logger.error('Update feedback status error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update feedback status'
      });
    }
  }

  // Get services for admin management
  async getServices(req: AuthenticatedRequest, res: Response) {
    try {
      const { city, category, verified, page = 1, limit = 20 } = req.query;
      const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

      const where = {
        ...(city && { city: { contains: city as string, mode: 'insensitive' as any } }),
        ...(category && { category: category as string }),
        ...(verified !== undefined && { isVerified: verified === 'true' })
      };

      const [services, total] = await Promise.all([
        prisma.service.findMany({
          where,
          skip,
          take: parseInt(limit as string),
          orderBy: { lastChecked: 'desc' }
        }),
        prisma.service.count({ where })
      ]);

      res.json({
        success: true,
        data: {
          services,
          pagination: {
            page: parseInt(page as string),
            limit: parseInt(limit as string),
            total,
            pages: Math.ceil(total / parseInt(limit as string))
          }
        }
      });
    } catch (error) {
      logger.error('Get services error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch services'
      });
    }
  }

  // Verify/unverify service
  async verifyService(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const { isVerified } = req.body;

      const service = await prisma.service.update({
        where: { id },
        data: { isVerified }
      });

      logger.info(`Service ${id} verification set to ${isVerified} by admin: ${req.user!.email}`);

      res.json({
        success: true,
        message: `Service ${isVerified ? 'verified' : 'unverified'} successfully`,
        data: service
      });
    } catch (error) {
      logger.error('Verify service error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update service verification'
      });
    }
  }

  // Get audit logs
  async getAuditLogs(req: AuthenticatedRequest, res: Response) {
    try {
      const { action, resource, page = 1, limit = 50 } = req.query;
      const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

      const where = {
        ...(action && { action: action as string }),
        ...(resource && { resource: resource as string })
      };

      const [logs, total] = await Promise.all([
        prisma.auditLog.findMany({
          where,
          skip,
          take: parseInt(limit as string),
          orderBy: { createdAt: 'desc' }
        }),
        prisma.auditLog.count({ where })
      ]);

      res.json({
        success: true,
        data: {
          logs,
          pagination: {
            page: parseInt(page as string),
            limit: parseInt(limit as string),
            total,
            pages: Math.ceil(total / parseInt(limit as string))
          }
        }
      });
    } catch (error) {
      logger.error('Get audit logs error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch audit logs'
      });
    }
  }
}

export const adminController = new AdminController();