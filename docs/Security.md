# Citylink Security, Privacy, Trust & Safety

## 1. Philosophy

Security is part of the product architecture.

## 2. Authentication

Use: - Secure signup - Login - Verification - Password recovery -
Session management - Device/session management - Optional 2FA

## 3. Authorization

Every sensitive operation must check: - Who is making the request? -
What role do they have? - What entity do they own/manage? - Are they
allowed to perform this action?

## 4. Passwords

Never: - Store plaintext passwords. - Log passwords. - Put passwords
into analytics.

Use a trusted authentication system or secure password hashing.

## 5. Sessions

Support: - Expiration - Revocation - Device/session visibility -
Suspicious login detection

## 6. Location Privacy

Do not publicly expose exact home coordinates.

Use: - City - Neighborhood - Approximate distance

Exact service addresses should be shared only with authorized parties
when required.

## 7. Private Communities

Private content must not be: - Publicly searchable - Publicly indexed -
Returned to unauthorized APIs - Visible to non-members

## 8. Student Verification

Possible verification: - Institutional email - Student ID - Approved
administrator verification

Only claim the level actually verified.

## 9. Business Verification

A verification badge must not imply more than Citylink actually
verified.

## 10. Reporting

Report: - Users - Posts - Comments - Businesses - Listings - Services -
Communities - Events - Messages - Group Deals

## 11. Moderation

``` text
Report
→ Automated classification
→ Risk priority
→ Moderator
→ Action
```

Actions: - No action - Warning - Content removal - Restriction -
Temporary suspension - Permanent ban

## 12. AI Moderation

AI can assist with: - Spam - Scam patterns - Abuse - Duplicate content -
Suspicious behavior

High-impact irreversible decisions should have appropriate safeguards.

## 13. Marketplace Safety

Protect against: - Fake listings - Scam sellers - Misleading
descriptions - Suspicious payment requests - Harassment

## 14. Group Deal Safety

Show: - Vendor identity - Participant count - Price state - Deadline -
Booking status - Cancellation rules

Protect addresses.

## 15. Pricing Integrity

Use clear labels: - User target - Potential group price - Confirmed
price

Never fabricate discounts or scarcity.

## 16. Vendor Protection

Protect against: - Fake demand - Spam - No-shows - Abuse - Non-payment

## 17. Customer Protection

Protect against: - Fake vendors - Bait-and-switch - Hidden charges -
No-shows - Misrepresentation

## 18. Disputes

Store the necessary transaction evidence and resolution status.

## 19. Blocking

Blocking should affect discovery, messaging and interaction according to
documented policy.

## 20. Anti-Spam

Rate-limit: - OTP - Login - Posting - Messaging - Following - Community
creation - Group Deal creation - Business creation

## 21. Fraud Detection

Potential signals: - Account age - Verification - Reports - Transaction
behavior - Cancellations - Review behavior - Abnormal activity

Do not expose internal risk scores.

## 22. Admin Security

Use: - Strong authentication - 2FA - Role-based permissions - Audit
logs - Session controls - Restricted access

## 23. Audit Logs

Record sensitive administrative actions with actor, action, target and
timestamp.

## 24. File Security

Validate: - Type - Size - Content where required - Access permissions

## 25. Encryption

Use secure encrypted connections and appropriate protection for
sensitive stored data.

## 26. Data Minimization

Collect only what is needed for: - Functionality - Security - Support -
Legal obligations - Appropriate analytics

## 27. Account Deletion

Provide a clear deletion process.

Data may be deleted, anonymized or retained where legitimately required.

## 28. Safety Center

Include: - Report - Privacy - Security - Marketplace safety - Group Deal
safety - Community safety - Blocking - Help
