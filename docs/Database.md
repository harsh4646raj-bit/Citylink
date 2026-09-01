# Citylink Database Specification

## 1. Principles

-   Relational source of truth.
-   Clear ownership.
-   Foreign keys.
-   Appropriate indexes.
-   Migration-based schema changes.
-   Server-side authorization.
-   Minimal sensitive data.
-   Private data must not leak through APIs/search.

## 2. Users

``` text
users
- id
- email
- phone
- username
- authentication reference
- status
- created_at
- updated_at
```

## 3. Profiles

``` text
profiles
- id
- user_id
- name
- username
- avatar
- bio
- privacy
- created_at
- updated_at
```

## 4. Cities

``` text
cities
- id
- name
- slug
- state
- country
- latitude
- longitude
- boundary
- status
- created_at
```

## 5. Communities

``` text
communities
- id
- name
- slug
- description
- type
- privacy
- city_id
- creator_id
- cover_image
- avatar
- rules
- verification_required
- status
- member_count
- created_at
```

## 6. Community Members

``` text
community_members
- community_id
- user_id
- role
- status
- verified
- joined_at
```

## 7. Posts

``` text
posts
- id
- author_id
- city_id
- community_id nullable
- content
- post_type
- visibility
- location
- status
- created_at
- updated_at
```

## 8. Social

``` text
post_reactions
- post_id
- user_id
- reaction_type

post_comments
- id
- post_id
- user_id
- parent_comment_id
- content
- created_at

user_follows
- follower_id
- following_id
- created_at
```

## 9. Businesses

``` text
businesses
- id
- owner_id
- name
- slug
- description
- category_id
- city_id
- address
- latitude
- longitude
- phone
- website
- logo
- cover_image
- verification_status
- status
- created_at
```

## 10. Business Members

``` text
business_members
- business_id
- user_id
- role
- permissions
- created_at
```

## 11. Listings

``` text
listings
- id
- seller_id
- business_id nullable
- category_id
- city_id
- title
- description
- price
- condition
- location
- status
- created_at
```

## 12. Services

``` text
services
- id
- provider_user_id
- business_id nullable
- category_id
- city_id
- title
- description
- pricing_type
- starting_price
- service_radius
- availability
- status
- created_at
```

## 13. Jobs

``` text
jobs
- id
- creator_id
- business_id nullable
- city_id
- title
- description
- employment_type
- salary_min
- salary_max
- location
- status
- created_at

job_applications
- id
- job_id
- applicant_id
- resume
- status
- created_at
```

## 14. Events

``` text
events
- id
- organizer_id
- business_id nullable
- community_id nullable
- city_id
- title
- description
- venue
- latitude
- longitude
- start_time
- end_time
- status
- created_at
```

## 15. Group Deals

``` text
group_deals
- id
- creator_id
- city_id
- community_id nullable
- service_id nullable
- title
- description
- target_participants
- current_participants
- target_price
- deadline
- preferred_date
- status
- created_at

group_deal_participants
- group_deal_id
- user_id
- quantity
- address
- preferred_slot
- status
- joined_at

group_deal_offers
- id
- group_deal_id
- business_id
- vendor_user_id
- price_per_unit
- total_price
- availability
- message
- status
- created_at

group_deal_bookings
- id
- group_deal_id
- offer_id
- user_id
- final_price
- scheduled_time
- status
- created_at
```

## 16. Messaging

``` text
conversations
- id
- type
- context_type
- context_id
- created_at

conversation_members
- conversation_id
- user_id
- role
- joined_at

messages
- id
- conversation_id
- sender_id
- message_type
- content
- media_url
- metadata
- created_at
- edited_at
```

## 17. Notifications

``` text
notifications
- id
- user_id
- type
- title
- body
- reference_type
- reference_id
- read_at
- created_at
```

## 18. Reviews

``` text
reviews
- id
- author_id
- target_type
- target_id
- rating
- content
- status
- created_at
```

## 19. Reports

``` text
reports
- id
- reporter_id
- target_type
- target_id
- reason
- description
- status
- moderator_id
- created_at
```

## 20. Verification

``` text
verifications
- id
- user_id
- target_type
- target_id
- verification_type
- evidence_reference
- status
- reviewed_by
- created_at
```

## 21. Analytics

``` text
analytics_events
- id
- user_id nullable
- event_name
- entity_type
- entity_id
- city_id
- metadata
- created_at
```

## 22. Payments

``` text
payments
- id
- user_id
- business_id nullable
- order_type
- order_id
- amount
- currency
- provider
- provider_reference
- status
- created_at
```

Never store raw card credentials.

## 23. Categories

``` text
categories
- id
- parent_id
- name
- slug
- icon
- type
- status
```

## 24. Indexing

Likely high-value indexes: - city_id - user_id - community_id -
business_id - category_id - status - created_at - geographic fields

Use actual query profiling before excessive indexing.

## 25. Migrations

Every schema change must be represented by a migration and tested before
production.
