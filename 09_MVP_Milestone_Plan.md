# SOUAI - MVP Milestone Plan

## Overview

The SOUAI MVP will be delivered in 4 progressive milestones over 8-12 weeks, each building upon the previous phase. This plan prioritizes core user value delivery while establishing the technical foundation for future enhancements.

---

## Milestone 1: Foundation & Authentication (Weeks 1-2)

### 1.1 Core Infrastructure

**Deliverables:**
- Next.js 14 application with App Router setup
- PostgreSQL database with initial schema
- Authentication system (email/password + OAuth)
- Basic CI/CD pipeline
- Development and staging environments

**Technical Tasks:**
```yaml
Infrastructure:
  - NextJS_app_setup: "App Router, TypeScript, Tailwind"
  - Database_setup: "PostgreSQL with migrations"
  - Auth_implementation: "NextAuth.js with JWT"
  - OAuth_integration: "Google OAuth provider"
  - Environment_setup: "Dev, staging, production"
  
Security:
  - HTTPS_enforcement: "TLS 1.3 minimum"
  - Security_headers: "CSP, HSTS, X-Frame-Options"
  - Input_validation: "Zod schemas for all inputs"
  - Rate_limiting: "Per-IP and per-user limits"
```

### 1.2 User Management

**Features:**
- User registration with email verification
- Secure login/logout with session management
- Basic profile management
- Password reset functionality
- OAuth integration (Google)

**Database Tables:**
- `users`, `user_profiles`, `oauth_accounts`
- Row-level security implementation
- Audit logging setup

### 1.3 Acceptance Criteria

**AC-1.1: User Registration**
- [ ] User can register with email and password
- [ ] Email verification required before account activation
- [ ] Password meets security requirements (8+ chars, mixed case, numbers)
- [ ] Duplicate email registration prevented
- [ ] User receives welcome email in Finnish/English

**AC-1.2: Authentication Security**
- [ ] JWT tokens expire after 24 hours
- [ ] Refresh tokens work correctly
- [ ] Failed login attempts trigger rate limiting
- [ ] OAuth flow completes successfully
- [ ] Session invalidation works on logout

**AC-1.3: Profile Management**
- [ ] Users can update basic profile information
- [ ] Language preference persists across sessions
- [ ] Profile changes trigger real-time UI updates
- [ ] Data validation prevents invalid inputs

### 1.4 Testing Requirements

**Unit Tests (>90% coverage):**
```typescript
// Example test structure
describe('Authentication', () => {
  test('user registration with valid data succeeds', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'SecurePass123',
      preferredLanguage: 'fi'
    };
    const result = await registerUser(userData);
    expect(result.success).toBe(true);
    expect(result.user.emailVerified).toBe(false);
  });

  test('duplicate email registration fails', async () => {
    // Test implementation
  });
});
```

**Integration Tests:**
- Complete registration → verification → login flow
- OAuth authentication with Google
- Password reset workflow
- Profile update operations

**E2E Tests:**
- User can complete full registration process
- Email verification link works
- Login persists across browser refresh
- Logout clears all session data

---

## Milestone 2: Language Assessment & Basic Learning (Weeks 3-5)

### 2.1 Language Assessment System

**Deliverables:**
- CEFR-aligned placement test (A1-C2)
- Adaptive questioning algorithm
- Audio processing for listening exercises
- Speech recognition for speaking assessment
- Results dashboard with level placement

**Technical Implementation:**
```typescript
// Assessment engine structure
interface AssessmentEngine {
  startAssessment(userId: string, type: 'placement' | 'progress'): AssessmentSession;
  getNextQuestion(sessionId: string, previousAnswer?: Answer): Question;
  submitAnswer(sessionId: string, answer: Answer): QuestionResult;
  calculateLevel(sessionId: string): CEFRLevel;
}

interface Question {
  id: string;
  type: 'listening' | 'reading' | 'speaking' | 'grammar';
  difficulty: number; // 1-10 scale
  content: QuestionContent;
  expectedAnswer: string | string[];
  timeLimit?: number;
}
```

### 2.2 Basic Learning Infrastructure

**Features:**
- Course structure (courses → modules → lessons)
- Lesson content management
- Progress tracking system
- Simple spaced repetition for vocabulary

