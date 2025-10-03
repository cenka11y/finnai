# SOUAI - Entity Relationship Diagram (ERD)

## Database Schema Overview

### Core Entities
- Users & Authentication
- Language Learning System  
- CV Builder System
- Services Directory
- Content Management (RAG)
- Administrative Functions

---

## Detailed Table Definitions

### 1. Users & Authentication

```sql
-- Core user accounts
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'deleted')),
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'partner'))
);

-- Extended user profiles
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    preferred_language VARCHAR(5) DEFAULT 'fi' CHECK (preferred_language IN ('fi', 'en', 'tr', 'ar', 'ru', 'so')),
    city VARCHAR(100),
    immigration_status VARCHAR(50) CHECK (immigration_status IN ('new_immigrant', 'resident', 'established')),
    primary_goal VARCHAR(100),
    onboarding_completed BOOLEAN DEFAULT FALSE,
    privacy_consent BOOLEAN DEFAULT FALSE,
    marketing_consent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- OAuth integrations
CREATE TABLE oauth_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL, -- 'google', 'apple', etc.
    provider_account_id VARCHAR(255) NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(provider, provider_account_id)
);
```

### 2. Language Learning System

```sql
-- Finnish language assessments
CREATE TABLE language_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    assessment_type VARCHAR(50) DEFAULT 'placement' CHECK (assessment_type IN ('placement', 'progress', 'final')),
    cefr_level VARCHAR(5) CHECK (cefr_level IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
    listening_score INTEGER CHECK (listening_score >= 0 AND listening_score <= 100),
    reading_score INTEGER CHECK (reading_score >= 0 AND reading_score <= 100),
    speaking_score INTEGER CHECK (speaking_score >= 0 AND speaking_score <= 100),
    grammar_score INTEGER CHECK (grammar_score >= 0 AND grammar_score <= 100),
    overall_score INTEGER CHECK (overall_score >= 0 AND overall_score <= 100),
    audio_file_urls TEXT[], -- Array of audio recordings for speaking assessment
    assessment_data JSONB, -- Detailed responses and analytics
    completed_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Course templates and structure
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    target_level VARCHAR(5) CHECK (target_level IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
    prerequisites VARCHAR(5)[], -- Array of required levels
    duration_weeks INTEGER DEFAULT 4,
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Individual course modules
CREATE TABLE course_modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL,
    learning_objectives TEXT[],
    estimated_duration_minutes INTEGER DEFAULT 30,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Individual lessons within modules
CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID REFERENCES course_modules(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content_type VARCHAR(50) CHECK (content_type IN ('reading', 'listening', 'speaking', 'grammar', 'vocabulary', 'mixed')),
    order_index INTEGER NOT NULL,
    content JSONB NOT NULL, -- Lesson content, exercises, media URLs
    difficulty_level INTEGER CHECK (difficulty_level >= 1 AND difficulty_level <= 5),
    estimated_duration_minutes INTEGER DEFAULT 15,
    prerequisites UUID[], -- Array of lesson IDs
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- User exercise attempts and progress
CREATE TABLE lesson_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
    started_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    score INTEGER CHECK (score >= 0 AND score <= 100),
    time_spent_seconds INTEGER DEFAULT 0,
    exercise_responses JSONB, -- Detailed responses to exercises
    audio_recordings TEXT[], -- URLs to user speech recordings
    feedback JSONB, -- AI-generated feedback
    status VARCHAR(20) DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Spaced repetition system
CREATE TABLE spaced_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
    vocabulary_item VARCHAR(255), -- Specific word or phrase to review
    ease_factor DECIMAL(3,2) DEFAULT 2.5,
    repetitions INTEGER DEFAULT 0,
    interval_days INTEGER DEFAULT 1,
    next_review_date DATE NOT NULL,
    last_reviewed TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- User progress tracking
CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    current_module_id UUID REFERENCES course_modules(id),
    current_lesson_id UUID REFERENCES lessons(id),
    completion_percentage DECIMAL(5,2) DEFAULT 0.00,
    total_time_spent_seconds INTEGER DEFAULT 0,
    streak_days INTEGER DEFAULT 0,
    last_activity_date DATE,
    points_earned INTEGER DEFAULT 0,
    level_achieved VARCHAR(5),
    started_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### 3. CV Builder System

```sql
-- CV profiles for users
CREATE TABLE cv_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255), -- e.g., "Marketing Professional CV"
    template_type VARCHAR(50) CHECK (template_type IN ('finnish', 'international', 'academic')),
    language VARCHAR(5) CHECK (language IN ('fi', 'en')),
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Generated CV documents
CREATE TABLE cv_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cv_profile_id UUID REFERENCES cv_profiles(id) ON DELETE CASCADE,
    content JSONB NOT NULL, -- Complete CV data structure
    version INTEGER DEFAULT 1,
    is_current BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- CV export history
