# Citylink Build Procedure

## Purpose

This document defines **how Citylink must be built with an AI coding agent**.

Citylink must NOT be created by giving the coding agent one huge prompt such as:

> "Build the complete Citylink app."

Instead, development must happen in **small, controlled, sequential phases**. Each phase has a clear goal, implementation scope, testing requirements, and completion checkpoint.

The agent must understand the existing project before modifying it and must never rebuild completed work unnecessarily.

---

# 1. Core Development Principle

Citylink is developed as a sequence:

```text
Plan
  ↓
Design
  ↓
Build one phase
  ↓
Run / test
  ↓
Fix issues
  ↓
Verify against requirements
  ↓
Update Memory.md
  ↓
Lock the phase
  ↓
Move to next phase
```

A phase is considered complete only when:

1. The requested functionality exists.
2. The UI matches the approved design direction.
3. The implementation works with the existing architecture.
4. Existing completed features still work.
5. Errors and obvious console warnings are resolved.
6. The agent reports exactly what changed.
7. `Memory.md` is updated.
8. The next phase is not started until the current phase is accepted.

---

# 2. Never Build Everything in One Prompt

The AI agent should receive focused prompts.

### Bad

```text
Build the entire Citylink app with authentication,
feed, communities, businesses, group buying,
admin panel, database and all screens.
```

This creates several problems:

- Too many files change at once.
- The agent may invent missing requirements.
- UI quality becomes inconsistent.
- Bugs become difficult to locate.
- Features may be partially implemented.
- Database relationships may be wrong.
- Later changes can break earlier work.

### Correct

```text
Implement Phase X only.

Read PRD.md, Architecture.md, Rules.md,
Phases.md, Design.md, Features.md and Memory.md first.

Do not modify unrelated completed features.

Implement only the requirements listed for this phase.
After implementation, test the phase and report:
1. Files changed
2. Features completed
3. Tests performed
4. Errors found and fixed
5. Anything still pending
```

---

# 3. Documentation Must Be Read Before Coding

Before beginning a phase, the agent should read:

```text
README.md
PRD.md
Architecture.md
Rules.md
Phases.md
Design.md
Features.md
Screens.md
User-Flows.md
Database.md
Security.md
Memory.md
```

Then read the specialized document when relevant:

```text
Business.md
Communities.md
Group-Deals.md
Admin.md
Testing.md
```

For implementation guidance:

```text
11-DEVELOPMENT-ROADMAP.md
12-CITYLINK-DESIGN-PROMPTS.md
13-AI-AGENT-INSTRUCTIONS.md
```

The agent must treat these documents as the project source of truth.

---

# 4. Phase Execution Structure

Every phase should follow this exact procedure.

## Step 1: Phase Brief

Tell the agent:

- Phase number
- Phase name
- Goal
- Exact features included
- Exact features excluded
- Relevant documentation

## Step 2: Inspect Existing Project

The agent must first inspect:

- Current folder structure
- Existing screens
- Existing components
- Existing routes
- Existing database schema
- Existing services
- Existing authentication
- Existing state management
- Existing design system

It must not blindly create duplicate files.

## Step 3: Implementation Plan

Before making large changes, the agent should provide a short implementation plan.

Example:

```text
Phase 3 implementation plan:

1. Create city selector component.
2. Add city state management.
3. Add city switcher to required navigation areas.
4. Connect city selection to feed filtering.
5. Allow posting to any selected city.
6. Preserve current user city.
7. Test switching between three cities.
```

## Step 4: Build

The agent implements only the current phase.

Do not add unrelated "nice to have" features.

## Step 5: Test

Test:

- Happy path
- Empty states
- Loading states
- Error states
- Mobile responsiveness
- Navigation
- Existing features affected by the change

## Step 6: Visual Review

Check:

- Spacing
- Typography
- Icons
- Cards
- Buttons
- Animations
- Bottom navigation
- Dark/light behavior if applicable
- Responsive layout
- Consistency with Design.md

## Step 7: Fix

Fix issues found during testing.

Do not move to the next phase while known critical problems remain.

## Step 8: Completion Report