**Database Extensions:**
- `courses`, `course_modules`, `lessons`
- `language_assessments`, `lesson_attempts`
- `user_progress`, `spaced_reviews`

### 2.3 Audio Processing Integration

**Speech Services:**
- Web Speech API integration for browsers
- Fallback to cloud STT service
- Finnish language model support
- Basic pronunciation feedback

### 2.4 Acceptance Criteria

**AC-2.1: Assessment Functionality**
- [ ] User completes 15-question adaptive placement test
- [ ] Assessment includes listening, reading, speaking, and grammar
- [ ] Audio playback works on all target devices
- [ ] Speech recording captures user responses
- [ ] Final CEFR level assigned (A1-C2) based on performance

**AC-2.2: Assessment Accuracy**
- [ ] Assessment correctly places A2 test user at A2 level
- [ ] Assessment correctly places B1 test user at B1 level
- [ ] Speaking assessment provides basic pronunciation feedback
- [ ] Test completion time under 20 minutes
- [ ] Results explanation provided in user's language

**AC-2.3: Learning Foundation**
- [ ] User can access course recommendations based on level
- [ ] Basic lesson structure displays correctly
- [ ] Progress tracking shows completion percentage
- [ ] Users can navigate between lessons

### 2.5 Testing Requirements

**Unit Tests:**
```typescript
describe('Assessment Engine', () => {
  test('adaptive algorithm increases difficulty after correct answers', () => {
    const engine = new AssessmentEngine();
    const session = engine.startAssessment('user-id', 'placement');
    
    // Simulate correct answers
    const question1 = engine.getNextQuestion(session.id);
    engine.submitAnswer(session.id, { questionId: question1.id, answer: 'correct' });
    
    const question2 = engine.getNextQuestion(session.id);
    expect(question2.difficulty).toBeGreaterThan(question1.difficulty);
  });
});
```

**Integration Tests:**
- Complete assessment flow from start to results
- Audio recording and playback functionality
- Level calculation accuracy
- Progress persistence across sessions

**Performance Tests:**
- Assessment loads within 3 seconds
- Audio processing completes within 5 seconds
- Speech recognition responds within 3 seconds
- Database queries complete within 100ms

---

## Milestone 3: CV Builder & Services Directory (Weeks 6-8)

### 3.1 CV Builder Implementation

**Deliverables:**
- Three CV templates (Finnish, International, Academic)
- Guided CV building workflow
- PDF and DOCX export functionality
- Basic AI writing assistance
- ATS-compatibility validation

**Core Features:**
```typescript
interface CVBuilder {
  templates: CVTemplate[];
  createProfile(userId: string, templateId: string): CVProfile;
  updateSection(profileId: string, section: CVSection): void;
  generateAISuggestions(context: string, type: 'bullet' | 'summary'): string[];
  exportCV(profileId: string, format: 'pdf' | 'docx'): ExportResult;
  validateATS(cvContent: CVContent): ATSValidationResult;
}
```

### 3.2 Municipal Services Directory

**Deliverables:**
- Service database with 50 initial entries
- City-based filtering (Helsinki, Espoo, Vantaa, Tampere, Turku, Oulu)
- Category-based organization
- Service detail pages with step-by-step guidance
- Search and filtering functionality

**Content Structure:**
```typescript
interface Service {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  city: string;
  contactInfo: ContactInfo;
  eligibility: string[];
  requiredDocuments: string[];
  processSteps: ProcessStep[];
  openingHours: OpeningHours;
  sources: ServiceSource[];
  lastChecked: Date;
}
```

### 3.3 AI Writing Assistant

**Basic Features:**
- Bullet point generation for work experience
- Professional summary suggestions
- Finnish-English translation assistance
- Industry-specific terminology recommendations

### 3.4 Acceptance Criteria

**AC-3.1: CV Builder Core Functionality**
- [ ] User selects from 3 professional CV templates
- [ ] Guided workflow walks through all CV sections
- [ ] Live preview shows changes in real-time
- [ ] PDF export generates properly formatted document
- [ ] DOCX export maintains formatting and ATS compatibility

