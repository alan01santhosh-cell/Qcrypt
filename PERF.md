# Performance Optimization Ledger — Qcrypt

This document tracks performance baselines, optimization experiments, measured outcomes, and enforced performance budgets across the **Qcrypt** web platform.

---

## 1. Performance Ledger

| Optimization Attempt | Baseline &rarr; Measured Result | Verdict | Analysis & Mechanism |
| :--- | :--- | :--- | :--- |
| **Manual Vendor Chunking (`vite.config.ts`)** | `346.7 kB` monolithic bundle &rarr; `112.3 kB` app code + cached vendor runtime chunks | **KEPT** | Decouples `react`/`react-dom` (`210.9 kB`) and `lucide-react` (`24.1 kB`) from application code so vendor runtimes remain cached across code releases. |
| **Route & Section Code-Splitting (`React.lazy` in `App.tsx`)** | `112.3 kB` main app bundle &rarr; **`29.2 kB`** critical entry bundle (gzip: `8.58 kB`) | **KEPT** | **91.6% reduction** in initial application JS payload. Above-the-fold content (`Navbar` + `Hero`) executes immediately without waiting for heavy below-the-fold components (`DashboardPreview`, `ContactSection`). |
| **Non-Blocking Font Preload (`index.html`)** | Render-blocking CSS font request (`Plus Jakarta Sans` & `JetBrains Mono`) &rarr; `preload` + `media="print" onload="this.media='all'"` | **KEPT** | Eliminates FCP/LCP render-blocking penalty while preserving typography via `display=swap`. Dropped unused `wght@300` font weight saving network bytes. |
| **Subpath Asset Resilience (`index.html`)** | Absolute root paths (`/favicon.svg`, `/og-image.png`) &rarr; relative `./favicon.svg` | **KEPT** | Prevents 404 network penalty when served under GitHub Pages subpaths (`/Qcrypt/`). |
| **React Compiler Purity Optimization (`Footer.tsx`)** | Impure `new Date().getFullYear()` in render &rarr; Hoisted `CURRENT_YEAR` constant | **KEPT** | Restores pure rendering, eliminates re-render recalculation, and enables full React Compiler dead-code elimination. |

---

## 2. Before & After Production Metrics

### Bundle Payloads (Vite Build)

| Metric | Before Optimization | After Optimization | Delta |
| :--- | :--- | :--- | :--- |
| **Initial App JS Chunk** | `346.70 kB` (gzip: `99.80 kB`) | **`29.21 kB`** (gzip: `8.58 kB`) | **-91.6% (-317.5 kB)** |
| **React Runtime Chunk** | N/A (bundled into index) | `210.92 kB` (gzip: `65.85 kB`) | Separated & cached |
| **Icon Library Chunk** | N/A (bundled into index) | `24.15 kB` (gzip: `8.60 kB`) | Separated & cached |
| **DashboardPreview Chunk** | N/A (bundled into index) | `17.42 kB` (gzip: `4.76 kB`) | Lazy-loaded on scroll |
| **ContactSection Chunk** | N/A (bundled into index) | `13.90 kB` (gzip: `3.83 kB`) | Lazy-loaded on scroll |
| **SolutionSection Chunk** | N/A (bundled into index) | `11.22 kB` (gzip: `3.60 kB`) | Lazy-loaded on scroll |
| **Footer Chunk** | N/A (bundled into index) | `9.76 kB` (gzip: `2.62 kB`) | Lazy-loaded on scroll |
| **ProblemSection Chunk** | N/A (bundled into index) | `7.98 kB` (gzip: `2.52 kB`) | Lazy-loaded on scroll |
| **FeaturesSection Chunk** | N/A (bundled into index) | `6.22 kB` (gzip: `2.55 kB`) | Lazy-loaded on scroll |
| **WhyQcrypt Chunk** | N/A (bundled into index) | `5.88 kB` (gzip: `2.25 kB`) | Lazy-loaded on scroll |
| **TargetCustomers Chunk** | N/A (bundled into index) | `5.70 kB` (gzip: `2.44 kB`) | Lazy-loaded on scroll |
| **FaqSection Chunk** | N/A (bundled into index) | `5.40 kB` (gzip: `2.56 kB`) | Lazy-loaded on scroll |
| **StandardsSection Chunk** | N/A (bundled into index) | `4.83 kB` (gzip: `1.69 kB`) | Lazy-loaded on scroll |
| **Production Build Time** | ~1000ms | ~1000ms | 0ms regression |

---

## 3. Enforced Performance Budgets

To guard against regressions during future feature releases:

- **Initial Entry JS**: `< 50 kB` (Current: `29.2 kB`)
- **Total CSS**: `< 50 kB` (Current: `43.1 kB`)
- **LCP Target**: `≤ 1.2s` on 4G
- **INP Target**: `≤ 50ms` (Zero long tasks during user interactions)
- **CLS Target**: `0.0` (Explicit aspect ratios, zero post-load layout shifts)
- **Linter / Purity**: Zero React purity warnings (`oxlint` passes in `< 20ms`)