CREATE TABLE cv_exports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cv_document_id UUID REFERENCES cv_documents(id) ON DELETE CASCADE,
    format VARCHAR(20) CHECK (format IN ('pdf', 'docx', 'json')),
    file_url VARCHAR(500),
    file_size_bytes INTEGER,
    export_settings JSONB, -- Font, styling, layout options
    exported_at TIMESTAMP DEFAULT NOW()
);
```

### 4. Job Readiness System

```sql
-- Job readiness course metadata
CREATE TABLE job_readiness_modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100), -- 'interview', 'culture', 'networking', etc.
    difficulty_level INTEGER CHECK (difficulty_level >= 1 AND difficulty_level <= 3),
    estimated_duration_minutes INTEGER DEFAULT 45,
    prerequisites VARCHAR(100)[],
    content JSONB NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- User completion of job readiness modules
CREATE TABLE job_readiness_completions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    module_id UUID REFERENCES job_readiness_modules(id) ON DELETE CASCADE,
    started_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    score INTEGER CHECK (score >= 0 AND score <= 100),
    feedback JSONB,
    certificate_url VARCHAR(500)
);
```

### 5. Services Directory

```sql
-- Municipal service entries
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL, -- 'housing', 'health', 'education', etc.
    subcategory VARCHAR(100),
    city VARCHAR(100) NOT NULL,
    address TEXT,
    postal_code VARCHAR(10),
    phone VARCHAR(50),
    email VARCHAR(255),
    website_url VARCHAR(500),
    opening_hours JSONB, -- Structured opening hours data
    eligibility_criteria TEXT[],
    required_documents TEXT[],
    process_steps TEXT[],
    fees VARCHAR(255),
    languages_available VARCHAR(5)[], -- Array of language codes
    accessibility_notes TEXT,
    target_groups VARCHAR(100)[], -- 'new_immigrants', 'families', etc.
    geographical_bounds JSONB, -- Service area boundaries
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Service source tracking
CREATE TABLE service_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    source_url VARCHAR(500) NOT NULL,
    source_type VARCHAR(50) CHECK (source_type IN ('infofinland', 'kotoutuminen', 'municipal', 'manual')),
    last_checked TIMESTAMP,
    last_modified TIMESTAMP,
    content_hash VARCHAR(64), -- For change detection
    is_primary_source BOOLEAN DEFAULT FALSE
);

-- Content version history
CREATE TABLE content_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    changes_summary TEXT,
    content_snapshot JSONB, -- Full content at this version
    changed_by UUID REFERENCES users(id),
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### 6. RAG Content Management