The agent must report:

```text
PHASE COMPLETE

Completed:
- ...

Files changed:
- ...

Tests:
- ...

Fixed:
- ...

Known limitations:
- ...

Next phase:
- ...
```

## Step 9: Update Memory.md

Record:

- Date
- Phase completed
- Important decisions
- Files changed
- Current project state
- Current active file/work
- Next step
- Any unresolved issue

---

# 5. Recommended Citylink Build Order

The exact feature definitions remain in `Phases.md`. This document defines the **implementation procedure**, not a replacement for the phase specifications.

The broad implementation order should be:

## Phase 1: Project Foundation

Build the basic project foundation.

Typical scope:

- Project initialization
- Core configuration
- Base routing
- Global styles
- Design system foundation
- Basic reusable components
- Environment configuration

Do not build the entire application here.

### Completion checkpoint

The project must run successfully and have a stable foundation for later phases.

---

## Phase 2: Core Visual Experience

Build the approved initial Citylink visual experience and core navigation structure.

Focus on:

- App shell
- Main visual identity
- Navigation
- Core layout
- Initial home experience

### Completion checkpoint

The application should look like a real Citylink product, even though many backend features are not implemented yet.

---

## Phase 3: City System

Implement Citylink's city-first behavior.

Important requirement:

> A user must be able to switch between cities immediately.

The city system must support:

- Current city
- City search
- Instant city switching
- City-based content
- Posting to a selected city
- Ability to post to any city without permanently changing the user's home/current city

### Completion checkpoint

Switching from one city to another must update the relevant city content without breaking navigation.

---

## Phase 4: Authentication and Onboarding

Implement the approved authentication flow.

After registration, Citylink should support the planned username/password experience and profile setup.

Include:

- Registration
- Login
- Username
- Password
- Profile setup
- Session handling
- Logout
- Authentication errors

### Completion checkpoint

A new user can register, log in, remain authenticated, and reach the application correctly.

---

## Phase 5: User Profile

Build the personal profile system.

Include the approved profile information, profile editing, user activity and privacy behavior.

### Completion checkpoint

Users can view and edit their own profile and view permitted public information from other users.

---

## Phase 6: Feed and Posts

Build the core social/local feed.

Include the approved:

- Feed
- Post creation
- Post cards
- Media
- Interactions
- City context
- Empty/loading/error states

### Completion checkpoint

A user can create a post, see it in the correct context, and interact with posts according to the rules.

---

## Phase 7: Discovery and Search

Build discovery features.

Include:

- Search
- Categories
- Local discovery
- Relevant recommendations
- City-aware results

### Completion checkpoint

Users can find useful local content without needing to manually browse everything.

---

## Phase 8: Engagement and Advanced Feed Features

Implement the approved engagement features and the previously defined Phase 8 requirements, including the locked Point 23.

Do not invent or replace Point 23 if its exact specification is not available.

### Completion checkpoint

All Phase 8 requirements are implemented and tested without changing unrelated behavior.

---

## Phase 9: Notifications and Communication

Build the approved notification and communication functionality.

Include the required notification states and navigation back to the relevant content.

### Completion checkpoint

Important user actions generate the correct notification behavior.

---

## Phase 10: Business Platform

Citylink has three connected platforms:

```text
1. Citylink App
2. Business Profile Web
3. Admin Panel
```

A person who signs up for the business experience should receive access to the business dashboard according to the approved business rules.

Build:

- Business profile
- Business dashboard
- Business information
- Services/products
- Media
- Leads/contact actions
- Business-side management

### Completion checkpoint

A business can manage its profile and users can discover the business through Citylink.

---

## Phase 11: Business Discovery and Local Marketplace

Connect business profiles with user discovery.

Build the approved local business discovery, search, profile viewing and interaction flows.

### Completion checkpoint

A normal user can discover a business and move through the complete approved business interaction flow.

---

## Phase 12: Community Foundation

Build the community system.

Citylink communities can be:

### Public

Anyone can discover and participate according to community rules.

Example:

```text
Muzaffarpur Community
```

### Private

Only approved members can access the community.

Example:

