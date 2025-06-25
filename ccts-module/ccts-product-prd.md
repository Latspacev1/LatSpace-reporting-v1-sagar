## Product Requirements Document (PRD)

**Project:** LatSpace — **CCTS Compliance Manager (MVP)**

---

### 1. Purpose & Vision

India’s new **Carbon Credit Trading Scheme (CCTS)** forces high-emitting industries (cement, power, steel) to hit annual GHG-intensity targets plant-by-plant or surrender *Carbon Credit Certificates (CCCs)*. Most companies → Excel, ad-hoc scripts, and frantic year-end reconciliations.

**LatSpace CCTS Compliance Manager** will be the single pane of glass that:

1. Streams verified emissions data per plant in near-real-time.
2. Maintains an auditable CCC ledger.
3. Auto-prepares regulatory filings and target-vs-actual dashboards.

The MVP focuses on *compliance first.*

---

### 2. Personas & Pain Points

| Persona | Core Pain Today | MVP Relief |
| --- | --- | --- |
| Sustainability Manager | Manual consolidation of six plant files; late detection of overruns | Real-time dashboard, automated variance alerts |
| Finance Controller | No single CCC balance; risk of penalties | FIFO/LIFO CCC ledger, cost roll-ups |
| Plant Ops Engineer | No view of target vs. actual during the year | Plant-level trend + alert banners |
| External Auditor | Evidence scattered across mail and drives | Immutable ledger + evidence vault |

---

### 4. Scope – MVP Features

| # | Feature | Must / Should | Functional Requirements |
| --- | --- | --- | --- |
| **1** | **Plant-Level Emissions Monitor** | **M** | • Accept periodic CSV / API uploads (production, fuel, kiln temp, stack analyser)• Auto-calculate GHG intensity per notified formula• Trend chart & red/amber/green variance badge (daily aggregation) |
| **2** | **CCC Ledger** | **M** | • CRUD for purchase, sale, transfer, expiry• Cost layers (FIFO/LIFO)• Evidence upload (PDF/IMG); hash stored for immutability |
| **3** | **Compliance Cockpit** | **M** | • Countdown widget to submission deadline• E-mail download link + e-signature routing |
| **4** | **Alerts Engine** | **S** | • Threshold rules (variance %, credit balance, file upload failures) → E-mail / Slack |
| **5** | **User & Role Management** | **M** | • Admin, Sustainability, Finance, Auditor roles• SSO via OIDC |
| **6** | **Data Import Wizard** | **M** | • CSV template validation (schema + units)• Error report for bad rows |
| **7** | **Reporting API (Read-only)** | **S** | • JWT-secured JSON endpoints for dashboard embedding |

5. User Journey (Happy Path)

1. **Admin** creates plants and assigns roles.
2. **Plant Ops Engineer** uploads weekly CSV (production + fuel).
3. System validates → emissions factor lookup → intensity computed.
4. **Dashboard** shows Plant-A 0.73 t CO₂-e/t vs. target 0.70 (amber).
5. **Finance Controller** records purchase of  CCCs (ledger auto-updated).
6. **Compliance Cockpit** projects year-end surplus CCCs.

---

### 10. Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
| --- | --- | --- | --- |
| Inconsistent plant data units | High | High | Strict CSV schema + unit conversion mapping |
| Regulatory spec changes mid-cycle | Med | High | Rules engine & config table, monitor MoP gazettes |
| Customer IT blocks cloud ingestion | Med | Med | Provide on-prem data gateway binary |
| Over-engineering AI features & slipping MVP | High | Med | Feature freeze after sprint 2; backlog phase-2 |

---

### *End of PRD*

---