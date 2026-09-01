# Citylink Admin Panel

## Purpose

The Admin Panel is a separate operational platform for running Citylink.

## Roles

-   Super Admin
-   Operations Admin
-   Moderation Admin
-   Community Admin
-   Support Admin
-   Analytics Admin

Permissions must be granular.

## Dashboard

Show: - Active users - New users - Active businesses - Communities -
Group Deals - Reports - Verification queue - Disputes - System health -
Key metrics

## User Management

-   Search
-   View status
-   Review reports
-   Suspend where authorized
-   Verification
-   Security events

## Business Management

-   Search
-   Profile review
-   Verification
-   Reports
-   Suspension
-   Ownership
-   Team permissions

## Community Management

-   Search
-   Privacy review
-   Reports
-   Moderation
-   Verification
-   Suspension

## Group Deal Operations

Monitor: - Deals - Vendors - Offers - Bookings - Cancellations -
Disputes - Suspicious activity

Admins must not silently manipulate pricing.

## Reports

States:

``` text
New → Reviewing → Action → Resolved
```

## Verification

Review business/community/student verification where applicable.

## Disputes

Show: - Parties - Deal/booking - Offer - Evidence - Authorized
communication context - Payment state - Resolution

## Payments

Where supported: - Search - Status - Refunds - Disputes - Reconciliation

Never store raw payment credentials.

## Analytics

-   Growth
-   Retention
-   Cities
-   Communities
-   Group Deals
-   Businesses
-   Marketplace
-   Jobs
-   Services
-   Events

## Audit

Every sensitive action must record: - Actor - Action - Target -
Timestamp - Reason where applicable - State change where applicable

## Platform Settings

-   Feature flags
-   Categories
-   Cities
-   Moderation policies
-   Notifications
-   Platform configuration

Dangerous settings require elevated permission.

## Security

-   Strong authentication
-   2FA
-   Role-based access
-   Session controls
-   Audit logs
