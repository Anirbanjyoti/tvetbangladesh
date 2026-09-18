# 📊 Comprehensive Product & Business Analysis Report (PRD Review)

**Document:** Senior Product Analyst & Business Analyst Review  
**Author:** Lead Product Analyst & Principal Business Analyst  
**Date:** Current Review (September 2026)  
**Reference Document:** `prd.md` (Updated to Version 1.2.0)  
**Status:** Synchronized & Integrated into Core PRD

---

## 1. 📌 Project Summary
The project is a specialized **Dual-Accredited SaaS & TVET Freelance Marketplace** tailored specifically for the technical, vocational, and polytechnic ecosystem in Bangladesh. 

* **The Core Gap:** Mainstream freelancing platforms (Upwork, Fiverr) cater heavily to software development and digital marketing, marginalizing TVET engineering disciplines (AutoCAD/SolidWorks design, PLC automation, circuit fabrication, civil estimation, HVAC design). Simultaneously, polytechnics, Technical Training Centers (TTCs), and National Skills Development Authority (NSDA) Skills Training Providers (STPs) lack a centralized cloud infrastructure for CBT&A (Competency Based Training & Assessment), digital attendance, donor audit export, and practical lab streaming.
* **The Hybrid Solution:** A dual-sided platform integrating:
  1. A localized, escrow-protected gig marketplace for verified TVET technicians.
  2. An interactive live classroom with WebRTC low-bandwidth resilience and anti-piracy watermarking.
  3. A multi-tenant institutional SaaS suite for polytechnics and training centers with white-label portals, 1-click audit compliance exports (BTEB, NSDA, SEIP, ASSET), and direct placement pipelines.

---

## 2. 🎯 Goals & Success Metrics (KPIs)
* **User Adoption & Network Effects:**
  * 5,000+ verified TVET professionals onboarded within 6 months.
  * 100+ accredited Polytechnics, TTCs, and NSDA STPs subscribed to the SaaS suite.
  * 10,000+ technical learners and students active on the platform.
* **Financial & Escrow Integrity:**
  * 0% escrow leakage or fund loss; 98%+ successful transaction settlement rate.
  * Dispute rate maintained strictly under $1.5\%$ of total marketplace transactions.
  * 48-hour fraud clearance holding period for seller payouts to prevent chargebacks.
* **Marketplace Liquidity & SLA:**
  * Gig & custom offer fulfillment rate $\ge 75\%$ (order matched and initiated within 7 days of posting).
  * Accreditation credential review Turnaround Time (TAT) $< 24$ hours.
  * Escrow payout request processing $< 12$ hours.
* **Monetization Targets:**
  * 8%–12% effective net platform revenue on total GMV via 15% seller commission and 5% buyer transaction processing fee.
  * Predictable Monthly Recurring Revenue (MRR) via 4-tiered institutional SaaS plans.
* **Technical Performance:**
  * First Contentful Paint (FCP) $< 2.5\text{s}$ over mobile 3G/4G rural cellular networks.
  * 99.9% availability SLA on database and core transaction microservices.

---

## 3. 🎭 Actors
The system operates across three tiers of actors:

### 3.1 Primary Human Actors
* **TVET Freelancer / Trainer:** Sells technical CAD/circuit design services, sends custom offers, conducts live practical lab batches.
* **Client / SME Buyer:** Local engineering firms, workshops, contractors, and individuals hiring TVET talent under escrow protection.
* **Student / Trainee:** Polytechnic or vocational student attending live interactive classes, submitting assignments, and receiving QR-verified digital credentials.
* **Institute Admin:** Principal, Director, or Chief Coordinator of a Polytechnic/TTC/STP managing shifts, curricula, and institutional finances.
* **Institute Instructor:** Internal faculty member conducting practical lab sessions, managing continuous assessment logbooks, and recording attendance.
* **Enterprise Recruiter:** B2B corporate partner seeking verified graduates for formal apprenticeships or contract work.
* **Super Admin / Legal Arbiter:** Platform authority overseeing KYC audits, dispute resolution, financial ledgers, and system policies.

### 3.2 Automated & External Actors
* **Local Payment Gateways:** bKash Checkout, Nagad Direct, SSLCommerz.
* **Identity Verification Provider:** Government Porichoy API (NID validation).
* **System Scheduler / Cron Workers:** 72-hour auto-approval worker, 48-hour withdrawal clearance worker, subscription renewal engine, and certificate expiry notification engine.
* **Media SFU Engine:** LiveKit SFU infrastructure routing audio, video, and screen-sharing data.

---

## 4. 👤 User Types & RBAC Hierarchy

