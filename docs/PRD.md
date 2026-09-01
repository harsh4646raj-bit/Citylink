# Citylink Product Requirements Document (PRD)

**Status:** Master product specification\
**Version:** 1.0\
**Date:** 2026-08-25

## 1. Product Definition

Citylink is a city-based social opportunity platform connecting people,
communities, businesses, services, jobs, events, marketplace activity
and collective local demand.

Citylink is not merely a social network, business directory, or
marketplace. Its purpose is to become a connected digital layer for a
city.

> **People should be able to discover what is happening in their city,
> join communities, discover businesses and opportunities, and
> collectively create demand that can unlock better access and
> potentially better pricing.**

The signature feature is **Group Deals / Group Buy**.

Examples: - 10--15 women in one society book salon-at-home slots on the
same day. - Multiple homes in one building request sofa/carpet
cleaning. - 20--30 flats collectively request AC, RO or geyser
maintenance. - A vendor receives aggregated demand instead of finding
every customer independently.

Citylink aggregates demand and connects that demand with vendors. It
does not need to directly provide every service.

## 2. Problem

Local digital activity is fragmented across social networks, messaging
apps, marketplaces, directories, business profiles, job portals, event
platforms and service providers.

Users need one place to: - Discover local information. - Participate in
communities. - Find businesses. - Find services. - Buy and sell. - Find
jobs and opportunities. - Discover events. - Join Group Deals. -
Communicate with local people and businesses.

Businesses need one place to: - Establish a trusted local presence. -
Receive leads. - Publish services/products. - Respond to Group Deal
demand. - Communicate with customers. - Collect reviews. - View
analytics.

## 3. Target Users

### Residents

People who want local discovery, communities, services, marketplace
activity and opportunities.

### Students

Students who need institution communities, events, opportunities and
local discovery.

### Communities

City, college, society, neighborhood and interest communities.

Examples: - Muzaffarpur Community: public. - MIT College: private, with
student verification.

### Businesses

Businesses that need discovery, leads, services, products, Group Deal
opportunities, messaging and analytics.

### Vendors

Service providers responding to aggregated demand.

### Administrators

People operating, moderating, verifying and securing Citylink.

## 4. Product Principles

1.  City-first.
2.  Instant city switching.
3.  Cross-city posting.
4.  One user identity.
5.  Communities are first-class.
6.  Group Deals are a primary feature.
7.  Businesses are first-class participants.
8.  Trust is transparent.
9.  Privacy is protected by default.
10. Consumer experience is mobile-first.
11. Consumer app, business web/dashboard and admin panel share one
    backend.
12. Start simple and scale from real usage.

## 5. City Model

A user can have separate contexts: - Current physical location, where
available. - Profile/home city. - Browsing city. - Post city. - Business
city. - Listing city. - Service city. - Group Deal city.

Changing the browsing city must not require changing the account.

A user in Muzaffarpur can browse Patna or Delhi and can create content
for another supported city.

## 6. Core Feature Areas

### Authentication

-   Signup
-   Login
-   Username
-   Password
-   Verification
-   Password recovery
-   Sessions

### Social

-   Feed
-   Posts
-   Images/video
-   Comments
-   Reactions
-   Follow/following
-   Profiles
-   Sharing
-   Notifications

### Cities

-   Search
-   City switcher
-   Recent cities
-   City discovery
-   City feeds
-   City businesses
-   City communities
-   City Group Deals
-   City marketplace

### Communities

-   Public communities
-   Private communities
-   Membership
-   Verification
-   Moderation
-   Announcements
-   Polls
-   Events
-   Community Group Deals

### Businesses

-   Business profile
-   Business web page
-   Business dashboard
-   Team members
-   Products
-   Services
-   Leads
-   Group Deal opportunities
-   Reviews
-   Analytics
-   Messaging

### Group Deals

-   Demand creation
-   Participation
-   Target count
-   Vendor discovery
-   Vendor offers
-   Potential pricing
-   Confirmed pricing
-   Scheduling
-   Booking
-   Completion
-   Reviews
-   Disputes

### Marketplace

-   Listings
-   Search
-   Filters
-   Seller profiles
-   Messaging
-   Save
-   Report

### Jobs

-   Job creation
-   Discovery
-   Applications
-   Employer management

### Services

-   Provider profiles
-   Service listings
-   Service areas
-   Pricing
-   Booking
-   Reviews

### Events

-   Creation
-   Discovery
-   Details
-   RSVP
-   Notifications
-   Attendance

### Messaging

-   Direct chat
-   Contextual chat
-   Group conversations where required
-   Media
-   Read state
-   Blocking/reporting

### Trust & Safety

-   Verification
-   Reporting
-   Moderation
-   Blocking
-   Fraud detection
-   Disputes
-   Audit logs

## 7. Group Deal Requirement

Group Deals must be a primary feature, not an experimental secondary
feature.

Core flow:

``` text
Need
→ Group Deal
→ Participants
→ Aggregated demand
→ Vendor offers
→ Confirmed offer
→ Booking
→ Service
→ Review
```

Potential pricing and confirmed pricing must always be clearly
differentiated.

## 8. Community Requirement

Users can create communities.

Community examples: - Public city community. - Private institutional
community. - Society community. - Neighborhood community. - Interest
community.

Private communities can require verification.

## 9. Three Platforms

### Consumer App

For residents, students, customers, sellers and community members.

### Business Profile Web / Business Dashboard

For businesses and vendors.

### Admin Panel

For Citylink operators.

All three share: - Authentication - Database - Core APIs - Business
data - Community data - Group Deal data - Trust systems -
Notifications - Analytics

## 10. Non-Goals for First Release

Do not prioritize: - Full delivery infrastructure. - Large advertising
platform. - Complex wallet infrastructure. - Livestreaming. - Advanced
creator economy. - Excessive AI automation. - Premature microservices.

First prove local utility.

## 11. North Star

A strong long-term metric is:

> **Successful Local Connections**

Examples: - Community participation. - Business discovery. - Completed
Group Deal. - Marketplace connection. - Job connection. - Event
participation. - Service completion.

## 12. Launch

Start with one city and make it genuinely useful.

Muzaffarpur is a logical pilot candidate given the local-business and
community focus already established.

Seed: - Local communities. - College communities. - Society/neighborhood
communities. - Local businesses. - Service providers. - Group Deals.

Then expand city-by-city.

## 13. Product Success

Citylink should prove: - Reliable onboarding. - Immediate city
switching. - Cross-city posting. - Community participation. - Business
onboarding. - Group Deal completion. - Vendor participation. - Safe
communication. - Effective moderation. - Reliable performance.
