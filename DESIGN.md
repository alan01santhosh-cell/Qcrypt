---
colors:
  background-primary: "#02040a"
  background-card: "#060a16"
  background-shell: "rgba(255, 255, 255, 0.025)"
  brand-cyan: "#00f0ff"
  brand-cyan-glow: "rgba(0, 240, 255, 0.35)"
  brand-blue: "#3b82f6"
  brand-emerald: "#10b981"
  brand-rose: "#f43f5e"
  brand-amber: "#f59e0b"
  border-hairline: "rgba(255, 255, 255, 0.08)"
  border-highlight: "rgba(0, 240, 255, 0.4)"
  foreground-primary: "#f8fafc"
  foreground-secondary: "#94a3b8"
  foreground-muted: "#64748b"

typography:
  sans:
    fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif'
  mono:
    fontFamily: '"JetBrains Mono", monospace'
  display:
    fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif'
    fontSize: "clamp(2.75rem, 5.5vw, 5.25rem)"
    lineHeight: "1.04"
    fontWeight: 800
    letterSpacing: "-0.035em"
  heading:
    fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif'
    fontSize: "clamp(2rem, 3.5vw, 3.25rem)"
    lineHeight: "1.12"
    fontWeight: 800
    letterSpacing: "-0.025em"
  subheading:
    fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif'
    fontSize: "1.125rem"
    lineHeight: "1.65"
    fontWeight: 400
  code:
    fontFamily: '"JetBrains Mono", monospace'
    fontSize: "0.8125rem"
    lineHeight: "1.5"

rounded:
  base: "1.75rem"
  shell: "2rem"
  inner: "calc(2rem - 6px)"
  pill: "9999px"

spacing:
  section-y: "py-28 md:py-36 lg:py-44"
  container-max: "max-w-6xl"
  macro-gap: "gap-8 md:gap-12"
---

# Qcrypt Design Language Specification

## Overview
Qcrypt is a Post-Quantum Cryptography (PQC) Migration Intelligence platform for enterprise technology leaders, CISOs, security architects, and platform engineers. The design language fuses Awwwards-tier visual prestige with cryptographic precision.

## Visual Archetype
- **Texture:** Deepest Obsidian (`#02040a`) with microscopic GPU-friendly fractal film-grain (`opacity: 0.03`) and ambient radial cyan/sapphire luminescence.
- **Card Enclosure (Doppelrand):** Concentric double-bezel machining with outer translucent shells (`rounded-[2rem]`) and inner high-contrast dark plates (`rounded-[calc(2rem-6px)]`).
- **Button Kinetics:** Nested Island Button architecture (`btn-island-primary`) with recessed circular icon pods translating along the diagonal on hover.
- **Motion:** Custom spring dynamics `cubic-bezier(0.32, 0.72, 0, 1)`, GPU-safe `transform` and `opacity` interpolations, and live interactive lattice canvas simulations.
- **Responsive Contract:** Fluid single-column collapse below `768px`, minimum 44px tap targets, and absolute prohibition of horizontal scrollbars.
