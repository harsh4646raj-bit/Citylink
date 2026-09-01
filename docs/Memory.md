# Citylink Memory

**This is a living file. Update it after every meaningful session.**

## Current Project State

-   Product: Citylink
-   Current completed phase: Phase 5: Profiles and Social Foundations (COMPLETED & VERIFIED)
-   Core concept: city-based social opportunity platform
-   Primary differentiator: Group Deals / collective demand aggregation
-   Platforms: consumer app, business web/dashboard, admin panel

## Locked Decisions

### City switching

Users can switch cities immediately.

City switching: - Does not log out the user. - Does not replace account
identity. - Changes the browsing context.

Users can freely post to supported cities.

### Group Deals

Group Deals are a primary feature.

Citylink aggregates demand and connects aggregated demand with vendors.

### Communities

Users can create public/private communities.

Examples: - Muzaffarpur Community: public. - MIT College: private,
verified students only.

### Business

Business functionality is connected to the Citylink user/account
ecosystem and has a dedicated business dashboard/web experience.

### Three platforms

1.  Consumer app
2.  Business profile web/dashboard
3.  Admin panel

## Historical Decisions

-   The main app planning originally progressed through Phase 6 before
    the Admin Panel was treated separately.
-   Phase 8 Point 23 was explicitly requested to remain preserved.
-   The total app screen-count question was intentionally postponed
    until all feature phases were discussed.
-   Phase 18 is the UI/UX design-system phase.

## Current Work

-   Complete Citylink documentation.
-   Finalize design system.
-   Finalize screen inventory.
-   Finalize user flows.
-   Review existing implementation.
-   Prepare implementation roadmap.

## Daily Log

### 2026-08-30 (UI/UX Redesign & Modern Visual Experience)
- **Completed:**
  - Complete UI/UX redesign and visual refinement across all 11 component and page tiers.
  - Upgraded global design tokens (`globals.css`), CSS keyframe animations, smooth scrollbars, and `tailwind.config.ts`.
  - Implemented adaptive `AppShell` with contextual shell routing (dedicated standalone layout for `/login`, `/signup`, `/forgot-password`, `/onboarding`, and 3-column local-social shell for consumer feeds).
  - Modernized `Header`, `SidebarNav`, `RightSidebar`, and `BottomNav` with signature City Switcher pill, active tab indicators, and elevated Create FAB.
  - Upgraded UI primitives: `Card`, `Button`, `Badge`, `EmptyState`, `Dialog`, `Avatar`, `Input`, `Tabs`.
  - Upgraded Domain Cards: `GroupDealCard` (signature amber accent styling, dynamic progress bar, pricing matrix), `FeedPostCard` (modern social layout, micro-interactions), `CommunityCard` (replaced emojis with SVG icons, verified badges), `BusinessCard`, `MarketplaceCard`.
  - Upgraded all dialogs/modals (`CitySwitcherDialog`, `CreateActionModal`, `AuthModal`, `EditProfileModal`, `FollowListModal`) and all consumer/auth pages.
  - Verified 100% test pass rate (53/53 tests in 15 test suites), 0 TypeScript errors, successful Next.js production build (`next build` generating 20 static/SSG pages), and verified live localhost rendering.
- **Decisions:**
  - Presentation-layer redesign strictly preserving all Phase 1–5 backend structures, database schema, RLS policies, services, and route semantics.
  - No new external dependencies introduced.
- **Next Phase:**
  - Ready for Phase 6: Feed and Posts (when feature development resumes).

