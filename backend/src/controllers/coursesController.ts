import { Request, Response } from 'express';
import { prisma } from '@/config/database';
import { logger } from '@/utils/logger';
import { AuthenticatedRequest } from '@/middleware/auth';

class CoursesController {
  // Get all courses with optional filtering
  async getCourses(req: AuthenticatedRequest, res: Response) {
    try {
      const { level, page = 1, limit = 10 } = req.query;
      const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

      const where = {
        isActive: true,
        ...(level && { cefrLevel: level as string })
      };

      const [courses, total] = await Promise.all([
        prisma.course.findMany({
          where,
          skip,
          take: parseInt(limit as string),
          include: {
            modules: {
              select: {
                id: true,
                title: true,
                orderIndex: true
              },
              orderBy: { orderIndex: 'asc' }
            },
            ...(req.user && {
              enrollments: {
                where: { userId: req.user.id },
                select: { status: true, progress: true, enrolledAt: true }
              }
            })
          },
          orderBy: { createdAt: 'desc' }
        }),
        prisma.course.count({ where })
      ]);

      res.json({
        success: true,
        data: {
          courses,
          pagination: {
            page: parseInt(page as string),
            limit: parseInt(limit as string),
            total,
            pages: Math.ceil(total / parseInt(limit as string))
          }
        }
      });
    } catch (error) {
      logger.error('Get courses error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch courses'
      });
    }
  }

  // Get single course by ID
  async getCourse(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;

      const course = await prisma.course.findUnique({
        where: { id, isActive: true },
        include: {
          modules: {
            include: {
              lessons: {
                select: {
                  id: true,
                  title: true,
                  lessonType: true,
                  orderIndex: true,
                  estimatedMinutes: true
                },
                orderBy: { orderIndex: 'asc' }
              }
            },
            orderBy: { orderIndex: 'asc' }
          },
          ...(req.user && {
            enrollments: {
              where: { userId: req.user.id },
              select: { status: true, progress: true, enrolledAt: true }
            }
          })
        }
      });

      if (!course) {
        return res.status(404).json({
          success: false,
          error: 'Course not found'
        });
      }

      res.json({
        success: true,
        data: course
      });
    } catch (error) {
      logger.error('Get course error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch course'
      });
    }
  }

  // Enroll user in course
  async enrollCourse(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;

      // Check if course exists
      const course = await prisma.course.findUnique({
        where: { id, isActive: true }
      });

      if (!course) {
        return res.status(404).json({
          success: false,
          error: 'Course not found'
        });
      }

      // Check if already enrolled
      const existingEnrollment = await prisma.courseEnrollment.findUnique({
        where: {
          userId_courseId: {
            userId: req.user!.id,
            courseId: id
          }
        }
      });

      if (existingEnrollment) {
        return res.status(400).json({
          success: false,
          error: 'Already enrolled in this course'
        });
      }

      // Create enrollment
      const enrollment = await prisma.courseEnrollment.create({
        data: {
          userId: req.user!.id,
          courseId: id
        },
        include: {
          course: {
            select: {
              id: true,
              title: true,
              cefrLevel: true
            }
          }
        }
      });

      logger.info(`User ${req.user!.email} enrolled in course ${course.title}`);

      res.status(201).json({
        success: true,
        message: 'Successfully enrolled in course',
        data: enrollment
      });
    } catch (error) {
      logger.error('Enroll course error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to enroll in course'
      });
    }
  }

  // Get course progress for enrolled user
  async getCourseProgress(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;

      const enrollment = await prisma.courseEnrollment.findUnique({
        where: {
          userId_courseId: {
            userId: req.user!.id,
            courseId: id
          }
        },
        include: {
          course: {
            include: {
              modules: {
                include: {
                  lessons: {
                    select: {
                      id: true,
                      title: true,
                      lessonType: true,
                      orderIndex: true
                    }
                  }
                }
              }
            }
          }
        }
      });

      if (!enrollment) {
        return res.status(404).json({
          success: false,
          error: 'Not enrolled in this course'
        });
      }

      // Get lesson attempts for this course
      const lessonAttempts = await prisma.lessonAttempt.findMany({
        where: {
          userId: req.user!.id,
          lesson: {
            module: {
              courseId: id
            }
          }
        },
        include: {
          lesson: {
            select: {
              id: true,
              title: true,
              moduleId: true
            }
          }
        }
      });

      res.json({
        success: true,
        data: {
          enrollment,
          lessonAttempts,
          totalLessons: enrollment.course.modules.reduce((sum, module) => sum + module.lessons.length, 0),
          completedLessons: lessonAttempts.length
        }
      });
    } catch (error) {
      logger.error('Get course progress error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch course progress'
      });
    }
  }

  // Get lessons for a module
  async getModuleLessons(req: AuthenticatedRequest, res: Response) {
    try {
      const { courseId, moduleId } = req.params;

      // Check enrollment
      const enrollment = await prisma.courseEnrollment.findUnique({
        where: {
          userId_courseId: {
            userId: req.user!.id,
            courseId
          }
        }
      });

      if (!enrollment) {
        return res.status(403).json({
          success: false,
          error: 'Not enrolled in this course'
        });
      }

      const module = await prisma.courseModule.findUnique({
        where: { id: moduleId, courseId },
        include: {
          lessons: {
            orderBy: { orderIndex: 'asc' }
          }
        }
      });

      if (!module) {
        return res.status(404).json({
          success: false,
          error: 'Module not found'
        });
      }

      res.json({
        success: true,
        data: module
      });
    } catch (error) {
      logger.error('Get module lessons error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch module lessons'
      });
    }
  }

  // Get single lesson
  async getLesson(req: AuthenticatedRequest, res: Response) {
    try {
      const { courseId, lessonId } = req.params;

      // Check enrollment
      const enrollment = await prisma.courseEnrollment.findUnique({
        where: {
          userId_courseId: {
            userId: req.user!.id,
            courseId
          }
        }
      });

      if (!enrollment) {
        return res.status(403).json({
          success: false,
          error: 'Not enrolled in this course'
        });
      }

      const lesson = await prisma.lesson.findUnique({
        where: { 
          id: lessonId,
          module: { courseId }
        },
        include: {
          exercises: {
            orderBy: { orderIndex: 'asc' }
          }
        }
      });

      if (!lesson) {
        return res.status(404).json({
          success: false,
          error: 'Lesson not found'
        });
      }

      res.json({
        success: true,
        data: lesson
      });
    } catch (error) {
      logger.error('Get lesson error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch lesson'
      });
    }
  }

  // Complete lesson
  async completeLesson(req: AuthenticatedRequest, res: Response) {
    try {
      const { courseId, lessonId } = req.params;
      const { score = 100, timeSpent = 0, exerciseResults = {} } = req.body;

      // Check enrollment
      const enrollment = await prisma.courseEnrollment.findUnique({
        where: {
          userId_courseId: {
            userId: req.user!.id,
            courseId
          }
        }
      });

      if (!enrollment) {
        return res.status(403).json({
          success: false,
          error: 'Not enrolled in this course'
        });
      }

      // Create lesson attempt
      const attempt = await prisma.lessonAttempt.create({
        data: {
          userId: req.user!.id,
          lessonId,
          score: Math.max(0, Math.min(100, score)), // Ensure score is between 0-100
          timeSpent,
          exerciseResults
        }
      });

      logger.info(`User ${req.user!.email} completed lesson ${lessonId} with score ${score}`);

      res.status(201).json({
        success: true,
        message: 'Lesson completed successfully',
        data: attempt
      });
    } catch (error) {
      logger.error('Complete lesson error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to complete lesson'
      });
    }
  }
}

export const coursesController = new CoursesController();