```text
MIT College
```

A private community may restrict membership to eligible members.

### Completion checkpoint

Users can discover, join/request access to, participate in, and manage communities according to their permission level.

---

## Phase 13: Community Features

Build deeper community functionality.

Include approved:

- Community feed
- Members
- Posts
- Events
- Announcements
- Moderation
- Roles
- Community discovery

### Completion checkpoint

A community functions as a real local/group space rather than simply being another feed.

---

## Phase 14: Group Deals / Demand Aggregation

This is a **primary Citylink feature**.

Citylink does not need to provide the service itself.

Instead:

```text
People with the same demand
        ↓
Demand gets aggregated
        ↓
Vendor receives multiple customers
        ↓
Vendor saves travel/operational cost
        ↓
Users receive group pricing
```

Examples:

- Salon-at-home group booking
- Sofa/carpet cleaning in the same building
- Appliance AMC for multiple flats
- Other everyday services

The platform should support:

- Group deal creation
- Demand collection
- Participant joining
- Minimum participant threshold
- Vendor discovery
- Vendor offers
- Pricing
- Time/date coordination
- Status tracking
- Notifications

### Completion checkpoint

A group can create or join a demand opportunity and vendors can respond to aggregated demand.

---

## Phase 15: Advanced Group Deals

Build the advanced workflow around aggregation.

Include approved:

- Group discovery
- Building/society grouping
- Thresholds
- Offers
- Vendor selection
- Booking coordination
- Status
- Cancellation
- Notifications
- Deal history

### Completion checkpoint

The group-buy workflow should be usable from discovery through completion.

---

## Phase 16: Admin Panel

Build the administration platform separately from the normal user experience.

Admin functionality may include:

- User management
- Business management
- Community moderation
- Content moderation
- Reports
- Group deals
- Categories
- Cities
- Platform configuration
- Analytics
- Audit information

### Completion checkpoint

Admins can manage the platform without exposing admin functionality to ordinary users.

---

## Phase 17: Security, Reliability and Production Hardening

Before final launch:

- Authentication security
- Authorization
- Database security
- Storage rules
- Input validation
- Rate limiting where required
- Error handling
- Performance
- Loading states
- Offline/network failure behavior where applicable
- Data validation
- Privacy controls

### Completion checkpoint

The application is ready for serious testing rather than just visual demonstration.

---

## Phase 18: Final UI/UX Polish and Production Release

This phase is the final integration stage.

Use the approved UI/UX system and the UI/UX Pro Max methodology where appropriate.

Review the entire product:

```text
App
Business Web
Admin Panel
```

Check:

- Visual consistency
- Accessibility
- Responsive layouts
- Animations
- Micro-interactions
- Empty states
- Error states
- Loading states
- Navigation
- Performance
- SEO for public business web pages
- Production configuration
- Deployment

### Completion checkpoint

Citylink should feel like one complete product rather than a collection of separately built features.

---

# 6. Each Phase Should Be Broken Into Smaller Tasks

A phase should never become another giant prompt.

For example:

```text
Phase 6
  ↓
Task 6.1 Feed layout
  ↓
Task 6.2 Post card
  ↓
Task 6.3 Post creation
  ↓
Task 6.4 Media
  ↓
Task 6.5 Interactions
  ↓
Task 6.6 City filtering
  ↓
Task 6.7 Loading/error states
  ↓
Task 6.8 Testing
```

The agent can implement these one by one.

---

# 7. Prompt Template for Every Development Task

Use this template when talking to the coding agent:

```text
CITYLINK DEVELOPMENT TASK

Read first:
- README.md
- PRD.md
- Architecture.md
- Rules.md
- Phases.md
- Design.md
- Features.md
- Screens.md
- User-Flows.md
- Database.md
- Security.md
- Memory.md

Current phase:
[PHASE NUMBER + NAME]

Current task:
[TASK]

Goal:
[WHAT THIS TASK MUST ACHIEVE]

Requirements:
- ...
- ...
- ...

Do not:
- Do not rebuild completed features.
- Do not modify unrelated modules.
- Do not introduce a different architecture.
- Do not invent requirements.
- Do not skip testing.

Before coding:
1. Inspect the existing implementation.
2. Identify files/components that should be reused.
3. Give a short implementation plan.

After coding:
1. Run the relevant tests/checks.
2. Fix errors caused by this task.
3. Verify that existing functionality still works.
4. Report files changed.
5. Report tests performed.
6. Report remaining issues.

Do not start the next task.
```

