export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  details?: any[];
}

export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface PaginatedResponse<T = any> extends ApiResponse<{
  items: T[];
  pagination: PaginationParams;
}> {}

export interface MultilingualContent {
  fi?: string;
  en?: string;
  [key: string]: string | undefined;
}

export interface UserProfileData {
  firstName?: string;
  lastName?: string;
  preferredLanguage: string;
  city?: string;
  countryOfOrigin?: string;
  arrivalDate?: Date;
  educationLevel?: string;
  workExperience?: string;
  currentCEFRLevel?: string;
}

export interface CVProfileData {
  name: string;
  personalInfo: any;
  summary: any;
  workExperience: any;
  education: any;
  skills: any;
  languages: any;
  certificates: any;
}

export interface ServiceData {
  name: MultilingualContent;
  description: MultilingualContent;
  category: string;
  city: string;
  contactInfo: any;
  openingHours: any;
  website?: string;
  eligibility: any;
  requirements: any;
  instructions: any;
  sourceUrl: string;
}

export interface LessonAttemptData {
  score: number;
  timeSpent: number;
  exerciseResults: any;
}

export interface AssessmentResult {
  cefrLevel: string;
  scores: any;
  duration: number;
}