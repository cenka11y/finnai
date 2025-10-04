-- SOUAI Platform - SQLite Database Schema
-- Prisma schema tabanlı SQL oluşturma

-- Users tablosu
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    emailVerified DATETIME,
    hashedPassword TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- User Profiles tablosu
CREATE TABLE IF NOT EXISTS user_profiles (
    id TEXT PRIMARY KEY,
    userId TEXT UNIQUE NOT NULL,
    firstName TEXT,
    lastName TEXT,
    preferredLanguage TEXT DEFAULT 'fi',
    city TEXT,
    countryOfOrigin TEXT,
    arrivalDate DATETIME,
    educationLevel TEXT,
    workExperience TEXT,
    currentCEFRLevel TEXT,
    privacyConsent BOOLEAN DEFAULT FALSE,
    marketingConsent BOOLEAN DEFAULT FALSE,
    dataRetention BOOLEAN DEFAULT TRUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Sessions tablosu
CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    sessionToken TEXT UNIQUE NOT NULL,
    userId TEXT NOT NULL,
    expires DATETIME NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Courses tablosu
CREATE TABLE IF NOT EXISTS courses (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL, -- JSON olarak saklanacak
    description TEXT NOT NULL, -- JSON olarak saklanacak
    cefrLevel TEXT NOT NULL,
    estimatedDuration INTEGER NOT NULL,
    isActive BOOLEAN DEFAULT TRUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Course Enrollments tablosu
CREATE TABLE IF NOT EXISTS course_enrollments (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    courseId TEXT NOT NULL,
    status TEXT DEFAULT 'active',
    progress INTEGER DEFAULT 0,
    enrolledAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    completedAt DATETIME,
    UNIQUE(userId, courseId),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE
);

-- Course Modules tablosu
CREATE TABLE IF NOT EXISTS course_modules (
    id TEXT PRIMARY KEY,
    courseId TEXT NOT NULL,
    title TEXT NOT NULL, -- JSON olarak saklanacak
    description TEXT NOT NULL, -- JSON olarak saklanacak
    orderIndex INTEGER NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE
);

-- Language Assessments tablosu
CREATE TABLE IF NOT EXISTS language_assessments (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    assessmentType TEXT NOT NULL,
    cefrLevel TEXT NOT NULL,
    scores TEXT NOT NULL, -- JSON olarak saklanacak
    duration INTEGER NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- CV Profiles tablosu
CREATE TABLE IF NOT EXISTS cv_profiles (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    name TEXT DEFAULT 'My CV',
    personalInfo TEXT NOT NULL, -- JSON olarak saklanacak
    summary TEXT, -- JSON olarak saklanacak
    workExperience TEXT, -- JSON olarak saklanacak
    education TEXT, -- JSON olarak saklanacak
    skills TEXT, -- JSON olarak saklanacak
    languages TEXT, -- JSON olarak saklanacak
    certificates TEXT, -- JSON olarak saklanacak
    isDefault BOOLEAN DEFAULT FALSE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Services tablosu (Belediye hizmetleri)
CREATE TABLE IF NOT EXISTS services (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL, -- JSON olarak saklanacak
    description TEXT NOT NULL, -- JSON olarak saklanacak
    category TEXT NOT NULL,
    city TEXT NOT NULL,
    contactInfo TEXT, -- JSON olarak saklanacak
    openingHours TEXT, -- JSON olarak saklanacak
    website TEXT,
    eligibility TEXT, -- JSON olarak saklanacak
    requirements TEXT, -- JSON olarak saklanacak
    instructions TEXT, -- JSON olarak saklanacak
    sourceUrl TEXT NOT NULL,
    lastChecked DATETIME DEFAULT CURRENT_TIMESTAMP,
    isVerified BOOLEAN DEFAULT FALSE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Notifications tablosu
CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    type TEXT NOT NULL,
    title TEXT NOT NULL, -- JSON olarak saklanacak
    message TEXT NOT NULL, -- JSON olarak saklanacak
    isRead BOOLEAN DEFAULT FALSE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Başlangıç verileri ekleme
INSERT OR IGNORE INTO courses (id, title, description, cefrLevel, estimatedDuration) VALUES 
    ('course-1', '{"fi": "Perus Suomi A1", "en": "Basic Finnish A1"}', '{"fi": "Suomen kielen perusteet", "en": "Finnish language basics"}', 'A1', 40),
    ('course-2', '{"fi": "Käytännön Suomi A2", "en": "Practical Finnish A2"}', '{"fi": "Arkielämän suomi", "en": "Everyday Finnish"}', 'A2', 60),
    ('course-3', '{"fi": "Keskitaso Suomi B1", "en": "Intermediate Finnish B1"}', '{"fi": "Kehittynyt suomen kieli", "en": "Advanced Finnish language"}', 'B1', 80);

INSERT OR IGNORE INTO services (id, name, description, category, city, contactInfo, openingHours, sourceUrl) VALUES 
    ('service-1', '{"fi": "Väestörekisterikeskus", "en": "Population Register Centre"}', '{"fi": "Henkilötunnus ja kansalaisuus asiat", "en": "Personal ID and citizenship matters"}', 'immigration', 'Helsinki', '{"phone": "+358 295 536 000", "email": "info@vrk.fi"}', '{"weekdays": "09:00-16:00"}', 'https://vrk.fi'),
    ('service-2', '{"fi": "TE-palvelut", "en": "Employment Services"}', '{"fi": "Työttömyyskorvaus ja työnhaku", "en": "Unemployment benefits and job search"}', 'employment', 'Helsinki', '{"phone": "+358 295 020 702", "email": "te@te-palvelut.fi"}', '{"weekdays": "08:00-16:15"}', 'https://te-palvelut.fi');

-- Index'ler performans için
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_userId ON user_profiles(userId);
CREATE INDEX IF NOT EXISTS idx_sessions_userId ON sessions(userId);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(sessionToken);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_userId ON course_enrollments(userId);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_courseId ON course_enrollments(courseId);
CREATE INDEX IF NOT EXISTS idx_services_city ON services(city);
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);