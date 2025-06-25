### UI / UX Blueprint — **LatSpace CCTS Compliance Manager (MVP)**

*(tailored to LatSpace’s black / white / #074D47 palette and your existing design language)*

---

## 1. Information Architecture (IA)

```
┌─ Home (global nav bar) ──────────────┐
│  • Dashboard (default)               │
│  • Plants ▼                          │
│       – Plant Overview               │
│       – Data Upload Wizard           │
│  • Credits Ledger                    │
│  • Compliance Cockpit                │
│  • Alerts & Reports                  │
│  • Admin / Settings                  │
└──────────────────────────────────────┘

```

- Global “plant picker” next to logo lets users jump directly to a plant context.
- Breadcrumbs show **Company › Plant › Section** to keep orientation clear.

---

## 2. Core User Flows (happy path)

| Flow | Start | End | Key Screens |
| --- | --- | --- | --- |
| **A. Data Upload** | Dashboard → “Add Data” CTA | Success toast | Upload Wizard (stepper) → Validation → Confirmation |
| **B. Monitor Intensity** | Dashboard | Same | Plant KPI Cards → Trend Chart → Variance Heat-map |
| **C. Record CCC Purchase** | Ledger → “Add Transaction” | Ledger refreshed | Modal form → Evidence Upload → Toast |
| **D. Year-End Filing** | Compliance Cockpit | PDF download | Checklist → Auto-fill Form-1 → E-sign prompt |
| **E. Alert Response** | Email/Slack deep-link | Dashboard filtered to issue | Alert Detail Side-panel → “Create Task” CTA |

---

## 3. Screen-by-Screen Wireframe Notes

*(Metric grids assume 12-col, 1200 px desktop; collapse to 4-col on mobile)*

### 3.1 Dashboard – Company Level

```
┌───────────────────────────── Top Bar ──────────────────────────────┐
│  Logo   Plant Picker ▼  |  Search …   |  Alerts 🔔3  |  User □     │
└─────────────────────────────────────────────────────────────────────┘
┌────── KPI Cards (4-Col) ──────┐  ┌─── Credit Balance Sparkline ───┐
│  • Avg Intensity vs Target    │  │ purchase / sale trend         │
│  • Projected Surplus/Deficit  │  └───────────────────────────────┘
│  • CCCs Banked (t)            │
│  • Days to Filing Deadline    │
└───────────────────────────────┘
┌────────────────── Plant Heat-map (interactive) ───────────────────┐
│ Matampally  ▇▇  +4 % over   • click opens Plant Overview          │
│ Gudipadu    ▇    −1 % under                                      │
│ …                                                             🛈 │
└────────────────────────────────────────────────────────────────────┘
┌──── Forecast Card (Area chart + 95 % CI) ─────────────────────────┐
└────────────────────────────────────────────────────────────────────┘

```

*Hovering a heat-map cell shows tooltip: “Target 0.70, Current 0.73 (+4 %).”*

### 3.2 Plant Overview

*Vertical split: left column = KPIs & actions; right = charts.*

- Sticky Status Banner (green / amber / red) with download CSV icon.
- Tabs: **Intensity • Data Logs • Equipment • Alerts**

### 3.3 CCC Ledger

- Data-grid with sticky header, infinite scroll, column chooser, per-row “Attach Evidence”.
- Filters: **Transaction Type**, **Plant**, **Date Range**.
- Right-side “Cost Layer Summary” widget recalculates as filters change.

### 3.4 Compliance Cockpit

```
┌── Countdown Timer “34 days left” ──┐      ┌─ Progress Checklist ─┐
│  % probability compliant: 92 %     │      │ ☑ Data up-to-date   │
└────────────────────────────────────┘      │ ☐ Ledger balanced   │
                                            │ ☐ Form-1 generated  │
                                            └─────────────────────┘

```

*Generate → preview modal → Download PDF → “Send for E-sign” CTA.*

### 3.5 Alert Centre

- Kanban-style board (To-do / Investigating / Done) or table list view toggle.
- Clicking opens side-panel with root-cause hints, comment thread, and *“Assign to”* dropdown.

---

## 4. Visual & Interaction Design

| Token | Value | Usage |
| --- | --- | --- |
| **Primary** | `#074D47` | CTA buttons, active tabs |
| **Success** | `#37B77A` | Compliant banners |
| **Warning** | `#F5A623` | Amber alerts |
| **Error** | `#E54D4D` | Over-target markers |
| **Font** | Inter / Roboto 400-700 | 14 px base, 32 px H1 |
| **Shadow** | `0 2px 6px rgba(0,0,0,.08)` | Cards & modals |
| **Radius** | 12 px (cards), 24 px (buttons) | consistent with earlier LatSpace UI |

*Micro-interactions:*

- Buttons elevate +2 px on hover, ripple on click.
- Auto-save snackbar slides up from bottom-left.
- Heat-map cells pulse light grey when data refreshes.

---

## 5. Component Library (React + Tailwind)

| Component | Props Highlights | Re-use |
| --- | --- | --- |
| `<KpiCard />` | value, delta, unit, target, trendData | Dashboard, Plant page |
| `<HeatMap />` | data array, tooltipRenderer | Company view |
| `<LedgerTable />` | rows, onEvidenceUpload, costMethod | Ledger |
| `<CountdownBanner />` | deadline, probability | Cockpit |
| `<StepperUpload />` | steps, schema, onSuccess | Data Import |

---

## 6. Accessibility & Responsiveness

1. Color-contrast ≥ 4.5 : 1 (verify warning amber on white).
2. Keyboard navigation: **Tab** order mirrors visual order; `Enter` = primary action.
3. Alt text auto-generated for charts via `aria-label`.
4. Mobile: KPI cards collapse to 2-col; tables switch to stacked “card list” view.

---

## 7. Prototype Handoff Tips

- **Figma pages**
    
    *Page 1 – Design Tokens, Page 2 – Components, Page 3 – Dashboard, Page 4 – Flows.*
    
- Use Auto-layout; set constraints so charts stretch.
- Embed real production sample data for realism in stakeholder demos.

---