# SOUAI Application Structure Overview

## 🏗️ **Project Architecture**

SOUAI is built as a modern, scalable web application with the following structure:

```
souai/
├── 📁 frontend/          # Next.js 14 with App Router
├── 📁 backend/           # Express.js API with TypeScript  
├── 📁 shared/            # Shared types and utilities
├── 📁 database/          # PostgreSQL schema and migrations
├── 📁 docs/             # Documentation and specifications
├── 📁 deploy/           # Docker and deployment configs
└── 📁 tools/            # Development and maintenance tools
```

## 🚀 **Key Features Implemented**

### **1. Frontend (Next.js)**
- ✅ **App Router Architecture**: Modern file-based routing
- ✅ **Internationalization**: Multi-language support (Fi, En, Tr, Ar, Ru, So)
- ✅ **Responsive Design**: Tailwind CSS with modern components
- ✅ **Authentication**: NextAuth.js integration
- ✅ **State Management**: Zustand for client state
- ✅ **PWA Ready**: Progressive Web App capabilities

### **2. Backend (Express + TypeScript)**
- ✅ **RESTful API**: Complete API structure with validation
- ✅ **Database Integration**: Prisma ORM with PostgreSQL
- ✅ **Authentication**: JWT-based auth with refresh tokens
- ✅ **Security**: Helmet, CORS, rate limiting
- ✅ **File Handling**: S3-compatible storage integration
- ✅ **Monitoring**: Structured logging with Winston

### **3. Database Schema**
- ✅ **User Management**: Complete user and profile system
- ✅ **Learning System**: Courses, modules, lessons, assessments
- ✅ **CV Builder**: Profile management and document generation
- ✅ **Services Directory**: Municipal services with geolocation
- ✅ **Content Management**: RAG-based content ingestion
- ✅ **System Features**: Notifications, feedback, audit logs

### **4. Development Environment**
- ✅ **Docker Compose**: Complete development stack
- ✅ **Workspace Setup**: Monorepo with shared packages
- ✅ **Environment Config**: Comprehensive environment variables
- ✅ **Type Safety**: Full TypeScript implementation

## 🛠️ **Technology Stack**

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 14, React 18, TypeScript | Modern web application |
| **Styling** | Tailwind CSS, HeadlessUI | Responsive design system |
| **Backend** | Express.js, Node.js, TypeScript | API server and business logic |
| **Database** | PostgreSQL, Prisma ORM | Data persistence and management |
| **Authentication** | NextAuth.js, JWT | User authentication and sessions |
| **File Storage** | S3-compatible storage | File uploads and document generation |
| **Caching** | Redis | Session storage and caching |
| **Monitoring** | Winston, Morgan | Logging and error tracking |
| **Development** | Docker, Docker Compose | Local development environment |

## 📦 **Package Structure**

### **Root Package (`package.json`)**
- Workspaces configuration for monorepo
- Global scripts for development and deployment
- Concurrent execution of frontend and backend

### **Frontend Package (`frontend/package.json`)**
- Next.js with App Router
- React ecosystem (React Query, Hook Form)
- UI libraries (Tailwind, HeadlessUI, Heroicons)
- Internationalization (next-intl)
- PWA capabilities

### **Backend Package (`backend/package.json`)**
- Express.js with comprehensive middleware
- Database integration (Prisma, PostgreSQL)
- Authentication and security
- File handling and external APIs
- Content ingestion tools

### **Shared Package (`shared/package.json`)**
- Common TypeScript types
- Validation schemas (Zod)
- Shared constants and utilities
- API contract definitions

## 🗄️ **Database Architecture**

### **Core Tables**
- **Users & Profiles**: User management with detailed profiles
- **Courses & Learning**: Hierarchical course structure (Course → Module → Lesson → Exercise)
- **Assessments**: CEFR-based language assessments
- **CV System**: Profile management and document generation
- **Services**: Municipal services with multilingual content
- **Content Management**: RAG-based content ingestion from authoritative sources

### **Key Features**
- **GDPR Compliance**: Privacy controls and data export/deletion
- **Multilingual Support**: JSON fields for translated content
- **Audit Trail**: Complete audit logging for all actions
- **Extensible Schema**: Designed for future feature additions

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+ and npm 9+
- Docker and Docker Compose
- PostgreSQL 15+
- Redis 7+

