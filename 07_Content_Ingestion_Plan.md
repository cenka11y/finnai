# SOUAI - Content Ingestion Plan

## Overview

SOUAI's content ingestion system automatically monitors and incorporates updates from authoritative Finnish sources while respecting legal boundaries and terms of service. This plan ensures accurate, up-to-date information while maintaining compliance and trust.

## Authorized Content Sources

### Primary Sources

1. **InfoFinland.fi (infofinland.fi)**
   - **Owner**: City of Helsinki, supported by KEKO (Association of Finnish Local and Regional Authorities)
   - **Content**: Comprehensive information for immigrants about life in Finland
   - **Language Coverage**: Finnish, Swedish, English, Arabic, Russian, Somali, French, Spanish, Estonian
   - **Update Frequency**: Weekly monitoring, content updates vary
   - **Legal Status**: Public service information, open for non-commercial reference

2. **Kotoutuminen.fi (kotoutuminen.fi)**
   - **Owner**: Finnish Ministry of Economic Affairs and Employment
   - **Content**: Integration services, courses, and official guidance
   - **Language Coverage**: Finnish, Swedish, English, and selected other languages
   - **Update Frequency**: Bi-weekly monitoring
   - **Legal Status**: Government information, public domain for informational use

### Supplementary Sources (Future)

3. **Municipal Websites**
   - Individual city/municipality official sites
   - Service-specific information and contact details
   - On-demand monitoring based on user location

4. **TE-palvelut.fi (Employment Services)**
   - Employment and career guidance
   - Job search resources
   - Restricted to linking and attribution only

---

## Legal Compliance Framework

### 1. Robots.txt Compliance

**Implementation Strategy:**
```python
# Automated robots.txt checker
class RobotsChecker:
    def __init__(self, base_url):
        self.robots_url = f"{base_url}/robots.txt"
        self.rules = self.parse_robots()
    
    def is_allowed(self, path, user_agent="*"):
        # Check if path is allowed for scraping
        # Return True/False based on robots.txt rules
        pass
    
    def get_crawl_delay(self):
        # Respect crawl-delay directive
        pass
```

**Monitoring Process:**
- Check robots.txt weekly for changes
- Automatic compliance verification before each crawl
- Manual review for any disallowed content areas
- Immediate halt if robots.txt prohibits access

### 2. Terms of Service Adherence

**InfoFinland.fi Terms Analysis:**
- ✅ **Permitted**: Reference and citation for informational purposes
- ✅ **Permitted**: Summarization and paraphrasing with attribution
- ❌ **Prohibited**: Bulk copying or republishing verbatim
- ❌ **Prohibited**: Commercial use without permission
- **Requirement**: Clear source attribution and linking back

**Kotoutuminen.fi Usage Guidelines:**
- ✅ **Permitted**: Educational and informational reference
- ✅ **Permitted**: Integration service promotion (aligns with mission)
- ❌ **Prohibited**: Content modification without context
- **Requirement**: Government source acknowledgment

### 3. Content Usage Principles

**RAG Approach (Retrieval-Augmented Generation):**
```
Original Content → Summarization → Fact Extraction → Citation → User Presentation
```

**Example Implementation:**
```
Source: "Väestörekisteriin ilmoittaminen on tehtävä 7 päivän kuluessa muutosta."
RAG Output: "Population register notification must be made within 7 days of change."
Citation: "Source: InfoFinland.fi - Population Registration (Last checked: 2025-10-01)"
```

---

## Technical Implementation

### 1. Content Monitoring Architecture

```python
# Content monitoring system
class ContentMonitor:
    def __init__(self):
        self.sources = {
            'infofinland': {
                'base_url': 'https://www.infofinland.fi',
                'frequency': 'weekly',
                'robots_compliant': True,
                'last_checked': None
            },
            'kotoutuminen': {
                'base_url': 'https://kotoutuminen.fi',
                'frequency': 'bi-weekly',  
                'robots_compliant': True,
                'last_checked': None
            }
        }
    
    def schedule_crawls(self):
        # Schedule crawls based on frequency and robots.txt crawl-delay
        pass
    
    def detect_changes(self, url, content_hash):
        # Compare content hashes to detect updates
        pass
    
    def queue_for_review(self, change_data):
        # Add changes to human review queue
        pass
```

### 2. Change Detection System

**Content Fingerprinting:**
- SHA-256 hash of page content (excluding dynamic elements)
- Structural analysis to detect significant changes
- Metadata tracking (last-modified headers, timestamps)

**Change Categories:**
- **Critical**: Contact info changes, service discontinuation
- **Major**: Process changes, requirement updates  
- **Minor**: Formatting, non-essential text updates
- **Cosmetic**: Design changes, navigation updates

### 3. Processing Pipeline

```
1. Automated Crawl → 2. Content Extraction → 3. Change Detection → 
4. Human Review Queue → 5. Approval → 6. RAG Integration → 7. User Update
```

**Automated Processing (Steps 1-3):**
- Respect crawl delays and rate limits
- Extract main content using content selectors
- Compare with previous versions
- Flag significant changes

**Human Review (Step 4):**
- Critical/Major changes require manual approval
- Legal compliance verification
- Content accuracy validation
- Source attribution confirmation

