# Citylink Testing & QA

## 1. Philosophy

A feature is complete only when it works under normal, invalid, empty,
slow, unauthorized and realistic conditions.

## 2. Layers

-   Unit
-   Integration
-   UI
-   End-to-end
-   Security
-   Performance

## 3. Authentication

Test: - Signup - Duplicate account - Login - Wrong password -
Verification - Reset - Session expiry - Logout - Device management

## 4. City

Test: - Search - Immediate switching - No logout - Cross-city posting -
City discovery - Invalid city - Private content isolation

## 5. Communities

Test: - Public creation - Private creation - Join - Request - Approval -
Rejection - Verification - Admin permissions - Moderator permissions -
Privacy leakage

## 6. Group Deals

Test: - Create - Join - Leave - Target - Vendor offer - Multiple
offers - Selection - Booking - Slot - Cancellation - Completion -
Review - Dispute - Price state

## 7. Business

Test: - Creation - Ownership - Team permissions - Services - Products -
Leads - Group Deal offers - Reviews - Analytics

## 8. Marketplace

Test: - Listing - Editing - Search - Filters - Seller - Messaging -
Report - Block

## 9. Messaging

Test: - Send - Receive - Read - Media - Block - Report - Unauthorized
access

## 10. Security

Test: - Authorization bypass - IDOR-style access - Private content
leakage - Admin escalation - Rate limits - Upload abuse - Session
security

## 11. Accessibility

Test: - Keyboard - Screen reader - Contrast - Focus - Touch targets -
Reduced motion - Text scaling - Hindi/English layouts

## 12. Responsive

Test: - Small phone - Large phone - Tablet - Laptop - Desktop

Check overflow, clipping, navigation, cards, tables and dialogs.

## 13. Performance

Check: - Initial load - Feed - Media - Search - City switching -
Messaging - Group Deal updates - Business dashboard - Admin tables

## 14. Regression

Critical flows: - Signup - Login - City switch - Post - Community -
Group Deal - Business offer - Messaging - Report - Admin moderation

## 15. Production Checklist

-   No critical bugs
-   No exposed secrets
-   Security active
-   Migrations verified
-   Backups configured
-   Error tracking active
-   Analytics active
-   Rate limits active
-   Privacy tested

## 16. Bug Template

``` text
ID:
Title:
Environment:
Steps:
Expected:
Actual:
Severity:
Evidence:
Fix:
Verification:
```

## 17. Severity

-   P0: security/data loss/outage
-   P1: critical feature broken
-   P2: major impairment
-   P3: minor
-   P4: cosmetic

## 18. Definition of Done

Implementation + tests + security + responsive/accessibility checks +
documentation + Memory update.
