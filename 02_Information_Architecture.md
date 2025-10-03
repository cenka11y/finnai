# SUOAI - Information Architecture & Sitemap

## 1. Site Structure

```
SUOAI Platform
├── Landing Page (Multi-language)
│   ├── Language Selection
│   ├── Feature Overview
│   └── Registration/Login
│
├── Onboarding Flow
│   ├── Welcome & Language Detection
│   ├── Profile Setup (City, Status, Goals)
│   ├── Finnish Assessment (CEFR Placement)
│   └── Initial Recommendations
│
├── Dashboard (Authenticated)
│   ├── Progress Overview
│   ├── Next Lesson/Task
│   ├── Quick Access Cards
│   └── Notifications
│
├── Finnish Learning Hub
│   ├── My Learning Path
│   │   ├── Current Level (A1-C2)
│   │   ├── Course Progress
│   │   └── Next Milestones
│   ├── Lesson Player
│   │   ├── Reading Exercises
│   │   ├── Listening Practice
│   │   ├── Speaking Activities (STT)
│   │   └── Grammar & Vocabulary
│   ├── Practice Center
│   │   ├── Spaced Repetition
│   │   ├── Pronunciation Trainer
│   │   └── Real-world Scenarios
│   └── Progress & Certificates
│       ├── Achievement History
│       ├── Level Certificates
│       └── Skill Breakdown
│
├── CV Builder
│   ├── CV Templates
│   │   ├── Finnish Professional
│   │   ├── International Format
│   │   └── Academic/Research
│   ├── Guided Builder
│   │   ├── Personal Information
│   │   ├── Work Experience
│   │   ├── Education & Certificates
│   │   ├── Skills & Languages
│   │   └── Additional Sections
│   ├── AI Writing Assistant
│   │   ├── Bullet Point Generator
│   │   ├── STAR Story Helper
│   │   └── Finnish Translation Aid
│   └── Export & Share
│       ├── PDF Download
│       ├── DOCX Export
│       └── LinkedIn Copy
│
├── Job Readiness
│   ├── Course Library
│   │   ├── Interview Preparation
│   │   ├── Finnish Workplace Culture
│   │   ├── Employment Contracts
│   │   └── Networking in Finland
│   ├── Practice Sessions
│   │   ├── Mock Interviews
│   │   ├── Workplace Scenarios
│   │   └── Cultural Simulations
│   └── Resources
│       ├── Job Search Checklist
│       ├── Salary Negotiation Guide
│       └── Professional Networks
│
├── Services Finder
│   ├── City Selection & Location
│   ├── Service Categories
│   │   ├── Housing & Registration
│   │   ├── Healthcare & Insurance
│   │   ├── Education & Training
│   │   ├── Employment Services
│   │   ├── Family & Children
│   │   └── Legal & Integration
│   ├── Service Details
│   │   ├── Description & Eligibility
│   │   ├── Required Documents
│   │   ├── Step-by-step Process
│   │   ├── Contact Information
│   │   ├── Opening Hours
│   │   └── Official Source Links
│   └── Personalized Checklists
│       ├── "What to do next?"
│       ├── Priority Tasks
│       └── Progress Tracking
│
├── User Profile & Settings
│   ├── Personal Information
│   ├── Language Preferences
│   ├── Privacy Settings
│   ├── Notification Preferences
│   └── Data Export/Delete
│
└── Admin Portal (Restricted)
    ├── Content Management
    │   ├── Course & Lesson Editor
    │   ├── Service Entry Management
    │   └── Translation Management
    ├── User Management
    │   ├── User Analytics
    │   ├── Support Tickets
    │   └── Moderation Queue
    ├── Content Ingestion
    │   ├── Source Monitoring
    │   ├── Update Review Queue
    │   └── Version History
    └── System Administration
        ├── API Management
        ├── Performance Monitoring
        └── Audit Logs
```

## 2. Navigation Structure

### Primary Navigation (Authenticated Users)
- **Dashboard** (Home icon)
- **Learn Finnish** (Book icon)
- **Build CV** (Document icon)
- **Find Services** (Map icon)
- **Job Readiness** (Briefcase icon)
- **Profile** (User icon)

### Secondary Navigation
- Language Switcher (Globe icon)
- Notifications (Bell icon)
- Help & Support (Question mark icon)
- Logout (Exit icon)

## 3. Content Hierarchy Principles

### Task-Oriented Structure
- Users think in terms of goals ("I want to learn Finnish", "I need a CV")
- Navigation reflects user intentions, not technical organization
- Progressive disclosure: show overview first, details on demand

### Accessibility Considerations
- Clear heading hierarchy (H1 → H2 → H3)
- Breadcrumb navigation for deep pages
- Skip links for keyboard navigation
- Consistent navigation patterns across sections

### Multi-language Structure
- URL structure: `/fi/`, `/en/`, `/tr/`, `/ar/`, `/ru/`, `/so/`
- Fallback to English for missing translations
- Language-specific content variations (Finnish-focused vs. general)

## 4. Information Flow

### User Onboarding Flow
```
Landing → Language Selection → Registration → Profile Setup → Assessment → Dashboard
```

### Learning Flow
```
Dashboard → Learning Hub → Course Selection → Lesson → Practice → Assessment → Progress
```

### CV Building Flow
```
Dashboard → CV Builder → Template Selection → Guided Input → AI Assistance → Preview → Export
```

### Service Discovery Flow
```
Dashboard → Services Finder → Location/Category → Filter → Service Details → External Link
```

## 5. Search & Filtering

### Global Search
- Unified search across lessons, services, and help content
- Auto-complete with suggestions
- Recent searches and bookmarks

### Contextual Filters
- **Learning:** Level, topic, skill type, duration
- **Services:** City, category, eligibility, language availability
- **Jobs:** Location, industry, experience level

## 6. Responsive Breakpoints

### Mobile-First Approach
- **Mobile:** 320px - 767px (Primary focus)
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px+ 

### Navigation Adaptations
- Mobile: Bottom tab bar for primary navigation
- Tablet: Side navigation panel
- Desktop: Horizontal top navigation with sidebar

---

**Note:** This IA serves as the foundation for wireframing and development. Each section should be validated through user testing before final implementation.