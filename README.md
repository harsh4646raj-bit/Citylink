# Citylink - City-Based Social Opportunity Platform

Citylink connects residents, communities, businesses, services, jobs, events, and collective local demand (**Group Deals**) within a unified, city-first ecosystem.

---

## 📁 Repository Structure

```text
CITYLINK/
├── docs/                        # Complete Product & Engineering Specification Suite (21 files)
│   ├── README.md                # Documentation index & foundation map
│   ├── PRD.md                   # Master Product Requirements Document
│   ├── Architecture.md          # Master Technical Architecture (3 platforms / 1 backend)
│   ├── Rules.md                 # Non-negotiable product, security, and UI rules
│   ├── Procedure.md             # Sequential Phase-by-Phase engineering protocol
│   ├── Design.md                # Master UI/UX Design System specifications
│   ├── Database.md              # Relational schema specification & data dictionary
│   ├── Security.md              # Security, Trust & Safety, and Privacy rules
│   ├── Memory.md                # Living daily progress, decision, and handover log
│   └── ...                      # Domain specs: Communities, Group-Deals, Business, Admin
│
├── src/                         # Next.js 14 App Router Source Code
│   ├── app/                     # App router pages, layouts, and route handlers
│   │   ├── globals.css          # Master Design System CSS variables & tokens
│   │   ├── layout.tsx           # Root application shell (Header, ErrorBoundary, BottomNav)
│   │   └── page.tsx             # Foundation verification & showcase interface
│   ├── components/              # Modular UI Components
│   │   ├── ui/                  # Accessible Design System primitives (Button, Input, Card, Modal, etc.)
│   │   ├── layout/              # App Shell components (Header, BottomNav)
│   │   └── common/              # Shared domain components
│   ├── constants/               # App constants (Default cities, Route definitions)
│   ├── context/                 # Client React context providers (CityContext, AuthContext)
│   ├── hooks/                   # Custom reusable React hooks
│   ├── lib/                     # Utilities & Third-Party Client Initializers
│   │   ├── supabase/            # Browser, Server, and Admin Supabase SSR clients
│   │   └── utils.ts             # Tailwind class merging & formatting helpers
│   ├── services/                # Backend & API service abstraction layer
│   ├── test/                    # Test configuration and setup files
│   └── types/                   # TypeScript interfaces & Supabase Database types
│
├── supabase/                    # Supabase Configuration & Migrations
│   ├── migrations/              # Versioned PostgreSQL schema migrations
│   │   ├── 20260829000000_initial_schema.sql
│   │   └── 20260829000001_phase1_rls_corrections.sql
│   └── seeds/                   # Fixture data & seed scripts
│
├── .env.example                 # Environment variables template
├── tailwind.config.ts           # Tailwind CSS configuration with Citylink color tokens
├── tsconfig.json                # Strict TypeScript configuration
└── vitest.config.ts             # Automated test configuration (JSDOM + React Testing Library)
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js `v20+` or `v24+`
- npm `v10+` or `v11+`

### 2. Installation
```bash
npm install
```

### 3. Environment Setup
Duplicate `.env.example` as `.env.local` and add your Supabase credentials:
```bash
cp .env.example .env.local
```

### 4. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Running Tests & Quality Checks
```bash
# Run unit & component tests
npm run test

# Run TypeScript type check
npm run typecheck

# Run production build
npm run build
```

---

## 🔒 Security & Architecture Core Principles
1. **Three Platforms / One Backend**: Consumer App, Business Web, and Admin Panel all share one Supabase backend and data ecosystem.
2. **Immediate City Switching**: Switching cities never logs out users or replaces account identity; it changes the browsing and posting context.
3. **Group Deals**: Primary feature aggregating local collective demand for home services, maintenance, and products.
4. **Row-Level Security (RLS)**: Strictly enabled on all tables by default.
5. **Private Content Isolation**: Content in private communities is never exposed to unapproved members or public search.
6. **Secrets Management**: `SUPABASE_SERVICE_ROLE_KEY` is strictly server-side and never exposed to the client.
