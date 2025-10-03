# SOUAI Project Structure

This document outlines the complete directory structure of the SOUAI application.

## Root Directory

```
souai/
├── README.md                    # Project overview and setup instructions
├── package.json                 # Root package.json with workspace configuration
├── .gitignore                   # Git ignore rules
├── .env.example                 # Environment variables template
├── docker-compose.yml           # Development environment setup
├── PROJECT_STRUCTURE.md         # This file
│
├── frontend/                    # Next.js Frontend Application
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── .env.local.example
│   ├── public/
│   │   ├── icons/
│   │   ├── images/
│   │   └── locales/
│   ├── src/
│   │   ├── app/                 # Next.js App Router
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── (auth)/
│   │   │   ├── (dashboard)/
│   │   │   ├── api/
│   │   │   └── [locale]/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── ui/              # Base UI components
│   │   │   ├── forms/           # Form components
│   │   │   ├── layout/          # Layout components
│   │   │   └── features/        # Feature-specific components
│   │   ├── lib/                 # Utility functions and configurations
│   │   ├── hooks/               # Custom React hooks
│   │   ├── store/               # State management (Zustand/Redux)
│   │   ├── types/               # TypeScript type definitions
│   │   └── utils/               # Helper utilities
│   └── tests/                   # Frontend tests
│
├── backend/                     # Express.js API Server
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   ├── prisma/
│   │   ├── schema.prisma        # Database schema
│   │   ├── migrations/          # Database migrations
│   │   └── seed.ts              # Database seeding
│   ├── src/
│   │   ├── app.ts               # Express app configuration
│   │   ├── server.ts            # Server entry point
│   │   ├── routes/              # API route handlers
│   │   │   ├── auth.ts
│   │   │   ├── users.ts
│   │   │   ├── courses.ts
│   │   │   ├── cv.ts
│   │   │   ├── services.ts
│   │   │   └── admin.ts
│   │   ├── controllers/         # Route controllers
│   │   ├── middleware/          # Express middleware
│   │   ├── services/            # Business logic services
│   │   ├── utils/               # Utility functions
│   │   ├── types/               # TypeScript types
│   │   └── config/              # Configuration files
│   └── tests/                   # Backend tests
│
├── shared/                      # Shared Code Between Frontend/Backend
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── types/               # Shared TypeScript types
│   │   ├── constants/           # Shared constants
│   │   ├── utils/               # Shared utilities
│   │   └── validators/          # Shared validation schemas
│   └── tests/
│
├── database/                    # Database-related files
│   ├── migrations/              # SQL migration files
│   ├── seeds/                   # Database seed data
│   └── docs/                    # Database documentation
│
├── docs/                        # Documentation
│   ├── api/                     # API documentation
│   ├── deployment/              # Deployment guides
│   ├── development/             # Development guides
│   ├── user-guides/             # User documentation
│   └── specifications/          # Original project specifications
│
├── deploy/                      # Deployment Configuration
│   ├── docker/                  # Docker configurations
│   ├── kubernetes/              # K8s manifests
│   ├── terraform/               # Infrastructure as code
│   └── scripts/                 # Deployment scripts
│
└── tools/                       # Development Tools
    ├── content-ingestion/       # Content fetching tools
    ├── data-migration/          # Data migration scripts
    └── monitoring/              # Monitoring and analytics tools
```

## Key Files and Their Purpose

### Configuration Files
- `package.json` - Root workspace configuration
- `docker-compose.yml` - Local development environment
- `.env.example` - Environment variables template
- `frontend/next.config.js` - Next.js configuration
- `frontend/tailwind.config.js` - Tailwind CSS configuration
- `backend/prisma/schema.prisma` - Database schema definition

### Main Application Files
- `frontend/src/app/layout.tsx` - Root layout component
- `frontend/src/app/page.tsx` - Homepage component
- `backend/src/app.ts` - Express application setup
- `backend/src/server.ts` - Server entry point

### Feature Directories
- `frontend/src/app/(auth)/` - Authentication pages
- `frontend/src/app/(dashboard)/` - Main dashboard pages
- `frontend/src/components/features/` - Feature-specific components
- `backend/src/routes/` - API route handlers
- `backend/src/services/` - Business logic services

### Shared Resources
- `shared/src/types/` - TypeScript type definitions
- `shared/src/validators/` - Data validation schemas
- `public/locales/` - Internationalization files
- `database/seeds/` - Initial data for development

## Development Workflow

1. **Setup**: Run `npm install` from root to install all workspace dependencies
2. **Database**: Set up PostgreSQL and run migrations with `npm run db:migrate`
3. **Development**: Start both frontend and backend with `npm run dev`
4. **Testing**: Run tests with `npm run test`
5. **Building**: Create production builds with `npm run build`

## Environment Configuration

Each package has its own environment configuration:
- Root: General project settings
- Frontend: Next.js and client-side configuration
- Backend: API server and database configuration

Copy `.env.example` files to `.env.local` (frontend) and `.env` (backend) and configure appropriately.
