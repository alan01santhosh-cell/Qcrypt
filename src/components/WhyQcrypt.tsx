import React from 'react';
import {
  CheckCircle2,
  Shield,
  Layers,
  FileCheck,
  Target,
  Sparkles
} from 'lucide-react';
import { AgilityCalculator } from './AgilityCalculator';

interface WhyQcryptProps {
  onExploreRemediation?: () => void;
}

export const WhyQcrypt: React.FC<WhyQcryptProps> = ({ onExploreRemediation = () => {} }) => {
  const differentiators = [
    {
      title: 'Actionable Prioritization, Not Just an Endless List',
      description:
        'Generic security scanners flood engineering backlogs with thousands of cryptographic alerts. Qcrypt contextualizes each finding by public exposure, data lifespan, and algorithmic severity so teams fix what actually matters.',
      icon: Target
    },
    {
      title: 'End-to-End Workflow: From AST to Migration Plan',
      description:
        'Rather than leaving teams stranded after finding an issue, Qcrypt provides concrete remediation recipes and bridges the gap between static discovery and active architectural migration.',
      icon: Layers
    },
    {
      title: 'Informed by Recognized NIST PQC Standards',
      description:
        'Our migration blueprints directly align with finalized NIST FIPS 203 (ML-KEM), 204 (ML-DSA), and 205 (SLH-DSA) parameters, eliminating guesswork about which algorithms to adopt.',
      icon: Shield
    },
    {
      title: 'Audit-Ready CBOM Generation',
      description:
        'Produce structured, machine-readable Cryptographic Bills of Materials (CycloneDX 1.6 / SPDX) on demand for internal architecture reviews, external customers, and risk committees.',
      icon: FileCheck
    }
  ];

  const comparisonRows = [
    {
      capability: 'Cryptographic primitive & key size visibility',
      genericSca: 'Shallow package-level detection only',
      manualAudit: 'Slow, expensive, obsolete within 30 days',
      qcrypt: 'Deep AST code inspection & dependency tracking'
    },
    {
      capability: 'Quantum risk context (HNDL vs. Grover)',
      genericSca: 'None (flags only standard CVEs)',
      manualAudit: 'Dependent on external consultant skills',
      qcrypt: 'Built-in quantum vulnerability & threat modeling'
    },
    {
      capability: 'Cryptographic Bill of Materials (CBOM)',
      genericSca: 'Generic SBOM only (no crypto parameters)',
      manualAudit: 'Manual static spreadsheets',
      qcrypt: 'Automated CycloneDX 1.6 & SPDX CBOM export'
    },
    {
      capability: 'NIST PQC Migration blueprints',
      genericSca: 'No guidance provided',
      manualAudit: 'High-level advisory reports',
      qcrypt: 'Concrete FIPS 203/204 hybrid transition roadmap'
    }
  ];

  return (
    <section id="why-qcrypt" className="relative py-28 sm:py-36 bg-[#040814] border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-5">
            <Sparkles className="size-3.5" />
            Competitive Differentiator
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight text-balance">
            Make Post-Quantum Migration Manageable.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-pretty">
            Post-quantum cryptography migration will be one of the largest infrastructural transitions in computing
            history. Qcrypt makes this monumental challenge approachable and structured.
          </p>
        </div>

        {/* 1. Interactive Agility Calculator Widget */}
        <div className="mb-16">
          <AgilityCalculator onExploreRemediation={onExploreRemediation} />
        </div>

        {/* 2. 4 Core Differentiators Bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {differentiators.map((diff, idx) => {
            const Icon = diff.icon;
            return (
              <div key={idx} className="double-bezel group">
                <div className="double-bezel-inner p-6 sm:p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="size-12 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="size-6 stroke-[1.5]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 text-balance">
                      {diff.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed text-pretty">
                      {diff.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Comprehensive Comparison Table (Doppelrand Enclosure) */}
        <div className="double-bezel group">
          <div className="double-bezel-inner p-6 sm:p-8 overflow-x-auto">
            <div className="text-base font-bold text-white mb-1">
              Methodology Comparison
            </div>
            <div className="text-xs text-slate-400 mb-6 font-mono">
              Comparing Qcrypt AST intelligence against traditional approaches
            </div>

            <table className="w-full text-left text-xs border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-mono">
                  <th className="py-3 px-3 font-semibold">Capability</th>
                  <th className="py-3 px-3 font-semibold">Generic SAST / SCA</th>
                  <th className="py-3 px-3 font-semibold">Manual Advisory Audit</th>
                  <th className="py-3 px-3 font-bold text-cyan-400 bg-cyan-950/30 rounded-t-lg">
                    Qcrypt Migration Intelligence
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-3 font-medium text-white">{row.capability}</td>
                    <td className="py-3.5 px-3 text-slate-400">{row.genericSca}</td>
                    <td className="py-3.5 px-3 text-slate-400">{row.manualAudit}</td>
                    <td className="py-3.5 px-3 text-cyan-300 font-semibold bg-cyan-950/20">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="size-3.5 text-cyan-400 shrink-0" />
                        <span>{row.qcrypt}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