| User Role (`role`) | Context | Key Capabilities & Boundaries |
| :--- | :--- | :--- |
| `FREELANCER` | Marketplace | Publishes gigs, creates custom offers, hosts paid live classes, submits work, initiates withdrawal. |
| `CLIENT` | Marketplace | Browses gigs, deposits into escrow, requests up to 3 revisions, initiates disputes, writes reviews. |
| `STUDENT` | Classroom / SaaS | Attends live streams, accesses dynamic watermarked playback, downloads dual-branded QR certificates. |
| `INSTITUTE_ADMIN` | Multi-Tenant SaaS | Manages custom subdomain, configures trades/batches, collects tuition fees via bKash, exports SEIP/ASSET reports. |
| `INSTITUTE_INSTRUCTOR` | Multi-Tenant SaaS | Broadcasts central workshop lab streams, grades CBT&A logbooks (`Competent` vs `Not Yet Competent`). |
| `ENTERPRISE_RECRUITER` | B2B Portal | Browses verified alumni directories, sends direct hire proposals to certified technicians. |
| `SUPER_ADMIN` | Platform Wide | System-wide audit logs, dispute ruling (full refund, release, or percentage split), escrow overrides. |

* **Dual-Profile Policy:** An `INSTITUTE_INSTRUCTOR` can toggle their active context to `FREELANCER` to sell personal gigs; however, institutional students, classes, and earnings remain cryptographically and logically isolated under the respective `tenantId`.

---

## 5. ⚙️ Functional Requirements (FR) Analysis
1. **Dual-Track TVET KYC Verification:**
   * Support for BTEB (Roll/Registration) and NSDA (NTVQF Registration, Level 1–6, Assessor/Trainer ID).
   * Integration with Porichoy API for national identity validation.
   * Manual admin audit queue SLA guaranteed $< 24$ hours for "Verified TVET Pro" badge activation.
2. **Dual Marketplace & Custom Quotations:**
   * 3-Tier standard gig catalog (Basic, Standard, Premium).
   * Direct in-chat "Custom Offer" generation allowing custom prices, deliverables, and delivery dates.
   * **Anti-Disintermediation Chat Guard:** Real-time regex filter intercepting phone numbers, bKash accounts, and email exchange attempts before order funding.
3. **Escrow & Multi-Wallet Financial Engine:**
   * Webhook idempotency (`idempotencyKey = trxID + orderId`) ensuring duplicate gateway hits never trigger double wallet credits.
   * **Milestone-Based Escrow:** Multi-phase release for high-value engineering contracts ($> ৳15,000$).
   * **72-Hour Auto-Approval:** Delivered orders automatically release escrow funds to the seller if the buyer is inactive for 3 days without requesting a revision.
   * **Anti-Fraud Holding:** 48-hour `PENDING_CLEARANCE` state before earnings transition to `WITHDRAWABLE_BALANCE`.
4. **Interactive Virtual Lab & Classroom:**
   * LiveKit SFU supporting dual-camera inputs (face + bench test equipment).
   * **Canvas-Rendered Dynamic Anti-Piracy Watermark:** Floating overlay displaying trainee name, phone number, and Firebase UID.
   * **WebRTC Simulcast + SVC:** Automatic downscaling to 240p audio-first stream under rural 3G cellular fluctuations.
   * Single concurrent session enforcement preventing shared login abuse.
5. **Institutional SaaS Engine:**
   * White-label tenant branding (`tenant.tvetplatform.com`).
   * 1-Click official PDF/Excel compliance exports aligned with NSDA, BTEB, SEIP, and ASSET standards.
   * Automated online tuition collection with an integrated 5% platform fee.
   * Cloud storage quota management (warnings at 80% & 95%, graceful upload pause at 100% without terminating live sessions).

---

## 6. 🔒 Non-Functional Requirements (NFR) Analysis
* **Performance & Network Optimization:**
  * Static assets cached globally via Cloudflare CDN.
  * Server-side rendering (Next.js) with code-splitting to keep mobile bundles $< 150\text{ KB}$.
* **Concurrency Control & Escrow Safety:**
  * All financial wallet mutations run inside MongoDB Atlas Multi-Document ACID Transactions with `readConcern: "majority"` and `writeConcern: "majority"`.
  * Distributed locking (via Redis or database mutex) applied on wallet balance updates to eliminate race conditions.
* **Disaster Recovery & Availability:**
  * 99.9% uptime SLA across database and API gateways.
  * **RPO (Recovery Point Objective):** $\le 1\text{ hour}$ (automated hourly database snapshots).
  * **RTO (Recovery Time Objective):** $\le 4\text{ hours}$ (automated failover to secondary cluster).
