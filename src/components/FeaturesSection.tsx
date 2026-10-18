import React from 'react';
import {
  SearchCode,
  FileSpreadsheet,
  AlertTriangle,
  Flame,
  Milestone,
  FileCheck2,
  CheckCircle2,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: 'Cryptographic Discovery',
      tagline: 'Deep AST & Dependency Inspection',
      icon: SearchCode,
      whatItDoes:
        'Analyzes supported source code (Go, Rust, TypeScript, Python, Java), package dependency graphs, CI/CD pipelines, and configuration files to locate cryptographic primitives, ciphersuites, key sizes, and curve parameters.',
      whyItMatters:
        'You cannot defend or migrate what you cannot see. Uncovers unmanaged cryptographic debt and shadow cryptography before auditors or external security reviews uncover them.',
      badge: 'Core Scanner'
    },
    {
      title: 'CBOM Inventory',
      tagline: 'Cryptographic Bill of Materials',
      icon: FileSpreadsheet,
      whatItDoes:
        'Consolidates all discovered cryptographic components into a standardized, machine-readable inventory following the latest CycloneDX 1.6 and SPDX CBOM specifications.',
      whyItMatters:
        'Provides security leadership and regulators with a continuous, verifiable single pane of glass, accelerating compliance inquiries and eliminating tedious manual spreadsheets.',
      badge: 'CycloneDX 1.6'
    },
    {
      title: 'Quantum Risk Analysis',
      tagline: 'Shor & Grover Threat Modeling',
      icon: AlertTriangle,
      whatItDoes:
        'Classifies every algorithm against theoretical quantum vulnerability (e.g. Shor’s algorithm breaking RSA/ECC vs. Grover’s algorithm requiring AES key doubling) and context factors like public network exposure.',
      whyItMatters:
        'Separates urgent threats (like public TLS key exchanges vulnerable to HNDL) from resilient components (like AES-256), grounding security discussions in mathematical reality.',
      badge: 'Threat Intelligence'
    },
    {
      title: 'Risk-Based Prioritization',
      tagline: 'Actionable Remediation Scoring',
      icon: Flame,
      whatItDoes:
        'Calculates a multi-factor risk score for every finding by combining algorithm obsolescence, exposure level, data classification, and data retention requirements.',
      whyItMatters:
        'Prevents alert fatigue and engineering pushback. Your development teams receive a clear, ranked backlog of the 5% of findings that represent 95% of your actual quantum risk.',
      badge: 'Context-Aware'
    },
    {
      title: 'PQC Migration Planning',
      tagline: 'NIST Standards Alignment',
      icon: Milestone,
      whatItDoes:
        'Maps vulnerable legacy algorithms to finalized NIST post-quantum standards (ML-KEM, ML-DSA, SLH-DSA) and provides staged hybrid transition paths.',
      whyItMatters:
        'Avoids costly trial-and-error architectural missteps. Gives engineering leads concrete migration blueprints and backward-compatible hybrid configurations.',
      badge: 'FIPS 203 & 204'
    },
    {
      title: 'Audit-Ready Reports',
      tagline: 'Executive & Compliance Summaries',
      icon: FileCheck2,
      whatItDoes:
        'Generates executive-ready PQC posture assessments, technical diffs for engineering sprints, and compliance-formatted exports for enterprise auditors and risk committees.',
      whyItMatters:
        'Demonstrates cryptographic diligence and proactive cyber hygiene to enterprise customers, enterprise insurance underwriters, and board directors.',
      badge: 'Board & Audit Ready'
    }
  ];

  return (
    <section id="features" className="relative py-28 sm:py-36 bg-[#040814] border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-5">
            <Sparkles className="size-3.5" />
            Product Capabilities
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight text-balance">
            Engineered for Cryptographic Agility &amp; Enterprise Governance.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-pretty">
            Every capability in Qcrypt is designed to solve a specific operational pain point, moving your organization
            from cryptographic uncertainty to a structured, repeatable migration practice.
          </p>
        </div>

        {/* 6 Feature Cards Grid (Doppelrand Double-Bezel Enclosure) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div key={feat.title} className="double-bezel group">
                <div className="double-bezel-inner p-6 sm:p-7 flex flex-col justify-between h-full">
                  <div>
                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="size-12 rounded-2xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                        <Icon className="size-5 stroke-[1.5]" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                        {feat.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors text-balance">
                      {feat.title}
                    </h3>
                    <div className="text-xs font-mono text-cyan-400 mb-4">
                      {feat.tagline}
                    </div>

                    {/* Dual Explanatory Block */}
                    <div className="space-y-4 pt-2">
                      <div>
                        <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-1">
                          What It Does
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed text-pretty">
                          {feat.whatItDoes}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/5">
                        <div className="text-[10px] font-mono uppercase text-cyan-300 tracking-wider mb-1 flex items-center gap-1.5">
                          <CheckCircle2 className="size-3.5 text-cyan-400" />
                          Why It Matters
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-medium text-pretty">
                          {feat.whyItMatters}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 group-hover:text-slate-300">
                    <span className="font-mono text-[11px]">CycloneDX 1.6 Supported</span>
                    <ArrowUpRight className="size-4 text-cyan-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