---

## Content Review Workflow

### 1. Review Queue Management

```javascript
// Admin review interface
const ReviewItem = {
  id: 'uuid',
  sourceUrl: 'https://infofinland.fi/page',
  changeType: 'major', // critical, major, minor
  detectedAt: '2025-10-03T17:34:04Z',
  priority: 'high',
  oldContent: {...},
  newContent: {...},
  impactedServices: ['service-1', 'service-2'],
  estimatedUsers: 1250,
  status: 'pending' // pending, reviewing, approved, rejected
}
```

**Priority Matrix:**
- **Urgent**: Service closure, emergency information
- **High**: Contact changes, process modifications
- **Medium**: Content updates, new services
- **Low**: Cosmetic changes, minor corrections

### 2. Human Review Process

**Review Checklist:**
- [ ] Content accuracy verified
- [ ] Source attribution correct
- [ ] No copyright violations
- [ ] Legal compliance maintained
- [ ] User impact assessed
- [ ] Translation quality checked (if applicable)

**Approval Workflow:**
1. **Level 1**: Content moderator review
2. **Level 2**: Senior admin approval (for critical changes)
3. **Level 3**: Legal review (for compliance questions)

### 3. Quality Assurance

**Automated Checks:**
- Link validity verification
- Content completeness validation
- Formatting consistency
- Translation accuracy (basic checks)

**Manual Verification:**
- Cultural appropriateness
- Clarity for immigrant audience
- Technical accuracy
- Legal compliance

---

## Update Distribution

### 1. User Notification Strategy

**Notification Types:**
- **Breaking**: Service closure or critical process change
- **Important**: New services, requirement changes
- **Info**: Minor updates, enhancements

**Delivery Channels:**
- In-app notifications (immediate)
- Email digest (weekly summary)
- Dashboard alerts (for service changes)

### 2. Content Versioning

```sql
-- Content version tracking
CREATE TABLE content_versions (
    id UUID PRIMARY KEY,
    service_id UUID REFERENCES services(id),
    version_number INTEGER,
    changes_summary TEXT,
    source_url VARCHAR(500),
    content_hash VARCHAR(64),
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);
```

**Version Management:**
- Maintain last 10 versions of each service entry
- Track approval history and changes
- Enable content rollback if needed
- Audit trail for compliance

---

## Compliance Monitoring

### 1. Regular Compliance Audits

**Monthly Reviews:**
- Robots.txt compliance verification
- Terms of service changes monitoring
- Legal requirement updates
- Usage pattern analysis

**Quarterly Assessments:**
- Source relationship review
- Legal compliance audit
- Content quality assessment
- User feedback integration

### 2. Emergency Procedures

**Content Removal Protocol:**
If source owner requests content removal:
1. Immediate content takedown (within 4 hours)
2. User notification of changes
3. Alternative source identification
4. Legal compliance documentation

**Robots.txt Changes:**
If robots.txt restricts previously allowed content:
1. Immediate crawling halt
2. Content review for compliance
3. Manual alternative sourcing
4. Source relationship renegotiation

---

## Performance & Scaling

### 1. Efficient Crawling

**Rate Limiting:**
- Maximum 1 request per 10 seconds per domain
- Respect server-specified crawl delays
- Exponential backoff for rate limit responses
- User-agent identification: "SOUAI-Bot/1.0"

**Resource Optimization:**
- Incremental crawling (only changed pages)
- Content deduplication
- Intelligent scheduling
- Bandwidth-aware processing

### 2. Storage Strategy

**Content Storage:**
- RAG chunks in vector database
- Original content snapshots in blob storage
- Metadata in relational database
- CDN for frequently accessed content

**Data Retention:**
- Source content: 2 years
- Processed summaries: Indefinite
- Change history: 5 years
- Audit logs: 7 years (GDPR compliance)

---

## Risk Mitigation

### 1. Source Reliability

**Backup Strategies:**
- Multiple source validation
- Content cross-referencing
- Manual verification procedures
- Expert review processes

**Failure Handling:**
- Graceful degradation for source unavailability
- Cached content serving
- Alternative source activation
- User notification of limitations

### 2. Legal Protection

**Documentation Requirements:**
- All source permissions documented
- Usage logs maintained
- Compliance verification records
- Legal review timestamps

**Relationship Management:**
- Regular communication with source owners
- Proactive compliance reporting
- Partnership agreement establishment
- Conflict resolution procedures

---

## Success Metrics

### 1. Content Quality KPIs

- **Accuracy Rate**: 99.5% content accuracy target
- **Freshness**: 95% of content under 30 days old
- **Coverage**: 80% of essential immigrant services covered
- **User Satisfaction**: 4.5/5 rating for content helpfulness

### 2. Compliance Metrics

- **Zero** legal violations
- **100%** robots.txt compliance
- **<4 hours** response time for takedown requests
- **Monthly** compliance audit completion

### 3. Operational Efficiency

- **15 minutes** average change detection time
- **2 hours** average human review time
- **99.9%** system uptime
- **<1%** false positive change detection

This content ingestion plan ensures SOUAI maintains the highest standards of legal compliance while providing users with accurate, up-to-date information from trusted Finnish authorities.