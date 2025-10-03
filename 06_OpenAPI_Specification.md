# SOUAI - OpenAPI Specification Outline

## API Overview

**Base URL**: `https://api.souai.fi/v1`  
**Authentication**: Bearer JWT + OAuth2  
**Content Type**: `application/json`  
**API Version**: v1

---

## OpenAPI 3.0 Specification

```yaml
openapi: 3.0.3
info:
  title: SOUAI API
  description: AI-powered integration platform for immigrants in Finland
  version: 1.0.0
  contact:
    name: SOUAI Support
    email: support@souai.fi
    url: https://souai.fi/support
  license:
    name: Proprietary
    url: https://souai.fi/terms

servers:
  - url: https://api.souai.fi/v1
    description: Production server
  - url: https://staging-api.souai.fi/v1  
    description: Staging server
  - url: http://localhost:3001/v1
    description: Development server

security:
  - BearerAuth: []
  - OAuth2: [read, write]

components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
    OAuth2:
      type: oauth2
      flows:
        authorizationCode:
          authorizationUrl: /auth/oauth/authorize
          tokenUrl: /auth/oauth/token
          scopes:
            read: Read access to user data
            write: Write access to user data
            admin: Administrative access

  schemas:
    # Core Models
    User:
      type: object
      properties:
        id:
          type: string
          format: uuid
        email:
          type: string
          format: email
        role:
          type: string
          enum: [user, admin, partner]
        emailVerified:
          type: boolean
        createdAt:
          type: string
          format: date-time
        lastLogin:
          type: string
          format: date-time
      required: [id, email, role]

    UserProfile:
      type: object
      properties:
        id:
          type: string
          format: uuid
        userId:
          type: string
          format: uuid
        firstName:
          type: string
          maxLength: 100
        lastName:
          type: string
          maxLength: 100
        preferredLanguage:
          type: string
          enum: [fi, en, tr, ar, ru, so]
          default: fi
        city:
          type: string
          maxLength: 100
        immigrationStatus:
          type: string
          enum: [new_immigrant, resident, established]
        primaryGoal:
          type: string
          maxLength: 100
        onboardingCompleted:
          type: boolean
          default: false
        privacyConsent:
          type: boolean
        marketingConsent:
          type: boolean
      required: [userId, preferredLanguage, privacyConsent]

    # Language Learning Models
    LanguageAssessment:
      type: object
      properties:
        id:
          type: string
          format: uuid
        userId:
          type: string
          format: uuid
        assessmentType:
          type: string
          enum: [placement, progress, final]
        cefrLevel:
          type: string
          enum: [A1, A2, B1, B2, C1, C2]
        listeningScore:
          type: integer
          minimum: 0
          maximum: 100
        readingScore:
          type: integer
          minimum: 0
          maximum: 100
        speakingScore:
          type: integer
          minimum: 0
          maximum: 100
        grammarScore:
          type: integer
          minimum: 0
          maximum: 100
        overallScore:
          type: integer
          minimum: 0
          maximum: 100
        completedAt:
          type: string
          format: date-time

    Course:
      type: object
      properties:
        id:
          type: string
          format: uuid
        title:
          type: string
          maxLength: 255
        description:
          type: string
        targetLevel:
          type: string
          enum: [A1, A2, B1, B2, C1, C2]
        prerequisites:
          type: array
          items:
            type: string
            enum: [A1, A2, B1, B2, C1, C2]
        durationWeeks:
          type: integer
          default: 4
        isActive:
          type: boolean
          default: true
        modules:
          type: array
          items:
            $ref: '#/components/schemas/CourseModule'

    CourseModule:
      type: object
      properties:
        id:
          type: string
          format: uuid
        courseId:
          type: string
          format: uuid
        title:
          type: string
          maxLength: 255
        description:
          type: string
        orderIndex:
          type: integer
        learningObjectives:
          type: array
          items:
            type: string
        estimatedDurationMinutes:
          type: integer
          default: 30
        lessons:
          type: array
          items:
            $ref: '#/components/schemas/Lesson'

    Lesson:
      type: object
      properties:
        id:
          type: string
          format: uuid
        moduleId:
          type: string
          format: uuid
        title:
          type: string
          maxLength: 255
        contentType:
          type: string
          enum: [reading, listening, speaking, grammar, vocabulary, mixed]
        orderIndex:
          type: integer
        content:
          type: object
          description: Lesson content including exercises and media
        difficultyLevel:
          type: integer
          minimum: 1
          maximum: 5
        estimatedDurationMinutes:
          type: integer
          default: 15

    LessonAttempt:
      type: object
      properties:
        id:
          type: string
          format: uuid
        userId:
          type: string
          format: uuid
        lessonId:
          type: string
          format: uuid
        startedAt:
          type: string
          format: date-time
        completedAt:
          type: string
          format: date-time
        score:
          type: integer
          minimum: 0
          maximum: 100
        timeSpentSeconds:
          type: integer
        status:
          type: string
          enum: [in_progress, completed, abandoned]

    # CV Builder Models
    CVProfile:
      type: object
      properties:
        id:
          type: string
          format: uuid
        userId:
          type: string
          format: uuid
        title:
          type: string
          maxLength: 255
        templateType:
          type: string
          enum: [finnish, international, academic]
        language:
          type: string
          enum: [fi, en]
        isPrimary:
          type: boolean
          default: false
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time

    CVDocument:
      type: object
      properties:
        id:
          type: string
          format: uuid
        cvProfileId:
          type: string
          format: uuid
        content:
          type: object
          description: Complete CV data structure
        version:
          type: integer
          default: 1
        isCurrent:
          type: boolean
          default: true

    CVExport:
      type: object
      properties:
        id:
          type: string
          format: uuid
        cvDocumentId:
          type: string
          format: uuid
        format:
          type: string
          enum: [pdf, docx, json]
        fileUrl:
          type: string
          format: uri
        fileSizeBytes:
          type: integer
        exportedAt:
          type: string
          format: date-time

    # Services Directory Models
    Service:
      type: object
      properties:
        id:
          type: string
          format: uuid
        title:
          type: string
          maxLength: 255
        description:
          type: string
        category:
          type: string
          maxLength: 100
        subcategory:
          type: string
          maxLength: 100
        city:
          type: string
          maxLength: 100
        address:
          type: string
        postalCode:
          type: string
          maxLength: 10
        phone:
          type: string
          maxLength: 50
        email:
          type: string
          format: email
        websiteUrl:
          type: string
          format: uri
        openingHours:
          type: object
          description: Structured opening hours data
        eligibilityCriteria:
          type: array
          items:
            type: string
        requiredDocuments:
          type: array
          items:
            type: string
        processSteps:
          type: array
          items:
            type: string
        languagesAvailable:
          type: array
          items:
            type: string
            enum: [fi, sv, en, tr, ar, ru, so]
        targetGroups:
          type: array
          items:
            type: string
        lastChecked:
          type: string
          format: date-time
        sources:
          type: array
          items:
            $ref: '#/components/schemas/ServiceSource'

    ServiceSource:
      type: object
      properties:
        url:
          type: string
          format: uri
        sourceType:
          type: string
          enum: [infofinland, kotoutuminen, municipal, manual]
        lastChecked:
          type: string
          format: date-time
        isPrimarySource:
          type: boolean

    # Error Models
    Error:
      type: object
      properties:
        code:
          type: string
        message:
          type: string
        details:
          type: object
        timestamp:
          type: string
          format: date-time
      required: [code, message]

    ValidationError:
      type: object
      properties:
        code:
          type: string
          default: "VALIDATION_ERROR"
        message:
          type: string
        fields:
          type: object
          additionalProperties:
            type: array
            items:
              type: string
      required: [code, message, fields]

    # Request/Response Wrappers
    PaginatedResponse:
      type: object
      properties:
        data:
          type: array
          items: {}
        pagination:
          type: object
          properties:
            page:
              type: integer
              minimum: 1
            limit:
              type: integer
              minimum: 1
              maximum: 100
            total:
              type: integer
            totalPages:
              type: integer
          required: [page, limit, total, totalPages]

paths:
  # Authentication Endpoints
  /auth/register:
    post:
      tags: [Authentication]
      summary: Register new user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                email:
                  type: string
                  format: email
                password:
                  type: string
                  minLength: 8
                preferredLanguage:
                  type: string
                  enum: [fi, en, tr, ar, ru, so]
                  default: fi
              required: [email, password]
      responses:
        '201':
          description: User registered successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  user:
                    $ref: '#/components/schemas/User'
                  token:
                    type: string
        '400':
          description: Validation error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ValidationError'
        '409':
          description: Email already exists

  /auth/login:
    post:
      tags: [Authentication]
      summary: Authenticate user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                email:
                  type: string
                  format: email
                password:
                  type: string
              required: [email, password]
      responses:
        '200':
          description: Authentication successful
          content:
            application/json:
              schema:
                type: object
                properties:
                  user:
                    $ref: '#/components/schemas/User'
                  token:
                    type: string
                  refreshToken:
                    type: string
        '401':
          description: Invalid credentials

  /auth/refresh:
    post:
      tags: [Authentication]
      summary: Refresh JWT token
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                refreshToken:
                  type: string
              required: [refreshToken]
      responses:
        '200':
          description: Token refreshed
          content:
            application/json:
              schema:
                type: object
                properties:
                  token:
                    type: string
                  refreshToken:
                    type: string

  /auth/oauth/{provider}:
    get:
      tags: [Authentication]
      summary: OAuth authentication
      parameters:
        - name: provider
          in: path
          required: true
          schema:
            type: string
            enum: [google, apple]
      responses:
        '302':
          description: Redirect to OAuth provider

  # User Management
  /users/me:
    get:
      tags: [Users]
      summary: Get current user profile
      security:
        - BearerAuth: []
      responses:
        '200':
          description: User profile
          content:
            application/json:
              schema:
                type: object
                properties:
                  user:
                    $ref: '#/components/schemas/User'
                  profile:
                    $ref: '#/components/schemas/UserProfile'

    put:
      tags: [Users]
      summary: Update user profile
      security:
        - BearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserProfile'
      responses:
        '200':
          description: Profile updated
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserProfile'

  /users/me/delete:
    delete:
      tags: [Users]
      summary: Delete user account (GDPR)
      security:
        - BearerAuth: []
      responses:
        '204':
          description: Account deleted
        '400':
          description: Cannot delete account

  /users/me/export:
    get:
      tags: [Users]
      summary: Export user data (GDPR)
      security:
        - BearerAuth: []
      responses:
        '200':
          description: User data export
          content:
            application/json:
              schema:
                type: object
                properties:
                  user:
                    $ref: '#/components/schemas/User'
                  profile:
                    $ref: '#/components/schemas/UserProfile'
                  progress:
                    type: object
                  cvs:
                    type: array
                  activities:
                    type: array

  # Language Assessment
  /assessments:
    post:
      tags: [Learning]
      summary: Start language assessment
      security:
        - BearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                assessmentType:
                  type: string
                  enum: [placement, progress]
                  default: placement
      responses:
        '201':
          description: Assessment started
          content:
            application/json:
              schema:
                type: object
                properties:
                  assessmentId:
                    type: string
                    format: uuid
                  firstQuestion:
                    type: object

  /assessments/{assessmentId}/questions/{questionId}:
    post:
      tags: [Learning]
      summary: Submit assessment answer
      security:
        - BearerAuth: []
      parameters:
        - name: assessmentId
          in: path
          required: true
          schema:
            type: string
            format: uuid
        - name: questionId
          in: path
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                answer:
                  type: string
                audioUrl:
                  type: string
                  format: uri
                timeSpent:
                  type: integer
      responses:
        '200':
          description: Answer submitted
          content:
            application/json:
              schema:
                type: object
                properties:
                  correct:
                    type: boolean
                  explanation:
                    type: string
                  nextQuestion:
                    type: object

  /assessments/{assessmentId}/complete:
    post:
      tags: [Learning]
      summary: Complete assessment
      security:
        - BearerAuth: []
      parameters:
        - name: assessmentId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Assessment completed
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/LanguageAssessment'

  # Courses and Learning
  /courses:
    get:
      tags: [Learning]
      summary: Get available courses
      security:
        - BearerAuth: []
      parameters:
        - name: level
          in: query
          schema:
            type: string
            enum: [A1, A2, B1, B2, C1, C2]
        - name: category
          in: query
          schema:
            type: string
      responses:
        '200':
          description: List of courses
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Course'

  /courses/{courseId}:
    get:
      tags: [Learning]
      summary: Get course details
      security:
        - BearerAuth: []
      parameters:
        - name: courseId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Course details
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Course'

  /courses/{courseId}/enroll:
    post:
      tags: [Learning]
      summary: Enroll in course
      security:
        - BearerAuth: []
      parameters:
        - name: courseId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '201':
          description: Enrollment successful
        '409':
          description: Already enrolled

  /lessons/{lessonId}:
    get:
      tags: [Learning]
      summary: Get lesson content
      security:
        - BearerAuth: []
      parameters:
        - name: lessonId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Lesson content
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Lesson'

  /lessons/{lessonId}/attempt:
    post:
      tags: [Learning]
      summary: Start lesson attempt
      security:
        - BearerAuth: []
      parameters:
        - name: lessonId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '201':
          description: Lesson attempt started
          content:
            application/json:
              schema:
                type: object
                properties:
                  attemptId:
                    type: string
                    format: uuid

  /lessons/{lessonId}/attempt/{attemptId}/submit:
    post:
      tags: [Learning]
      summary: Submit lesson responses
      security:
        - BearerAuth: []
      parameters:
        - name: lessonId
          in: path
          required: true
          schema:
            type: string
            format: uuid
        - name: attemptId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                responses:
                  type: object
                audioRecordings:
                  type: array
                  items:
                    type: string
                    format: uri
                timeSpent:
                  type: integer
      responses:
        '200':
          description: Responses submitted
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/LessonAttempt'

  # Speech Processing
  /speech/stt:
    post:
      tags: [Speech]
      summary: Speech to text conversion
      security:
        - BearerAuth: []
      requestBody:
        required: true
        content:
          multipart/form-data:
            schema:
              type: object
              properties:
                audio:
                  type: string
                  format: binary
                language:
                  type: string
                  default: fi
      responses:
        '200':
          description: Speech transcribed
          content:
            application/json:
              schema:
                type: object
                properties:
                  text:
                    type: string
                  confidence:
                    type: number
                  pronunciation:
                    type: object

  /speech/tts:
    post:
      tags: [Speech]
      summary: Text to speech conversion
      security:
        - BearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                text:
                  type: string
                language:
                  type: string
                  default: fi
                voice:
                  type: string
                speed:
                  type: number
                  default: 1.0
      responses:
        '200':
          description: Audio generated
          content:
            audio/mpeg:
              schema:
                type: string
                format: binary

  # CV Builder
  /cv/profiles:
    get:
      tags: [CV Builder]
      summary: Get user's CV profiles
      security:
        - BearerAuth: []
      responses:
        '200':
          description: List of CV profiles
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/CVProfile'

    post:
      tags: [CV Builder]
      summary: Create new CV profile
      security:
        - BearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                title:
                  type: string
                templateType:
                  type: string
                  enum: [finnish, international, academic]
                language:
                  type: string
                  enum: [fi, en]
              required: [title, templateType]
      responses:
        '201':
          description: CV profile created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CVProfile'

  /cv/profiles/{profileId}:
    get:
      tags: [CV Builder]
      summary: Get CV profile details
      security:
        - BearerAuth: []
      parameters:
        - name: profileId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: CV profile details
          content:
            application/json:
              schema:
                type: object
                properties:
                  profile:
                    $ref: '#/components/schemas/CVProfile'
                  currentDocument:
                    $ref: '#/components/schemas/CVDocument'

    put:
      tags: [CV Builder]
      summary: Update CV content
      security:
        - BearerAuth: []
      parameters:
        - name: profileId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                content:
                  type: object
      responses:
        '200':
          description: CV updated
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CVDocument'

  /cv/profiles/{profileId}/export:
    post:
      tags: [CV Builder]
      summary: Export CV
      security:
        - BearerAuth: []
      parameters:
        - name: profileId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                format:
                  type: string
                  enum: [pdf, docx]
                settings:
                  type: object
      responses:
        '200':
          description: CV exported
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CVExport'

  /cv/ai/suggestions:
    post:
      tags: [CV Builder]
      summary: Get AI writing suggestions
      security:
        - BearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                type:
                  type: string
                  enum: [bullet_points, summary, translation]
                context:
                  type: string
                content:
                  type: string
      responses:
        '200':
          description: AI suggestions
          content:
            application/json:
              schema:
                type: object
                properties:
                  suggestions:
                    type: array
                    items:
                      type: string

  # Services Directory
  /services:
    get:
      tags: [Services]
      summary: Search services
      security:
        - BearerAuth: []
      parameters:
        - name: city
          in: query
          schema:
            type: string
        - name: category
          in: query
          schema:
            type: string
        - name: targetGroup
          in: query
          schema:
            type: string
        - name: language
          in: query
          schema:
            type: string
        - name: search
          in: query
          schema:
            type: string
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
            maximum: 100
      responses:
        '200':
          description: Services found
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaginatedResponse'

  /services/{serviceId}:
    get:
      tags: [Services]
      summary: Get service details
      security:
        - BearerAuth: []
      parameters:
        - name: serviceId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Service details
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Service'

  /services/recommendations:
    get:
      tags: [Services]
      summary: Get personalized service recommendations
      security:
        - BearerAuth: []
      responses:
        '200':
          description: Recommended services
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Service'

  # Feedback
  /feedback:
    post:
      tags: [Feedback]
      summary: Submit feedback
      security:
        - BearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                serviceId:
                  type: string
                  format: uuid
                feedbackType:
                  type: string
                  enum: [outdated, incorrect, helpful, suggestion]
                message:
                  type: string
                contactEmail:
                  type: string
                  format: email
              required: [feedbackType, message]
      responses:
        '201':
          description: Feedback submitted

  # Admin Endpoints
  /admin/users:
    get:
      tags: [Admin]
      summary: Get users (admin only)
      security:
        - BearerAuth: []
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            default: 50
        - name: search
          in: query
          schema:
            type: string
      responses:
        '200':
          description: User list
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaginatedResponse'
        '403':
          description: Insufficient permissions

  /admin/content/review-queue:
    get:
      tags: [Admin]
      summary: Get content review queue
      security:
        - BearerAuth: []
      responses:
        '200':
          description: Review queue items
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    id:
                      type: string
                      format: uuid
                    sourceUrl:
                      type: string
                    changeType:
                      type: string
                    oldContent:
                      type: object
                    newContent:
                      type: object
                    detectedAt:
                      type: string
                      format: date-time
                    priority:
                      type: string
                      enum: [low, medium, high, urgent]

  /admin/content/review-queue/{itemId}/approve:
    post:
      tags: [Admin]
      summary: Approve content change
      security:
        - BearerAuth: []
      parameters:
        - name: itemId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Content approved

  /admin/analytics:
    get:
      tags: [Admin]
      summary: Get platform analytics
      security:
        - BearerAuth: []
      parameters:
        - name: period
          in: query
          schema:
            type: string
            enum: [day, week, month, year]
            default: week
      responses:
        '200':
          description: Analytics data
          content:
            application/json:
              schema:
                type: object
                properties:
                  userStats:
                    type: object
                  learningStats:
                    type: object
                  serviceStats:
                    type: object
                  systemHealth:
                    type: object

tags:
  - name: Authentication
    description: User registration and authentication
  - name: Users
    description: User profile management
  - name: Learning
    description: Language learning and assessment
  - name: Speech
    description: Speech recognition and synthesis
  - name: CV Builder
    description: CV creation and management
  - name: Services
    description: Municipal services directory
  - name: Feedback
    description: User feedback and reporting
  - name: Admin
    description: Administrative functions
```

## API Design Principles

### 1. RESTful Design
- Resource-based URLs
- Standard HTTP methods (GET, POST, PUT, DELETE)
- Consistent response formats
- Proper HTTP status codes

### 2. Security
- JWT-based authentication
- OAuth2 for third-party integrations
- Rate limiting (100 requests/minute per user)
- Input validation and sanitization
- HTTPS only in production

### 3. Error Handling
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input provided",
    "details": {
      "email": ["Invalid email format"],
      "password": ["Password too short"]
    },
    "timestamp": "2025-10-03T17:34:04Z"
  }
}
```

### 4. Pagination
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

### 5. Versioning
- URL versioning: `/v1/`, `/v2/`
- Backward compatibility for 2 major versions
- Deprecation notices with 6-month lead time

### 6. Performance
- Response caching with ETags
- Compression (gzip)
- CDN for static assets
- Database query optimization
- Background job processing for heavy operations

### 7. Monitoring
- Request/response logging
- Performance metrics
- Error tracking
- Health check endpoints
- API usage analytics

This OpenAPI specification provides a comprehensive foundation for SOUAI's backend API, ensuring consistency, security, and scalability while supporting all planned features.