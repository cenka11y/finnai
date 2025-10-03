import { Request, Response } from 'express';
import { prisma } from '@/config/database';
import { logger } from '@/utils/logger';
import { AuthenticatedRequest } from '@/middleware/auth';

class ServicesController {
  // Get municipal services with filtering
  async getServices(req: AuthenticatedRequest, res: Response) {
    try {
      const { city, category, language, page = 1, limit = 20 } = req.query;
      const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

      const where = {
        isVerified: true,
        ...(city && { city: { contains: city as string, mode: 'insensitive' as any } }),
        ...(category && { category: category as string })
      };

      const [services, total] = await Promise.all([
        prisma.service.findMany({
          where,
          skip,
          take: parseInt(limit as string),
          orderBy: { updatedAt: 'desc' }
        }),
        prisma.service.count({ where })
      ]);

      // Filter by language if specified
      let filteredServices = services;
      if (language) {
        filteredServices = services.filter(service => {
          const names = service.name as any;
          const descriptions = service.description as any;
          return names[language] || descriptions[language];
        });
      }

      res.json({
        success: true,
        data: {
          services: filteredServices,
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

  // Search services by text
  async searchServices(req: AuthenticatedRequest, res: Response) {
    try {
      const { q, city, category, language } = req.query;

      if (!q || (q as string).trim().length < 2) {
        return res.status(400).json({
          success: false,
          error: 'Search query must be at least 2 characters'
        });
      }

      const searchTerm = (q as string).trim();

      // Build search conditions
      const where = {
        isVerified: true,
        OR: [
          // Search in JSON fields (PostgreSQL specific)
          { name: { path: ['fi'], string_contains: searchTerm } },
          { name: { path: ['en'], string_contains: searchTerm } },
          { description: { path: ['fi'], string_contains: searchTerm } },
          { description: { path: ['en'], string_contains: searchTerm } },
        ],
        ...(city && { city: { contains: city as string, mode: 'insensitive' as any } }),
        ...(category && { category: category as string })
      };

      const services = await prisma.service.findMany({
        where,
        take: 50, // Limit search results
        orderBy: { updatedAt: 'desc' }
      });

      // Filter by language if specified
      let filteredServices = services;
      if (language) {
        filteredServices = services.filter(service => {
          const names = service.name as any;
          const descriptions = service.description as any;
          return names[language] || descriptions[language];
        });
      }

      res.json({
        success: true,
        data: {
          services: filteredServices,
          query: searchTerm,
          total: filteredServices.length
        }
      });
    } catch (error) {
      logger.error('Search services error:', error);
      res.status(500).json({
        success: false,
        error: 'Search failed'
      });
    }
  }

  // Get available service categories
  async getCategories(req: Request, res: Response) {
    try {
      const categories = await prisma.service.findMany({
        where: { isVerified: true },
        select: { category: true },
        distinct: ['category']
      });

      const categoryList = categories.map(c => c.category).filter(Boolean);

      res.json({
        success: true,
        data: categoryList
      });
    } catch (error) {
      logger.error('Get categories error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch categories'
      });
    }
  }

  // Get cities with services
  async getCities(req: Request, res: Response) {
    try {
      const cities = await prisma.service.findMany({
        where: { isVerified: true },
        select: { city: true },
        distinct: ['city']
      });

      const cityList = cities.map(c => c.city).filter(Boolean).sort();

      res.json({
        success: true,
        data: cityList
      });
    } catch (error) {
      logger.error('Get cities error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch cities'
      });
    }
  }
}

export const servicesController = new ServicesController();