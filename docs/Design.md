# Citylink Master UI/UX Design System

## 1. Design Goal

Citylink should feel: - Local - Social - Modern - Trustworthy - Useful -
Energetic - Human - Premium without feeling intimidating

Avoid: - Generic SaaS - Instagram clone - Generic marketplace - Generic
AI startup - Overloaded visual effects

## 2. Design Direction

> **Modern Local Social**

Blend: - Contemporary minimalism - Card/bento information architecture
where useful - Human community presentation - Commerce clarity - Subtle
meaningful motion - Professional business/admin density

## 3. Platform Modes

### Consumer App

Social, immersive, lightweight.

### Public Web

Editorial/discovery focused and SEO-friendly.

### Business/Admin

Professional, dense and productivity-focused.

## 4. Color Direction

Initial direction: - Primary: deep city blue/indigo - Secondary: fresh
teal - Accent: warm amber - Neutral: light surfaces and deep readable
text

Exact hex tokens should be finalized after accessibility and
design-system evaluation.

Rules: - No random colors. - No excessive gradients. - Do not rely on
color alone for status.

## 5. Typography

Must work well for: - English - Hindi - Future Indian-language
expansion - Mobile - Numbers - Dense dashboard data

Font selection must be tested with multilingual text.

## 6. Spacing

Use a centralized spacing scale rather than arbitrary values.

## 7. Radius

Use a consistent hierarchy for: - Inputs - Cards - Sheets - Badges

Do not make every control a pill.

## 8. Shadows

Use restrained elevation.

Prefer surface contrast and borders before heavy shadows.

## 9. Icons

Use a consistent SVG icon system.

Do not use emojis as primary UI icons.

## 10. Mobile Navigation

Recommended consumer navigation:

``` text
Home | Discover | Create | Messages | Profile
```

Notifications are available as a top-level attention layer.

## 11. City Switcher

Signature Citylink component:

``` text
Muzaffarpur ▾
```

Menu: - Search city - Recent cities - Saved/favorite cities where
implemented - Popular cities

Switching must be immediate and preserve the session.

## 12. Group Deal Card

Must show: - Service - Location - Current participants - Target
participants - Progress - Potential/confirmed price - Deadline - Main
action

## 13. Community UI

Community header: - Cover - Avatar - Name - Privacy/verification -
Member count - Feed - Events - Deals - Members

## 14. Business Card

Prioritize: 1. Business identity 2. Category 3. Location 4. Trust 5.
Rating 6. Main actions

## 15. Marketplace Card

Hierarchy: - Image - Product - Price - Location - Seller

Marketplace cards should not be generic business cards.

## 16. Motion

Use motion for: - State changes - Navigation - Confirmation - Progress -
Loading - Feedback

Avoid animation without purpose.

Support reduced motion.

## 17. States

Every major feature needs: - Loading - Empty - Success - Error - Retry
where appropriate

## 18. Accessibility

Target: - Strong contrast - Comfortable touch targets - Keyboard support
on web - Visible focus - Screen-reader labels - Reduced motion - Dynamic
text - Multilingual expansion

## 19. Responsive Design

Support: - Mobile - Tablet - Laptop - Desktop

Do not merely shrink desktop UI.

## 20. Design Tokens

Centralize: - Colors - Typography - Spacing - Radius - Shadows -
Motion - Breakpoints - Z-index - Icons

## 21. Citylink Special Components

-   CitySwitcher
-   GroupDealProgress
-   CommunityHeader
-   CommunityPrivacyBadge
-   VerificationBadge
-   VendorOfferCard
-   DemandOpportunityCard
-   TrustSignals
-   LocalDistanceIndicator
-   LocationContextBar
-   GroupDealCountdown
-   CommunityMemberPreview

## 22. Anti-Patterns

Avoid: - Excessive glassmorphism - Neon gradients - Purple/pink AI
gradients - Giant floating cards everywhere - Excessive shadows - Too
many pill buttons - Emoji interface icons - Tiny text - Excessive
animation - Inconsistent cards - Overloaded navigation

## 23. AI Design Rule

AI-generated UI must follow this document.

It must not invent new: - Colors - Fonts - Navigation - Card styles -
Icon systems

without updating the design system first.
