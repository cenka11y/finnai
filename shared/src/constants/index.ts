// Shared constants for the SOUAI application

// CEFR Levels
export const CEFR_LEVELS = {
  A1: 'A1',
  A2: 'A2',
  B1: 'B1',
  B2: 'B2',
  C1: 'C1',
  C2: 'C2',
} as const;

// Supported Languages
export const LANGUAGES = {
  FINNISH: 'fi',
  ENGLISH: 'en',
  TURKISH: 'tr',
  ARABIC: 'ar',
  RUSSIAN: 'ru',
  SOMALI: 'so',
} as const;

// Service Categories
export const SERVICE_CATEGORIES = {
  IMMIGRATION: 'immigration',
  HOUSING: 'housing',
  EMPLOYMENT: 'employment',
  HEALTH: 'health',
  EDUCATION: 'education',
  SOCIAL_SERVICES: 'social_services',
  LEGAL: 'legal',
  OTHER: 'other',
} as const;

// Lesson Types
export const LESSON_TYPES = {
  VOCABULARY: 'vocabulary',
  GRAMMAR: 'grammar',
  LISTENING: 'listening',
  SPEAKING: 'speaking',
  READING: 'reading',
} as const;

// Exercise Types
export const EXERCISE_TYPES = {
  MULTIPLE_CHOICE: 'multiple_choice',
  FILL_BLANK: 'fill_blank',
  SPEAKING: 'speaking',
  LISTENING: 'listening',
} as const;

// CV Export Formats
export const CV_FORMATS = {
  PDF: 'pdf',
  DOCX: 'docx',
} as const;

// User Roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  PARTNER: 'partner',
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  LESSON_REMINDER: 'lesson_reminder',
  ACHIEVEMENT: 'achievement',
  SYSTEM: 'system',
  COURSE_UPDATE: 'course_update',
} as const;

// Finnish Cities (commonly used for services)
export const FINNISH_CITIES = [
  'Helsinki',
  'Espoo',
  'Tampere',
  'Vantaa',
  'Oulu',
  'Turku',
  'Jyväskylä',
  'Lahti',
  'Kuopio',
  'Pori',
  'Joensuu',
  'Lappeenranta',
  'Hämeenlinna',
  'Vaasa',
  'Seinäjoki',
  'Rovaniemi',
  'Kotka',
  'Salo',
  'Porvoo',
  'Kouvola',
] as const;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    REGISTER: '/api/v1/auth/register',
    LOGOUT: '/api/v1/auth/logout',
    REFRESH: '/api/v1/auth/refresh',
    VERIFY_EMAIL: '/api/v1/auth/verify-email',
    FORGOT_PASSWORD: '/api/v1/auth/forgot-password',
    RESET_PASSWORD: '/api/v1/auth/reset-password',
  },
  USERS: {
    PROFILE: '/api/v1/users/profile',
    UPDATE_PROFILE: '/api/v1/users/profile',
    DELETE_ACCOUNT: '/api/v1/users/account',
    EXPORT_DATA: '/api/v1/users/export',
  },
  COURSES: {
    LIST: '/api/v1/courses',
    DETAIL: '/api/v1/courses/:id',
    ENROLL: '/api/v1/courses/:id/enroll',
    PROGRESS: '/api/v1/courses/:id/progress',
  },
  LESSONS: {
    DETAIL: '/api/v1/lessons/:id',
    ATTEMPT: '/api/v1/lessons/:id/attempt',
    EXERCISES: '/api/v1/lessons/:id/exercises',
  },
  ASSESSMENTS: {
    START: '/api/v1/assessments/start',
    SUBMIT: '/api/v1/assessments/submit',
    HISTORY: '/api/v1/assessments/history',
  },
  CV: {
    PROFILES: '/api/v1/cv/profiles',
    CREATE_PROFILE: '/api/v1/cv/profiles',
    UPDATE_PROFILE: '/api/v1/cv/profiles/:id',
    DELETE_PROFILE: '/api/v1/cv/profiles/:id',
    GENERATE: '/api/v1/cv/generate',
    DOWNLOAD: '/api/v1/cv/download/:id',
  },
  SERVICES: {
    LIST: '/api/v1/services',
    DETAIL: '/api/v1/services/:id',
    SEARCH: '/api/v1/services/search',
    BY_CITY: '/api/v1/services/city/:city',
  },
  ADMIN: {
    USERS: '/api/v1/admin/users',
    CONTENT: '/api/v1/admin/content',
    SERVICES: '/api/v1/admin/services',
    ANALYTICS: '/api/v1/admin/analytics',
  },
} as const;

// File Upload Limits
export const FILE_LIMITS = {
  MAX_CV_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_PROFILE_IMAGE_SIZE: 2 * 1024 * 1024, // 2MB
  ALLOWED_CV_FORMATS: ['pdf', 'docx'],
  ALLOWED_IMAGE_FORMATS: ['jpg', 'jpeg', 'png', 'webp'],
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  NAME_MAX_LENGTH: 50,
  EMAIL_MAX_LENGTH: 255,
  CV_NAME_MAX_LENGTH: 100,
  MESSAGE_MAX_LENGTH: 2000,
} as const;

// Content Sources
export const CONTENT_SOURCES = {
  INFOFINLAND: {
    name: 'InfoFinland',
    baseUrl: 'https://www.infofinland.fi',
    language: 'fi',
  },
  KOTOUTUMINEN: {
    name: 'Kotoutuminen.fi',
    baseUrl: 'https://kotoutuminen.fi',
    language: 'fi',
  },
} as const;

// Error Codes
export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  DUPLICATE_ENTRY: 'DUPLICATE_ENTRY',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  SERVER_ERROR: 'SERVER_ERROR',
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  USER_REGISTERED: 'User registered successfully',
  EMAIL_VERIFIED: 'Email verified successfully',
  PASSWORD_RESET: 'Password reset successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  CV_CREATED: 'CV created successfully',
  CV_GENERATED: 'CV generated successfully',
  COURSE_ENROLLED: 'Successfully enrolled in course',
  LESSON_COMPLETED: 'Lesson completed successfully',
  ASSESSMENT_SUBMITTED: 'Assessment submitted successfully',
} as const;

// Default Values
export const DEFAULTS = {
  LANGUAGE: LANGUAGES.FINNISH,
  PAGINATION_LIMIT: 20,
  SESSION_DURATION: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  LESSON_DURATION_ESTIMATE: 15, // minutes
  CV_TEMPLATE: 'modern',
} as const;
