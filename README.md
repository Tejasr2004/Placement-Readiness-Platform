# KodNest Placement Readiness Platform




Visit The Working Website Here




---   placement-readiness-platform-oocusd1dl-tejas-projects-f3908b77.vercel.app   ---








A standalone, offline-first web tool that analyzes job descriptions and generates personalized placement preparation plans — built as a single HTML + JS application with zero external dependencies at runtime.

## ✨ Features

### JD Analysis Engine
- **Skill Extraction** — Detects skills across 7 categories: Core CS, Languages, Web, Data, Cloud/DevOps, Testing, and General
- **Readiness Score** — Calculates a deterministic base score (0–100) based on company, role, JD length, and detected skills
- **7-Day Study Plan** — Generates a day-by-day preparation plan tailored to detected skills
- **Round-wise Checklist** — Produces a 4-round preparation checklist (Aptitude → DSA → Technical → HR)
- **Interview Questions** — Curates 10 likely interview questions from a categorized question bank

### Company Intelligence
- **Company Size Detection** — Identifies Enterprise / Mid-size / Startup from 60+ known companies
- **Industry Classification** — Infers industry (FinTech, Healthcare, E-commerce, Big Tech, etc.)
- **Dynamic Round Mapping** — Generates interview round timelines that adapt based on company size and detected skills

### Interactive Results
- **Skill Confidence Toggles** — Mark each skill as "I know this" or "Need practice"
- **Live Score Updates** — Readiness score adjusts in real-time based on skill confidence
- **Export Options** — Copy plan, checklist, or questions to clipboard; download combined TXT file

### Data Persistence
- All analyses saved to `localStorage` with full history browsing
- Skill toggle selections persist across sessions
- Auto-migration of old data formats to current schema

### Quality Assurance
- **Test Checklist** — 10-item manual verification checklist with step-by-step hints
- **Proof & Submission** — 8-step build overview, URL-validated artifact links, formatted export
- **Ship Lock** — Project can only be marked "Shipped" when all tests pass and all proof links are provided

## 🚀 Getting Started

1. Open `index.html` in any modern browser — that's it!

No build tools, no package manager, no server required.

## 📁 Project Structure

```
PLACEMENT READINESS PLATFORM/
├── index.html    # Full standalone app (React + Tailwind via CDN)
├── engine.js     # Analysis engine (skill extraction, scoring, export)
└── README.md     # This file
```

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 18 (CDN) |
| Styling | Tailwind CSS v4 (CDN) |
| Icons | Inline SVGs (no external deps) |
| Routing | Hash-based (`window.location.hash`) |
| Persistence | `localStorage` |
| Transpilation | Babel Standalone (CDN, JSX in-browser) |

## 📊 Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing | Hero page with platform introduction |
| `/dashboard` | Dashboard | Score overview, quick stats, latest analysis |
| `/dashboard/practice` | Analyzer | JD input form with validation |
| `/dashboard/assessments` | Results | Full analysis with skill toggles and exports |
| `/dashboard/resources` | History | All saved analyses with delete support |
| `/dashboard/profile` | Profile | User profile (placeholder) |
| `/prp/07-test` | Test Checklist | 10-item manual QA checklist |
| `/prp/proof` | Proof & Submission | Build overview + artifact links + export |
| `/prp/08-ship` | Ship | Locked until all conditions met |

## 🔑 localStorage Keys

| Key | Purpose |
|-----|---------|
| `kodnest_analysis_history` | Saved JD analyses (max 50) |
| `kodnest_test_checklist` | Test checklist check states |
| `prp_final_submission` | Proof links (Lovable, GitHub, Deploy URL) |

## 📝 License

Built as part of the KodNest Placement Readiness Program.