### 2026-08-30 (Phase 5: Profiles and Social Foundations)
- **Current Phase:** Phase 5: Profiles and Social Foundations (COMPLETED & VERIFIED)
- **Completed:**
  - Implemented the complete user profile and social foundation system adhering to `Database.md` Section 8, `Security.md`, and `Screens.md`.
  - Created migration `supabase/migrations/20260830000000_user_follows.sql` creating `user_follows` table with foreign keys, indexes, and RLS policies (preventing self-follows and restricting unfollows to the follower).
  - Enhanced `ProfileService` with `getProfileByUsername` and updated profile modification logic.
  - Implemented `FollowService` in `src/services/follow-service.ts` supporting follow/unfollow, live count updates, self-follow prevention, and follower/following user list lookups.
  - Created `EditProfileModal` in `src/components/domain/edit-profile-modal.tsx` allowing authenticated residents to update their display name, unique username, bio (max 160 chars), permanent home city (`home_city_id`), and privacy settings (`public` vs `private`).
  - Created `FollowListModal` in `src/components/domain/follow-list-modal.tsx` for inspecting followers and following networks.
  - Created `PublicProfileView` in `src/components/domain/public-profile-view.tsx` and public dynamic user route `/u/[username]` (`src/app/u/[username]/page.tsx`) with SSG generation, live Follow/Unfollow toggles, and strict Privacy Shield masking for private accounts.
  - Upgraded `/profile` (`src/app/profile/page.tsx`) to connect live follow stats, edit profile modal, follow list dialogs, and activity portfolio tabs.
  - Preserved Phase 3 city architecture: permanent `home_city_id` updates cleanly without affecting active browsing city context.
  - Expanded automated test suite to 53 passing tests across 15 test suites.
  - Verified 0 TypeScript errors (`tsc --noEmit`) and successful Next.js production build (`next build`) generating 20 static, dynamic, and SSG pages.
- **Decisions:**
  - Followed `Procedure.md`, `11-DEVELOPMENT-ROADMAP.md`, `Architecture.md`, `Database.md`, `Security.md`, `Features.md`, and `Screens.md` as sources of truth.
  - Preserved privacy: private profiles mask sensitive activity feeds from non-followers behind an explicit Privacy Shield notice.
- **Files changed:**
  - `supabase/migrations/20260830000000_user_follows.sql` (new)
  - `src/types/database.ts` (updated with user_follows table)
  - `src/services/profile-service.ts` (updated)
  - `src/services/follow-service.ts` (new)
  - `src/components/domain/edit-profile-modal.tsx` (new)
  - `src/components/domain/follow-list-modal.tsx` (new)
  - `src/components/domain/public-profile-view.tsx` (new)
  - `src/app/u/[username]/page.tsx` (new)
  - `src/app/profile/page.tsx` (updated)
  - `src/services/__tests__/follow-service.test.ts` (new)
  - `src/services/__tests__/profile-service.test.ts` (updated)
  - `src/app/__tests__/public-profile.test.tsx` (new)
  - `docs/Memory.md` (updated)
- **Known issues / Limitations:**
  - None. Full profile and social foundation system verified with 100% passing tests and clean production build.
- **Next Phase:**
  - Phase 6: Feed and Posts (Local social feed, post creation, post cards, media attachments, city context, like/comment interactions).

### 2026-08-29 (Phase 4: Authentication and Onboarding)
- **Completed:** Supabase Auth (`AuthService`, `AuthContext`), multi-step onboarding wizard (`/onboarding`), `/login`, `/signup`, `/forgot-password`, `/auth/callback`, edge middleware, 45 passing tests.

### 2026-08-29 (Phase 3: City System)
- **Completed:** City context (`CityContext`, `useCity`), `CityService`, public city route `/city/[slug]`, `LocationContextBar`, city-scoped content filtering, cross-city publishing, 31 passing tests.

### 2026-08-29 (Phase 2: Core Visual Experience)
- **Completed:** Domain components, 3-column shell, 5 consumer routes (`/`, `/discover`, `/create`, `/messages`, `/profile`), 20 passing tests.

### 2026-08-29 (Phase 1: Project Foundation)
- **Completed:** Next.js 14 App Router, TypeScript, Tailwind Design System tokens, Supabase SSR clients, PostgreSQL schema migration with 22 entities & RLS, unit testing suite.