---

# 8. UI-First Tasks

For visual screens, build the screen before connecting complex backend logic when practical.

Example:

```text
Homepage
  ↓
Static/realistic UI
  ↓
Navigation
  ↓
Real data
  ↓
Interactions
  ↓
Loading states
  ↓
Error states
```

This lets the UI be reviewed early.

However, the agent must respect the existing architecture and avoid creating temporary architecture that will later need a complete rewrite.

---

# 9. Backend-First Tasks

For features that depend heavily on data integrity, build the data model and service layer first.

Example:

```text
Database schema
  ↓
Security rules
  ↓
Service/API layer
  ↓
State management
  ↓
UI
  ↓
Testing
```

Group Deals, communities, business management and admin functionality may require this approach for parts of their implementation.

---

# 10. Do Not Mix Independent Features

Avoid prompts such as:

```text
Build communities + business dashboard +
notifications + admin panel + group deals.
```

Instead:

```text
Finish community foundation first.

Then community features.

Then business platform.

Then group deals.

Then admin.
```

This keeps debugging manageable.

---

# 11. Never Let the Agent Forget Existing Work

At the beginning of every session:

```text
Read Memory.md first.

Then inspect the current project state.

Continue from the existing implementation.

Do not assume the project is empty.
```

The agent should understand what has already been completed before writing code.

---

# 12. Definition of Done

A task is DONE only when:

- [ ] Requirements implemented
- [ ] Existing functionality preserved
- [ ] UI reviewed
- [ ] Responsive behavior checked
- [ ] Loading state handled
- [ ] Empty state handled
- [ ] Error state handled
- [ ] Relevant tests completed
- [ ] Console/build errors resolved
- [ ] Security implications checked
- [ ] Documentation updated
- [ ] Memory.md updated

---

# 13. Phase Locking

After a phase is accepted:

```text
PHASE LOCKED
```

The agent should not casually rewrite the phase later.

If a later phase requires a change to an earlier phase:

1. Identify the dependency.
2. Explain why the earlier implementation must change.
3. Make the smallest safe change.
4. Retest the affected earlier phase.
5. Update the documentation.

---

# 14. Memory.md Update Procedure

At the end of every development session:

```text
Date:
Current Phase:
Current Task:
Completed:
Files Changed:
Important Decisions:
Known Issues:
Next Task:
Next Phase:
```

Memory.md should describe the **actual current state**, not the planned state.

---

# 15. Final Product Integration

After all phases are individually complete, perform a full integration pass.

Test complete journeys such as:

```text
New user
  ↓
Sign up
  ↓
Create username/password
  ↓
Select/current city
  ↓
Browse city
  ↓
Switch city
  ↓
Post to another city
  ↓
Discover business
  ↓
Join community
  ↓
Join group deal
  ↓
Receive notification
  ↓
Complete interaction
```

Also test:

```text
Business
  ↓
Sign up
  ↓
Business dashboard
  ↓
Create/manage business profile
  ↓
Receive demand/leads
```

And:

```text
Admin
  ↓
Login
  ↓
Manage users
  ↓
Manage businesses
  ↓
Moderate communities/content
  ↓
Manage platform data
```

---

# 16. The Golden Rule

**Build Citylink like a product, not like a single coding prompt.**

The AI agent is the implementation worker.

The Markdown documentation is the source of truth.

The human approval checkpoint controls progression.

The process is:

```text
DOCUMENT
   ↓
PLAN
   ↓
DESIGN
   ↓
IMPLEMENT
   ↓
TEST
   ↓
REVIEW
   ↓
APPROVE
   ↓
MEMORY UPDATE
   ↓
NEXT TASK
```

Never skip the loop just because the AI says the feature is complete.
