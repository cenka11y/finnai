# SOUAI - AI-Powered Orientation Platform for Immigrants in Finland

SOUAI is a modern, AI-powered platform that helps immigrants in Finland with language learning, job preparation, and finding municipal services.

## Features

- **Personalized Finnish Language Learning**: CEFR-based assessment and tailored courses
- **ATS-Friendly CV Builder**: Professional CV and cover letter generation
- **Job Readiness Training**: Interview prep and workplace culture guidance
- **Municipal Services Directory**: City-aware directory with official source citations
- **Multi-language Support**: Finnish, English, with scaffolding for Turkish, Arabic, Russian, Somali

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Node.js, TypeScript, Express
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with multiple providers
- **File Storage**: S3-compatible storage
- **Speech Services**: Web Speech API + external TTS/STT

## Project Structure

```
souai/
├── frontend/          # Next.js application
├── backend/           # Express API server
├── database/          # Database schemas and migrations
├── shared/            # Shared types and utilities
├── docs/             # Documentation and specifications
└── deploy/           # Deployment configurations
```

## Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run database migrations
5. Start development servers

## Documentation

Detailed documentation is available in the `/docs` directory:

- [API Documentation](docs/api.md)
- [Database Schema](docs/database.md)
- [Deployment Guide](docs/deployment.md)
- [Contributing Guidelines](docs/contributing.md)

## License

MIT License - see LICENSE file for details.
