# Plan: Bitcoin Suisse Website Clone (Showcase Version)

## 1) Objectives
- Build a pixel-perfect, animation-faithful clone of https://www.bitcoinsuisse.com for showcase purposes.
- Remove/disable any account creation/login functionality; all CTAs lead to contact or informational sections.
- Implement a fully functional Contact form integrated with Google Sheets to capture leads.
- Preserve navigation, layout, content, imagery, typography, and interactions as closely as possible.
- Use React (frontend), FastAPI (backend), MongoDB (optional for lead backup), and integrate Google Sheets API.

Notes:
- Core that must not break: Contact submissions reliably append rows to a specified Google Sheet (source of truth for leads).
- All backend routes must be prefixed with /api and respect environment variables (REACT_APP_BACKEND_URL, MONGO_URL).

## 2) Architecture Overview
- Frontend: React + shadcn/ui + CSS (no transparent backgrounds). Routes mirror original site structure (Home, Services pages, Contact, News list). Assets fetched from original CDN where appropriate.
- Backend: FastAPI on 0.0.0.0:8001, endpoints under /api (health, contact/submit). Optional MongoDB persistence for lead backup.
- Integration: Google Sheets via Service Account (recommended) to append rows to a configured spreadsheet & worksheet.
- Testing: testing_agent_v3 for E2E validation. Design polish via design_agent.

## 3) Phases

### Phase 1: Core POC – Google Sheets Lead Capture (REQUIRED)
Goal: Prove we can append a lead row to Google Sheets from FastAPI using service account credentials.

Steps:
1. Integration Playbook: Use integration_playbook_expert_v2 for “Google Sheets API (Append Rows) via Service Account” best-practice (FastAPI).
2. Credentials & Config (from user):
   - Service Account JSON key (securely supplied),
   - Spreadsheet ID,
   - Worksheet/Tab name (e.g., “Leads”).
3. Backend POC function: Minimal FastAPI route /api/poc/sheets-append to append a dummy lead row.
4. Python Test Script (single file): test_core.py with functions to:
   - test_google_sheets_append(): append sample row and verify a success response (and provide manual check steps in Sheet),
   - test_validation(): simulate invalid data and confirm rejection without append.
5. Dependencies: google-api-python-client, google-auth, google-auth-httplib2, google-auth-oauthlib.
6. Run POC: Install deps, set env vars (SPREADSHEET_ID, SHEET_NAME, GOOGLE_APPLICATION_CREDENTIALS path), run test_core.py.
7. Fix Until Works: Iterate until the row appears in the sheet reliably with clear error handling and timeouts.

Phase 1 User Stories:
- US-P1-1: As an operator, I can trigger a test append and see a new row in Google Sheets within 2 seconds.
- US-P1-2: As a tester, I receive a clear error message if credentials/permissions are invalid.
- US-P1-3: As a marketer, I see all captured fields (name, email, phone, category, subject, message, timestamp, source) in individual columns.
- US-P1-4: As a developer, I can rotate credentials by updating env without code changes.
- US-P1-5: As a security reviewer, no secrets are logged; failures are sanitized.

Acceptance Criteria (Phase 1):
- A row can be appended reliably to the configured Google Sheet.
- Validation prevents bad/empty emails and missing required fields.
- Clear observability: success/failure responses are unambiguous.

### Phase 2: App Development – Full Clone (Frontend + Backend)
Goal: Build a high-fidelity clone with the validated Sheets integration powering the Contact form.

Frontend (React):
- Global: Replicate fonts, color tokens, spacing, iconography; smooth animations (CSS/Framer Motion) matching the original feel.
- Navigation & Footer: Mirror structure and links (internal routes for clone, external links preserved). Disable any login/account routes.
- Homepage Sections:
  1) Hero (“Welcome to Better”) with layered visuals & CTA buttons.
  2) “You Deserve Better” (Proximity, Expertise, Performance) cards.
  3) “I am…” client-type sectional cards with Learn More links.
  4) Testimonials carousel with auto-play and manual controls.
  5) Our Services (Trading, Staking, Custody, Lending, Invest in Loans, Become a Client).
  6) The Numbers Speak for Themselves (metrics grid).
  7) “What We Mean by Better” (6 bullets with visuals).
  8) News/Blog teasers (static curated list mirrored from crawl or JSON data source).
  9) Newsletter signup UI (visual only for v1; non-functional unless requested later).
  10) “Re-Experience Crypto with Us” CTA section.
  11) Contact form page/section with fields matching original (Type of Contact, Company, First, Last, Email, Phone (intl select), Category, Subject, Description, Attachment UI (visual), submit).
