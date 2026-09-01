# Citylink Rules

## 1. Source of Truth

When a requirement is already documented, do not invent a different
behavior.

Read: 1. PRD.md 2. Features.md 3. User-Flows.md 4. Design.md 5.
Architecture.md 6. Memory.md

If still unclear, mark a decision instead of silently guessing.

## 2. Product Rules

-   Users can switch cities immediately.
-   City switching does not log users out.
-   City switching does not change permanent account identity.
-   Users can post to supported cities.
-   Group Deals are primary.
-   Communities are first-class.
-   Public and private community rules must differ.
-   Consumer, business and admin platforms share the backend.

## 3. UI Rules

-   Follow Design.md.
-   Reuse tokens and components.
-   Do not invent random colors.
-   Do not invent random fonts.
-   Do not use emoji as primary interface icons.
-   Maintain loading, empty and error states.
-   Support accessibility.
-   Do not over-animate.

## 4. Group Deal Rules

-   Never show potential price as confirmed price.
-   Show target and current participants separately.
-   Protect participant addresses.
-   Show vendor identity and trust signals.
-   Never fabricate discounts.
-   Never fabricate scarcity.
-   Track cancellation and dispute states.

## 5. Community Rules

-   Private content must stay private.
-   Membership rules must be enforced server-side.
-   Admin permissions must be explicit.
-   Citylink retains platform-level safety authority.
-   Verification claims must be truthful.

## 6. Business Rules

-   Business access is role-based.
-   Team permissions are enforced server-side.
-   Business verification must be meaningful.
-   Legitimate negative reviews must not be silently deleted.

## 7. Database Rules

-   Use migrations.
-   Use foreign keys.
-   Use appropriate indexes.
-   Protect sensitive fields.
-   Enforce authorization.
-   Never bypass security to make a feature work.

## 8. API Rules

-   Validate all input.
-   Authenticate protected routes.
-   Authorize every sensitive operation.
-   Rate-limit abuse-prone endpoints.
-   Return predictable errors.
-   Never trust client-provided permissions.

## 9. Security Rules

Never: - Commit API keys. - Hard-code passwords. - Log secrets. - Store
raw payment credentials. - Expose private storage without
authorization. - Trust client ownership. - Disable security checks to
pass tests.

## 10. AI Coding Rules

AI agents must: - Read relevant documentation before coding. - Inspect
existing code before replacing it. - Reuse existing components. - Avoid
duplicate systems. - Avoid unnecessary dependencies. - Explain
destructive changes. - Update Memory.md after meaningful work. - Update
documentation after architecture changes. - Never silently change
product requirements.

## 11. Testing Rules

A feature is not complete because its UI renders.

Check: - Main flow - Failure - Empty state - Permissions - Security -
Responsive behavior - Accessibility - Regression

## 12. Git Rules

Use meaningful commits:

``` text
feat: add city switcher
feat: add group deal participation
fix: prevent private community leakage
refactor: extract business card
docs: update group deal rules
```

Never commit secrets or private user data.

## 13. Definition of Done

-   Requirement implemented.
-   Design followed.
-   Backend authorization exists.
-   Error/loading/empty states exist.
-   Relevant tests pass.
-   Documentation updated.
-   Memory updated.