**AC-3.2: AI Writing Assistance**
- [ ] AI generates relevant bullet points for job descriptions
- [ ] Professional summary reflects user's background
- [ ] Finnish translation suggestions are contextually appropriate
- [ ] Industry terms match Finnish job market standards

**AC-3.3: Services Directory**
- [ ] User finds services filtered by Helsinki city
- [ ] Service categories (housing, health, education, etc.) work correctly
- [ ] Service detail page shows complete information
- [ ] All contact information and opening hours display
- [ ] Search functionality returns relevant results

**AC-3.4: Data Quality**
- [ ] All 50 initial services have complete information
- [ ] Contact details are current and verified
- [ ] Process steps are clear and actionable
- [ ] Sources are properly attributed with links

### 3.5 Testing Requirements

**Unit Tests:**
```typescript
describe('CV Builder', () => {
  test('PDF export generates valid PDF file', async () => {
    const cvProfile = createTestProfile();
    const exportResult = await cvBuilder.exportCV(cvProfile.id, 'pdf');
    
    expect(exportResult.success).toBe(true);
    expect(exportResult.fileUrl).toMatch(/\.pdf$/);
    expect(exportResult.fileSize).toBeGreaterThan(0);
  });

  test('ATS validation identifies required fields', () => {
    const incompleteCV = { name: 'John Doe' }; // Missing email, experience
    const validation = cvBuilder.validateATS(incompleteCV);
    
    expect(validation.isValid).toBe(false);
    expect(validation.missingFields).toContain('email');
    expect(validation.missingFields).toContain('workExperience');
  });
});
```

**Integration Tests:**
- Complete CV creation and export workflow
- AI suggestions integration with form fields
- Service search and filtering operations
- PDF/DOCX file generation and download

**User Acceptance Tests:**
- HR professional can parse exported PDF with standard ATS software
- Service information accuracy verified with municipal sources
- AI suggestions provide meaningful, contextual help
- Export process completes within 30 seconds

---

## Milestone 4: Integration & Polish (Weeks 9-12)

### 4.1 Full User Journey Integration

**Deliverables:**
- Complete onboarding flow integration
- Dashboard with personalized recommendations
- Inter-feature navigation and data sharing
- Performance optimization
- Mobile responsiveness completion

### 4.2 Content Management System

**Admin Features:**
- Content review queue for service updates
- User management dashboard
- Analytics and reporting
- System health monitoring

### 4.3 Polish & Performance

**Optimization Tasks:**
- Core Web Vitals optimization
- Accessibility compliance (WCAG 2.1 AA)
- Multi-language UI implementation
- Error handling and user feedback
- Mobile app PWA features

### 4.4 Acceptance Criteria

**AC-4.1: Complete User Journey**
- [ ] User completes full flow: registration → assessment → learning → CV → services
- [ ] Dashboard shows personalized content based on user profile
- [ ] Cross-feature data integration works (e.g., language level affects CV suggestions)
- [ ] User can accomplish primary tasks within 3 clicks from dashboard

**AC-4.2: Performance Standards**
- [ ] Lighthouse scores: Performance >90, Accessibility >90, Best Practices >90, SEO >90
- [ ] Page load time <3 seconds on 3G connection
- [ ] Time to Interactive <4 seconds
- [ ] First Contentful Paint <2 seconds

**AC-4.3: Accessibility Compliance**
- [ ] All interactive elements keyboard accessible
- [ ] Screen reader compatibility verified
- [ ] Color contrast ratios meet WCAG AA standards
- [ ] Focus indicators visible and logical
- [ ] Alternative text provided for all images

**AC-4.4: Multi-language Support**
- [ ] UI displays correctly in Finnish and English
- [ ] Language switcher works without losing progress
- [ ] All user-facing text internationalized
- [ ] Right-to-left layout preparation for Arabic

### 4.5 Testing Requirements

**End-to-End Tests:**
```typescript
describe('Complete User Journey', () => {
  test('new user completes full platform experience', async () => {
    // Registration and onboarding
    await page.goto('/register');
    await fillRegistrationForm(testUser);
    await verifyEmail(testUser.email);
    
    // Language assessment
    await completeAssessment(expectedLevel: 'A2');
    
    // CV building
    await createCV(template: 'finnish');
    await exportCV(format: 'pdf');
    
    // Service discovery
    await findServices(city: 'Helsinki', category: 'housing');
    
    // Verify user can find all key features
    expect(page.url()).toContain('/dashboard');
  });
});
```

