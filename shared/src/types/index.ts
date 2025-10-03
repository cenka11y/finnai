// Shared type definitions for the SUOAI application

export interface User {
  id: string;
  email: string;
  emailVerified?: Date;
  createdAt: Date;
  updatedAt: Date;
  profile?: UserProfile;
}

export interface UserProfile {
  id: string;
  userId: string;
  firstName?: string;
  lastName?: string;
  preferredLanguage: string;
  city?: string;
  countryOfOrigin?: string;
  arrivalDate?: Date;
  educationLevel?: string;
  workExperience?: string;
  currentCEFRLevel?: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
  dataRetention: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  title: MultilingualContent;
  description: MultilingualContent;
  cefrLevel: CEFRLevel;
  estimatedDuration: number; // hours
  isActive: boolean;
  modules: CourseModule[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseModule {
  id: string;
  courseId: string;
  title: MultilingualContent;
  description: MultilingualContent;
  orderIndex: number;
  lessons: Lesson[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: MultilingualContent;
  content: LessonContent;
  lessonType: LessonType;
  orderIndex: number;
  estimatedMinutes: number;
  exercises: Exercise[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Exercise {
  id: string;
  lessonId: string;
  exerciseType: ExerciseType;
  question: ExerciseQuestion;
  correctAnswer: any;
  options?: any;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CVProfile {
  id: string;
  userId: string;
  name: string;
  personalInfo: PersonalInfo;
  summary: MultilingualContent;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  languages: LanguageSkill[];
  certificates: Certificate[];
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  name: MultilingualContent;
  description: MultilingualContent;
  category: ServiceCategory;
  city: string;
  contactInfo: ContactInfo;
  openingHours: OpeningHours;
  website?: string;
  eligibility: MultilingualContent;
  requirements: MultilingualContent;
  instructions: MultilingualContent;
  sourceUrl: string;
  lastChecked: Date;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Utility Types
export interface MultilingualContent {
  fi: string;
  en: string;
  tr?: string;
  ar?: string;
  ru?: string;
  so?: string;
}

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type Language = 'fi' | 'en' | 'tr' | 'ar' | 'ru' | 'so';

export type LessonType = 'vocabulary' | 'grammar' | 'listening' | 'speaking' | 'reading';

export type ExerciseType = 'multiple_choice' | 'fill_blank' | 'speaking' | 'listening';

export type ServiceCategory = 'immigration' | 'housing' | 'employment' | 'health' | 'education' | 'social_services' | 'legal' | 'other';

// Complex Types
export interface LessonContent {
  introduction?: MultilingualContent;
  mainContent: ContentBlock[];
  summary?: MultilingualContent;
  vocabulary?: VocabularyItem[];
  grammarPoints?: GrammarPoint[];
}

export interface ContentBlock {
  type: 'text' | 'audio' | 'video' | 'image' | 'interactive';
  content: MultilingualContent;
  metadata?: Record<string, any>;
}

export interface VocabularyItem {
  word: string;
  translation: MultilingualContent;
  pronunciation?: string;
  example?: MultilingualContent;
}

export interface GrammarPoint {
  title: MultilingualContent;
  explanation: MultilingualContent;
  examples: MultilingualContent[];
}

export interface ExerciseQuestion {
  text: MultilingualContent;
  audio?: string;
  image?: string;
  context?: MultilingualContent;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: Address;
  dateOfBirth?: Date;
  nationality?: string;
}

export interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  location?: string;
  current: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  grade?: string;
  location?: string;
  current: boolean;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
}

export interface LanguageSkill {
  id: string;
  language: string;
  speaking: CEFRLevel;
  writing: CEFRLevel;
  reading: CEFRLevel;
  listening: CEFRLevel;
  native: boolean;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: Date;
  expirationDate?: Date;
  credentialId?: string;
  credentialUrl?: string;
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  address?: Address;
  website?: string;
}

export interface OpeningHours {
  monday?: TimeSlot[];
  tuesday?: TimeSlot[];
  wednesday?: TimeSlot[];
  thursday?: TimeSlot[];
  friday?: TimeSlot[];
  saturday?: TimeSlot[];
  sunday?: TimeSlot[];
  notes?: MultilingualContent;
}

export interface TimeSlot {
  open: string; // HH:MM format
  close: string; // HH:MM format
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface SearchParams extends PaginationParams {
  query?: string;
  filters?: Record<string, any>;
}

// Authentication Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  preferredLanguage?: Language;
}

export interface AuthUser {
  id: string;
  email: string;
  role: 'user' | 'admin';
  profile?: UserProfile;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
