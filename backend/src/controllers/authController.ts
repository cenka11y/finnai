import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/config/database';
import { logger } from '@/utils/logger';
import { AuthenticatedRequest } from '@/middleware/auth';

class AuthController {
  // Register new user
  async register(req: Request, res: Response) {
    try {
      const { email, password, firstName, lastName, preferredLanguage = 'fi' } = req.body;

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: 'User with this email already exists'
        });
      }

      // Hash password
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user with profile
      const user = await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          hashedPassword,
          profile: {
            create: {
              firstName: firstName || null,
              lastName: lastName || null,
              preferredLanguage,
            }
          }
        },
        include: {
          profile: true
        }
      });

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET!,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      logger.info(`New user registered: ${user.email}`);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: {
            id: user.id,
            email: user.email,
            profile: user.profile
          },
          token
        }
      });
    } catch (error) {
      logger.error('Registration error:', error);
      res.status(500).json({
        success: false,
        error: 'Registration failed'
      });
    }
  }

  // Login user
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Find user with profile
      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
        include: {
          profile: true
        }
      });

      if (!user || !user.hashedPassword) {
        return res.status(401).json({
          success: false,
          error: 'Invalid email or password'
        });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          error: 'Invalid email or password'
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET!,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      // Update last login (we can add this field to schema later)
      logger.info(`User logged in: ${user.email}`);

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user.id,
            email: user.email,
            profile: user.profile
          },
          token
        }
      });
    } catch (error) {
      logger.error('Login error:', error);
      res.status(500).json({
        success: false,
        error: 'Login failed'
      });
    }
  }

  // Logout user (mainly for clearing client-side token)
  async logout(req: AuthenticatedRequest, res: Response) {
    try {
      logger.info(`User logged out: ${req.user?.email}`);
      
      res.json({
        success: true,
        message: 'Logout successful'
      });
    } catch (error) {
      logger.error('Logout error:', error);
      res.status(500).json({
        success: false,
        error: 'Logout failed'
      });
    }
  }

  // Get current user
  async getCurrentUser(req: AuthenticatedRequest, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user!.id },
        include: {
          profile: true,
          enrollments: {
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
          },
          cvProfiles: {
            select: {
              id: true,
              name: true,
              isDefault: true,
              updatedAt: true
            }
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
        data: {
          id: user.id,
          email: user.email,
          profile: user.profile,
          enrollments: user.enrollments,
          cvProfiles: user.cvProfiles
        }
      });
    } catch (error) {
      logger.error('Get current user error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch user data'
      });
    }
  }

  // Refresh token (placeholder - implement with proper refresh token logic)
  async refreshToken(req: Request, res: Response) {
    try {
      // For now, just return error - implement proper refresh logic later
      res.status(501).json({
        success: false,
        error: 'Refresh token not implemented yet'
      });
    } catch (error) {
      logger.error('Refresh token error:', error);
      res.status(500).json({
        success: false,
        error: 'Refresh token failed'
      });
    }
  }

  // Email verification (placeholder)
  async verifyEmail(req: Request, res: Response) {
    try {
      res.status(501).json({
        success: false,
        error: 'Email verification not implemented yet'
      });
    } catch (error) {
      logger.error('Email verification error:', error);
      res.status(500).json({
        success: false,
        error: 'Email verification failed'
      });
    }
  }

  // Forgot password (placeholder)
  async forgotPassword(req: Request, res: Response) {
    try {
      res.status(501).json({
        success: false,
        error: 'Forgot password not implemented yet'
      });
    } catch (error) {
      logger.error('Forgot password error:', error);
      res.status(500).json({
        success: false,
        error: 'Forgot password failed'
      });
    }
  }

  // Reset password (placeholder)
  async resetPassword(req: Request, res: Response) {
    try {
      res.status(501).json({
        success: false,
        error: 'Reset password not implemented yet'
      });
    } catch (error) {
      logger.error('Reset password error:', error);
      res.status(500).json({
        success: false,
        error: 'Reset password failed'
      });
    }
  }
}

export const authController = new AuthController();