**Performance Testing:**
- Load testing with 100 concurrent users
- Database performance under realistic load
- CDN and asset optimization verification
- Mobile performance on mid-range devices

**Security Testing:**
- Penetration testing for common vulnerabilities
- Authentication and authorization edge cases
- Input validation and XSS prevention
- SQL injection prevention verification

---

## Quality Assurance Strategy

### 1. Testing Pyramid

```yaml
TestingStrategy:
  Unit: "70% of tests - Individual function/component testing"
  Integration: "20% of tests - Feature integration testing"
  E2E: "10% of tests - Complete user workflow testing"

Coverage:
  Minimum: "90% unit test coverage"
  Critical: "100% coverage for auth, payment, privacy features"
  Performance: "All user actions under 3 seconds"
```

### 2. Review Process

**Code Review Requirements:**
- All code reviewed by senior developer
- Security review for auth/privacy features
- Accessibility review for UI components
- Performance review for database queries

**Testing Gates:**
- Unit tests pass (90%+ coverage)
- Integration tests pass
- Security scan passes
- Performance benchmarks met
- Accessibility audit passes

### 3. User Testing

**Usability Testing Sessions:**
- Week 4: Assessment and learning flow
- Week 8: CV builder and services directory
- Week 11: Complete platform experience

**Test Participants:**
- Recent immigrants (primary target)
- Established residents (secondary target)
- Family members with limited tech skills
- Accessibility users (screen readers, keyboard navigation)

---

## Risk Management

### 1. Technical Risks

**High Risk:**
- Speech recognition accuracy for non-native speakers
- Database performance with concurrent users
- Third-party service availability (STT/TTS)

**Mitigation:**
- Fallback mechanisms for speech features
- Database optimization and caching
- Multiple provider contracts

### 2. Content Risks

**Medium Risk:**
- Service information accuracy and currency
- Translation quality for multiple languages
- Legal compliance with content sources

**Mitigation:**
- Manual verification of critical services
- Professional translation review
- Legal review of content usage

### 3. User Adoption Risks

**Medium Risk:**
- Complex features overwhelming new users
- Language barriers affecting usability
- Trust concerns about data privacy

**Mitigation:**
- Progressive feature disclosure
- Extensive user testing with target audience
- Transparent privacy communication

---

## Success Metrics

### 1. MVP Success Criteria

**User Metrics:**
- 100 registered users by end of MVP
- 70% assessment completion rate
- 40% of users create a CV
- 60% of users browse services directory
- 4.0+ average user satisfaction rating

**Technical Metrics:**
- 99.5% uptime during MVP period
- <3 second average page load time
- Zero critical security vulnerabilities
- 100% WCAG 2.1 AA compliance

**Business Metrics:**
- Product-market fit validation through user feedback
- Clear user journey completion data
- Feature usage analytics
- Content accuracy verified by municipal sources

### 2. Post-MVP Readiness

**Platform Readiness:**
- Scalable architecture for 10,000+ users
- Content management system operational
- Analytics and monitoring in place
- Security and privacy compliance verified

**Go-to-Market Readiness:**
- User onboarding optimized
- Help documentation complete
- Support processes established
- Marketing materials prepared

---

## Deployment Plan

### 1. Environment Strategy

```yaml
Environments:
  Development:
    Purpose: "Feature development and testing"
    Data: "Synthetic test data"
    Access: "Development team"
  
  Staging:
    Purpose: "Pre-production testing and demos"
    Data: "Production-like test data"
    Access: "QA team, stakeholders"
  
  Production:
    Purpose: "Live user platform"
    Data: "Real user data"
    Access: "Admin users only"
```

### 2. Release Strategy

**Milestone Releases:**
- Internal preview builds for each milestone
- Staging deployment for stakeholder review
- Production deployment with feature flags
- Gradual rollout to user base

**Rollback Plan:**
- Database migration rollback procedures
- Application version rollback capability
- Emergency procedures for critical issues
- User communication protocols

This comprehensive MVP plan ensures SOUAI delivers core value to immigrants in Finland while establishing a solid foundation for future growth and enhancement.