```sql
-- Chunked content for RAG system
CREATE TABLE rag_chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_url VARCHAR(500) NOT NULL,
    source_type VARCHAR(50) CHECK (source_type IN ('infofinland', 'kotoutuminen', 'manual')),
    content_hash VARCHAR(64) NOT NULL,
    chunk_text TEXT NOT NULL,
    chunk_metadata JSONB, -- Title, section, page number, etc.
    embedding_vector VECTOR(1536), -- OpenAI embedding dimension
    language VARCHAR(5) DEFAULT 'fi',
    last_updated TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW(),
    INDEX (source_url),
    INDEX (content_hash)
);

-- Source monitoring for content changes
CREATE TABLE content_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    url VARCHAR(500) UNIQUE NOT NULL,
    source_type VARCHAR(50) NOT NULL,
    last_crawled TIMESTAMP,
    last_modified TIMESTAMP,
    content_hash VARCHAR(64),
    crawl_frequency_hours INTEGER DEFAULT 168, -- Weekly default
    is_active BOOLEAN DEFAULT TRUE,
    robots_txt_compliant BOOLEAN DEFAULT TRUE,
    terms_compliance_check BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### 7. User Feedback & Community

```sql
-- User feedback on services and content
CREATE TABLE feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    feedback_type VARCHAR(50) CHECK (feedback_type IN ('outdated', 'incorrect', 'helpful', 'suggestion')),
    message TEXT,
    contact_email VARCHAR(255), -- For anonymous feedback
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
    admin_response TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Support tickets
CREATE TABLE support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status VARCHAR(50) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
    assigned_to UUID REFERENCES users(id),
    resolution_notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    resolved_at TIMESTAMP
);
```

### 8. Notifications & Communication

```sql
-- User notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL, -- 'lesson_reminder', 'achievement', 'service_update'
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    action_url VARCHAR(500),
    is_read BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP
);

-- Email/SMS communication log
CREATE TABLE communications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    communication_type VARCHAR(50) CHECK (communication_type IN ('email', 'sms', 'push')),
    recipient VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    content TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'failed')),
    sent_at TIMESTAMP,
    delivered_at TIMESTAMP,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### 9. Analytics & Audit

```sql
-- Audit log for admin actions
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100), -- 'service', 'user', 'content'
    resource_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- User activity tracking (GDPR compliant)
CREATE TABLE user_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    activity_type VARCHAR(100) NOT NULL,
    details JSONB,
    session_id VARCHAR(255),
    ip_address INET,
    created_at TIMESTAMP DEFAULT NOW(),
    INDEX (user_id, created_at),
    INDEX (activity_type)
);
```

---

## Key Relationships & Constraints

### Foreign Key Relationships
```
users (1) → (∞) user_profiles
users (1) → (∞) language_assessments  
users (1) → (∞) cv_profiles
users (1) → (∞) lesson_attempts
courses (1) → (∞) course_modules
course_modules (1) → (∞) lessons
services (1) → (∞) service_sources
services (1) → (∞) content_versions
```

### Indexes for Performance
```sql
-- Critical indexes for query performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_lesson_attempts_user_lesson ON lesson_attempts(user_id, lesson_id);
CREATE INDEX idx_services_city_category ON services(city, category);
CREATE INDEX idx_rag_chunks_embedding ON rag_chunks USING ivfflat (embedding_vector vector_cosine_ops);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read, sent_at);
CREATE INDEX idx_spaced_reviews_user_date ON spaced_reviews(user_id, next_review_date);
```

### Row Level Security (RLS) Examples
```sql
-- Enable RLS on sensitive tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_attempts ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY user_profiles_policy ON user_profiles
    FOR ALL TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY cv_profiles_policy ON cv_profiles  
    FOR ALL TO authenticated
    USING (user_id = auth.uid());
```

---

## Data Migration & Seeding Strategy

### Initial Seed Data Requirements
1. **Cities**: 10 major Finnish cities
2. **Services**: 50 municipal service entries across categories
3. **Courses**: 3 complete language courses (A1, A2, B1)
4. **Lessons**: 100+ individual lessons with exercises
5. **Templates**: 3 CV templates with Finnish job market focus
6. **Job Modules**: 10 job readiness modules

### Data Import Sources
- InfoFinland.fi content extraction (respecting robots.txt)
- Kotoutuminen.fi service listings (with permission)
- Municipal websites (public information only)
- Expert-curated language learning content

This ERD provides a solid foundation for SOUAI's data architecture, ensuring scalability, data integrity, and GDPR compliance while supporting all core platform features.