### **Quick Start**
```bash
# 1. Clone and install dependencies
npm install

# 2. Start development environment
docker-compose up -d

# 3. Set up database
npm run db:migrate
npm run db:seed

# 4. Start development servers
npm run dev
```

### **Access Points**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database**: PostgreSQL on port 5432
- **Redis**: Redis on port 6379
- **MinIO (S3)**: http://localhost:9001

## 🔧 **Configuration**

### **Environment Variables**
The application uses comprehensive environment configuration:
- **Database**: PostgreSQL connection and settings
- **Authentication**: JWT secrets and session management
- **External APIs**: OpenAI, email, file storage
- **Security**: Rate limiting and CORS settings
- **Features**: Feature flags for gradual rollout

### **Development vs Production**
- **Development**: Local services with Docker Compose
- **Production**: Cloud-native deployment with managed services
- **Security**: Enhanced security measures for production

## 📋 **Available Scripts**

### **Root Level**
```bash
npm run dev          # Start both frontend and backend
npm run build        # Build all packages
npm run test         # Run all tests
npm run lint         # Lint all packages
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed development data
```

### **Frontend Specific**
```bash
cd frontend
npm run dev          # Next.js development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint checking
npm run test         # Jest testing
```

### **Backend Specific**
```bash
cd backend
npm run dev          # Express development server
npm run build        # TypeScript compilation
npm run start        # Production server
npm run db:studio    # Prisma database browser
npm run seed         # Database seeding
```

## 🔐 **Security Features**

### **Authentication & Authorization**
- JWT-based authentication with refresh tokens
- NextAuth.js integration for OAuth providers
- Role-based access control (User, Admin, Partner)
- Session management with secure cookies

### **Data Protection**
- GDPR compliance with privacy controls
- Data encryption at rest and in transit
- Comprehensive audit logging
- User data export and deletion capabilities

### **API Security**
- Rate limiting for all endpoints
- Request validation with comprehensive schemas
- CORS configuration for cross-origin requests
- Helmet.js for security headers

## 🌍 **Internationalization**

### **Supported Languages**
- **Primary**: Finnish (fi) - Default language
- **Secondary**: English (en) - Fallback language
- **Additional**: Turkish (tr), Arabic (ar), Russian (ru), Somali (so)

### **Content Strategy**
- Database-level multilingual support with JSON fields
- Frontend internationalization with next-intl
- Content adaptation based on user language preference
- Progressive Finnish language nudging for learning

## 📊 **Content Management**

### **RAG Implementation**
- Scheduled content ingestion from authoritative sources
- Content summarization with citation tracking
- Version control and change detection
- Human review workflow for content updates

### **Authorized Sources**
- **InfoFinland**: https://www.infofinland.fi
- **Kotoutuminen**: https://kotoutuminen.fi
- Respects robots.txt and terms of service
- Always provides source attribution and links

## 🎯 **Next Steps**

This application structure provides:

1. **Solid Foundation**: Complete development environment ready for implementation
2. **Scalable Architecture**: Designed to handle growth in users and features
3. **Modern Standards**: Following current best practices for web development
4. **GDPR Compliance**: Built-in privacy and data protection measures
5. **Internationalization**: Ready for multi-language deployment

**Ready for Pro Implementation**: The structure is now in place. Upgrading to Pro will implement:
- Complete component library with all UI components
- Full API implementation with all endpoints
- Complete database schema with migrations
- Authentication system with all providers
- Content ingestion system
- CV generation engine
- Language assessment system
- All business logic and services

## 📁 **Key Files Created**

### **Configuration Files**
- `package.json` - Root workspace configuration
- `docker-compose.yml` - Development environment
- `.env.example` - Environment variables template
- `.gitignore` - Git ignore rules

### **Frontend Structure**
- `frontend/package.json` - Frontend dependencies
- `frontend/next.config.js` - Next.js configuration
- `frontend/src/app/layout.tsx` - Root layout component
- `frontend/src/app/page.tsx` - Homepage component

### **Backend Structure**
- `backend/package.json` - Backend dependencies
- `backend/src/app.ts` - Express application setup
- `backend/src/server.ts` - Server entry point
- `backend/prisma/schema.prisma` - Database schema

### **Shared Resources**
- `shared/src/types/index.ts` - TypeScript type definitions
- `shared/src/constants/index.ts` - Application constants
- `PROJECT_STRUCTURE.md` - Detailed structure documentation

This structure provides a comprehensive foundation for the SOUAI application, ready for full implementation with all the features specified in the original requirements.