- State & Validation:
  - Client-side validation mirroring required fields; loading states; success/error toasts; accessibility (aria labels); data-testid attributes for testing.
- Cookie Banner:
  - Replicate UI (Essential/Analytics/Marketing toggles). Functional state stored locally; no third-party trackers.

Backend (FastAPI):
- Endpoints (all prefixed with /api):
  - GET /api/health
  - POST /api/contact/submit → validate payload, anti-spam honeypot field, append row to Google Sheet; optional Mongo backup.
- Serialization helpers (datetime/UUID) to avoid JSON issues.
- Config via env: SHEETS credentials path/JSON (mounted), SPREADSHEET_ID, SHEET_NAME.

Data Model (Leads – optional Mongo backup):
- name_first, name_last, email, phone_e164, company, type, category, subject, message, source_page, user_agent, timestamp.

Design & Assets:
- Use design_agent to derive precise tokens (colors, spacing, typography). Use shadcn/ui for consistent components.
- Asset strategy: Load images from original CDN where available; fallback locally as needed.

Testing (Phase 2):
- Use testing_agent_v3 for E2E tests covering navigation, carousels, CTAs, cookie banner interactions, and contact submission (valid/invalid).
- Skip tests requiring drag-and-drop uploads or device features.

Phase 2 User Stories:
- US-P2-1: As a visitor, I see a pixel-faithful homepage with smooth animations.
- US-P2-2: As a user, I can navigate to any section from the header and footer.
- US-P2-3: As a user, I can interact with the testimonials carousel (next/prev, autoplay pause on hover).
- US-P2-4: As a prospect, I can submit the Contact form and receive a success confirmation.
- US-P2-5: As a QA, invalid email/required fields block submission with clear messages.
- US-P2-6: As a marketer, the submitted lead appears in Google Sheets with accurate fields.
- US-P2-7: As a privacy-conscious user, I can Accept All or Essential Only cookies; my choice persists.
- US-P2-8: As a user, “Become a Client” CTAs do not start account creation but route to Contact/Let’s Talk.
- US-P2-9: As a mobile user, the site is responsive and interactions remain smooth.
- US-P2-10: As support, I can see backend logs clearly if any submission fails.

Acceptance Criteria (Phase 2):
- Visual fidelity within reasonable tolerance (fonts, spacing, colors, interactions).
- Contact form → backend → Google Sheets works reliably under normal load.
- All routes functional; no login/account features present.
- No console errors; Lighthouse passable for a content-heavy page.

## 4) Implementation Steps (End-to-End)
1. ~~Phase 1 – POC~~ **SKIPPED** - User wants to integrate Google Sheets at the end
2. Phase 2 – App (IN PROGRESS)
   - Design guidelines obtained ✓
   - Implement backend endpoints (health, placeholder for contact form later)
   - Implement frontend pages/sections, animations, cookie banner; Contact form UI only (non-functional)
   - Validate on preview URL; fix issues; run testing_agent_v3; iterate until green.
3. Phase 3 – Google Sheets Integration (LATER)
   - Will integrate contact form with Google Sheets after main clone is complete

## 5) Next Actions (For User and Dev)
- User: Provide Google Service Account JSON (with edit access to target Sheet), Spreadsheet ID, Sheet Name.
- Dev: Generate Google Sheets playbook, scaffold POC endpoint + test_core.py, request secrets via secure channel, run POC.
- After POC success: Full build (20–30 minutes), then E2E testing & polish.

## 6) Success Criteria
- Core: Contact submissions append rows to Google Sheets with 99%+ reliability and clear error handling.
- Fidelity: Homepage and key sections visually and interactively match the source closely.
- UX: Validations, loading states, toasts, and responsive behavior feel premium and polished.
- Stability: No red screens or unhandled exceptions; API routes under /api; env-driven config; data-testid added.
- Test: testing_agent_v3 scenarios pass; manual sheet verification shows correctly formatted rows.

## 7) Risks & Mitigations
- Google API auth errors/quotas → Use service account, proper scopes, exponential backoff.
- Asset/CDN changes → Provide local fallbacks for critical hero visuals.
- Animation parity → Use Framer Motion/CSS with careful timing; degrade gracefully on low-end devices.
- Spam submissions → Simple honeypot + basic rate limits; revisit if needed.

---
This plan keeps the core (Google Sheets lead capture) proven first, then builds a comprehensive, high-fidelity clone around it, finishing with rigorous testing and polish.
