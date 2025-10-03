# SOUAI - Product Requirements Document

## 1. Executive Summary

**Product Name:** SOUAI  
**Domain:** souai.fi (placeholder)  
**Mission:** Accelerate immigrant integration in Finland through personalized AI-powered language learning, career support, and verified municipal services.

## 2. Problem Statement

Newly arrived and resident immigrants in Finland face significant barriers to integration:
- Language learning resources are generic and not tailored to Finnish society
- CV and job application processes differ significantly from home countries
- Municipal services are fragmented and difficult to navigate
- Information sources are often outdated or unreliable

## 3. Goals & Success Metrics

### Primary Goals
- **Language Proficiency:** Increase user Finnish level by 1 CEFR level within 3 months
- **Employment Readiness:** 70% of users create ATS-compliant CVs within 2 weeks
- **Service Discovery:** 80% of users find relevant municipal services for their situation

### Success Metrics
- **Engagement:** 60% DAU/MAU ratio
- **Completion:** 40% course completion rate
- **Quality:** 85% user satisfaction score
- **Performance:** <3s page load time, 95%+ uptime
- **Accessibility:** WCAG 2.1 AA compliance

## 4. Target Personas

### Primary: Recent Immigrant "Sari"
- **Background:** Arrived 6 months ago, university education, basic English
- **Goals:** Learn Finnish for employment, understand Finnish workplace culture
- **Pain Points:** Overwhelmed by language complexity, unfamiliar job market
- **Tech Comfort:** Moderate, smartphone-first

### Secondary: Established Resident "Ahmed"
- **Background:** 2+ years in Finland, working but wants career advancement
- **Goals:** Improve professional Finnish, navigate career services
- **Pain Points:** Plateau in language learning, limited professional network
- **Tech Comfort:** High, multi-device user

### Tertiary: Family Member "Maria"
- **Background:** Spouse/parent, limited formal education, basic digital literacy
- **Goals:** Daily life Finnish, understand children's school system
- **Pain Points:** Time constraints, intimidated by technology
- **Tech Comfort:** Low, needs simple interfaces

## 5. User Journeys

### Journey 1: Language Learning (Sari)
1. **Discover:** Finds SOUAI through social media recommendation
2. **Onboard:** Language detection → Finnish assessment → A2 placement
3. **Learn:** Receives 4-week personalized plan focused on employment vocabulary
4. **Practice:** Daily 15-min lessons with speaking practice and feedback
5. **Progress:** Completes level, receives certificate, advances to B1 track

### Journey 2: Job Preparation (Ahmed)
1. **Enter:** Logs in to existing account, navigates to CV Builder
2. **Create:** Uses guided builder with Finnish workplace templates
3. **Optimize:** AI suggests improvements for ATS compatibility
4. **Export:** Downloads PDF and DOCX versions in Finnish and English
5. **Prepare:** Takes mini-course on Finnish interview culture

### Journey 3: Service Discovery (Maria)
1. **Search:** Needs to register child for school, uses Services Finder
2. **Filter:** Selects Helsinki + Education + Family services
3. **Learn:** Reads step-by-step guide with required documents
4. **Act:** Clicks through to official municipal booking system
5. **Follow-up:** Reports outdated information, receives confirmation

## 6. Risks & Mitigation

### High Risk
- **Content Accuracy:** Outdated municipal information misleads users
  - *Mitigation:* Automated weekly sync, manual review queue, clear "last updated" dates

- **Language Quality:** Poor AI-generated Finnish content damages credibility
  - *Mitigation:* Native speaker review, community feedback, expert linguistic review

### Medium Risk
- **Performance:** Slow speech processing affects user experience
  - *Mitigation:* Edge caching, optimized audio codecs, fallback text input

- **Accessibility:** Complex features exclude users with disabilities
  - *Mitigation:* Early accessibility testing, keyboard navigation, screen reader support

### Low Risk
- **Competition:** Similar services launch in market
  - *Mitigation:* Focus on unique value proposition (verified municipal content + AI personalization)

## 7. Non-Functional Requirements

- **Performance:** Core Web Vitals green on 3G mobile
- **Accessibility:** WCAG 2.1 AA compliance
- **Security:** GDPR-compliant, encrypted data, minimal PII collection
- **Scalability:** Support 10,000+ concurrent users
- **Reliability:** 99.5% uptime SLA
- **Internationalization:** 6 languages with RTL support for Arabic

## 8. Out of Scope (V1)

- Official YKI exam integration
- Direct job posting/application system
- Real-time video tutoring
- Gamification beyond basic progress tracking
- Integration with Kela/TE systems
- Mobile app (PWA sufficient for MVP)

---

**Approval Required Before Development**  
*This PRD must be signed off by stakeholders before technical implementation begins.*