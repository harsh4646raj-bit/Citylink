# Citylink Architecture

**Status:** Master technical architecture

## 1. Architecture Goal

Citylink should begin as a modular, secure and scalable system without
prematurely becoming a large microservice ecosystem.

The preferred approach is a modular backend with clear domains.
High-load domains can later be extracted.

## 2. Platform Model

``` text
                    CITYLINK BACKEND
                          |
          +---------------+---------------+
          |               |               |
          v               v               v
     Consumer App    Business Web     Admin Panel
```

One backend and one source of truth.

## 3. Major Domains

-   Authentication
-   Users
-   Profiles
-   Cities
-   Communities
-   Social
-   Businesses
-   Marketplace
-   Services
-   Jobs
-   Events
-   Group Deals
-   Messaging
-   Notifications
-   Search
-   Reviews
-   Moderation
-   Verification
-   Payments
-   Analytics
-   AI

## 4. Consumer App Architecture

Conceptual areas: - auth - home - discover - create - messages -
profile - communities - group-deals - marketplace - services - jobs -
events - business

Framework-specific organization must follow the actual project stack.

## 5. Business Web Architecture

Areas: - overview - leads - group-deals - services - products -
messages - reviews - analytics - team - settings

## 6. Admin Architecture

Areas: - dashboard - users - businesses - communities - reports -
verification - group-deals - disputes - payments - analytics -
settings - audit

## 7. Request Flow

``` text
User action
→ Frontend validation
→ Authenticated request
→ Authorization
→ Business logic
→ Database/storage
→ Event/notification
→ UI update
```

## 8. City Context

City is a first-class entity.

Requests may carry: - browsing_city_id - content_city_id -
business_city_id - service_city_id - deal_city_id

The backend validates all selected IDs and access rules.

## 9. Media

Large media should use object/media storage.

Database stores: - media ID - storage key - media type - dimensions -
processing status - thumbnail/reference

## 10. Real-Time

Use real-time where it materially improves: - Messaging -
Notifications - Group Deal participant updates - Vendor offers - Booking
status

Do not force real-time behavior everywhere.

## 11. Search

Search should eventually index: - People - Businesses - Communities -
Posts - Listings - Services - Jobs - Events - Group Deals

Private content must never leak through search.

## 12. Notifications

Use event-driven notifications.

Example:

``` text
Participant joins Group Deal
→ event
→ notification service
→ creator/participants/vendor
```

## 13. Background Jobs

Use background workers for: - Media processing - Notifications - Email -
Search indexing - Analytics aggregation - Fraud analysis - Scheduled
reminders - Cleanup

## 14. AI

AI must use controlled tools.

``` text
AI
→ Citylink AI tool
→ authorized domain service
→ database
```

Never provide unrestricted database access.

## 15. Security Boundary

Every protected operation: 1. Authenticates. 2. Authorizes. 3.
Validates. 4. Rate-limits when needed. 5. Applies business rules. 6.
Uses database security.

Frontend hiding is not authorization.

## 16. Scaling

Start:

``` text
App + API + Database + Storage
```

Then add as needed:

``` text
Cache + Search + Queues + CDN + Workers
```

Only later extract dedicated services where real load justifies them.

## 17. Observability

Use: - Structured logs - Error tracking - Metrics - Performance
monitoring - Database monitoring - Worker monitoring - Security alerts -
Audit logs

## 18. Environments

Maintain: - Development - Staging - Production

Never mix production secrets into development.

## 19. Backup

Critical data needs: - Automated backups - Retention - Restore testing -
Recovery documentation