* **Data Privacy & Security:**
  * OWASP Top 10 compliance, CSRF protection, and Firebase ID token signature verification on all API endpoints.
  * AES-256 encryption at rest for sensitive NID numbers and bank account records; TLS 1.3 in transit.
  * 1-year data retention for order chat logs, delivery file hashes, and attendance records.

---

## 7. 📜 Business Rules (BR)
* **BR-01 (Revenue Take Rate):** 15% platform commission on freelancer earnings; 5% platform processing fee added to client checkout and institutional fee collections.
* **BR-02 (Escrow Lifecycle):** Transitions through `ESCROW_LOCKED` $\rightarrow$ `IN_PROGRESS` $\rightarrow$ `DELIVERED` $\rightarrow$ `APPROVED` $\rightarrow$ `FUNDS_RELEASED`. Inactivity for 72 hours triggers `AUTO_APPROVED`.
* **BR-03 (Revision Allowances):** Basic package allows 1 revision; Standard allows 2; Premium allows 3. Each valid revision request grants the seller a 48-hour deadline extension.
* **BR-04 (Payout Governance):** 48-hour pending clearance holding period. Minimum withdrawal: ৳500 for bKash/Nagad; ৳5,000 for BEFTN bank transfers.
* **BR-05 (Credential Expiry):** NSDA credentials nearing expiry trigger alerts at 30 days. Failure to provide renewed credentials within 30 days post-expiry suspends the "Verified TVET Pro" badge.
* **BR-06 (Tenant Data Isolation):** Complete multi-tenant data silo per `tenantId`. No cross-tenant access permitted.
* **BR-07 (Anti-Disintermediation):** Bypassing escrow via chat triggers an automated warning on first offense and account suspension on second offense.

---

## 8. 🧠 Assumptions & Dependencies
1. **Fintech Escrow Regulatory Grounding:** Operating via merchant escrow accounts with licensed payment gateways (bKash Merchant Checkout, SSLCommerz) is compliant with current Bangladesh Bank digital commerce guidelines.
2. **Porichoy API SLA:** The Government Porichoy identity service maintains stable uptime and sustainable per-verification query pricing.
3. **Instructor Device Readiness:** TVET instructors possess at minimum an Android/iOS smartphone with a camera and a laptop/PC capable of running WebRTC.
4. **Bandwidth Resilience:** End-users frequently access the platform via 3G mobile hotspots in rural areas, mandating lightweight PWA and adaptive bitrate streaming.

---

## 9. ⚠️ Missing Requirements & Addressed Edge Cases
* **Addressed in PRD v1.2.0:**
  * ✅ Client unresponsive after delivery $\rightarrow$ Solved via 72-hour auto-approval.
  * ✅ High-ticket engineering project risks $\rightarrow$ Solved via 3-step milestone escrow ($> ৳15,000$).
  * ✅ Payment gateway webhook replay attacks $\rightarrow$ Solved via `idempotencyKey = trxID + orderId`.
  * ✅ Off-platform direct deal leakage $\rightarrow$ Solved via chat regex masking filter.
  * ✅ Student credential sharing in live classes $\rightarrow$ Solved via single active session enforcement per UID.
  * ✅ Cloud storage quota spikes $\rightarrow$ Solved via quota thresholds (80%/95%/100%) and graceful upload freezing.
  * ✅ Dispute evidence tampering $\rightarrow$ Solved via automated dispute evidence locker with SHA-256 file hashing.

---

## 10. ❓ Strategic Questions for Product Owner & Leadership
The following strategic clarifications remain open for executive consideration:

1. **Back-Office Verification Team:** Who will staff the manual verification review queue (validating uploaded BTEB marks-sheets and NSDA physical certificates within the 24-hour SLA)?
2. **AIT / Tax Withholding:** For corporate B2B and institutional SaaS subscriptions, does the platform issue automated tax certificates (Mushak 6.3) for Advance Income Tax (AIT) deductions?
3. **Cold Storage Archiving Policy:** To manage AWS/Cloudflare storage expenses, should live class recordings older than 6 months automatically be transcoded to 360p or archived to cold storage (Cloudflare R2 / AWS S3 Glacier)?
4. **Corporate Apprenticeship Monetization:** When an enterprise recruiter hires a TVET graduate through the platform pipeline, should the platform charge a placement finder's fee (e.g., ৳1,000–৳2,500) to create an additional revenue stream?

---
*Report concluded. `prd.md` has been updated to Version 1.2.0 reflecting all actionable recommendations.*
