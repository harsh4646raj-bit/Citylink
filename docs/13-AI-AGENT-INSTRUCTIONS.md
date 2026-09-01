# Citylink AI Agent Instructions

## 1. Read Before Coding

For every substantial task, read: - PRD.md - Architecture.md -
Rules.md - Memory.md - Relevant feature document

For UI: - Design.md - Screens.md - User-Flows.md

## 2. Inspect Existing Code

Before changing anything: 1. Inspect the current implementation. 2. Find
reusable components. 3. Find existing APIs. 4. Inspect
database/migrations. 5. Understand current behavior. 6. Compare against
documentation. 7. Make the smallest correct change.

## 3. Do Not Rebuild Blindly

Do not delete working systems merely because another approach looks
cleaner.

Check dependencies and regression risk first.

## 4. Preserve Product Decisions

Never silently remove or change: - Immediate city switching - Cross-city
posting - Group Deals as a primary feature - Public/private
communities - Business platform - Admin platform - Shared backend -
Username/password registration decision - Trust/privacy rules

## 5. UI

Follow `Design.md`.

Reuse: - Tokens - Components - Icons - Navigation - States

Do not invent a new design language.

## 6. Backend

Always: - Validate - Authenticate - Authorize - Rate-limit where
needed - Handle errors - Protect private data - Use migrations

## 7. Database

Do not assume schema.

Inspect migrations/schema before writing queries.

Never bypass authorization for convenience.

## 8. Security

Never: - Commit secrets - Expose private data - Trust client ownership -
Trust client permissions - Disable security to pass tests

## 9. Testing

After implementation: - Run relevant tests. - Test main flow. - Test
failure. - Test unauthorized access. - Test responsive behavior. - Check
regressions.

## 10. Documentation

Update: - PRD/Features for product changes. - Architecture for
architectural changes. - Design/Screens for UI changes. - Database for
schema changes. - Security for security changes. - Memory for current
implementation state.

## 11. Memory

After meaningful work:

``` text
Date:
Completed:
Current:
Decisions:
Issues:
Next:
```

Do not delete useful historical memory.

## 12. Stop and Ask

Do not guess when: - Destructive migration is needed. - Major
architecture is unclear. - Product requirements conflict. - Security
policy is unclear. - Payment behavior is undefined. - Private-data
behavior is ambiguous.
