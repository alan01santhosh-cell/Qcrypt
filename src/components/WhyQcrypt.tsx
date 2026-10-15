import {
  CheckCircle2,
  Shield,
  Layers,
  FileCheck,
  Target
} from 'lucide-react';

export const WhyQcrypt: React.FC = () => {
  const differentiators = [
    {
      title: 'Actionable Prioritization, Not Just an Endless List',
      description:
        'Generic security scanners flood engineering backlogs with thousands of cryptographic alerts. Qcrypt contextualizes each finding by public exposure, data lifespan, and algorithmic severity so teams fix what matters.',
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
    <section id="why-qcrypt" className="relative py-24 sm:py-32 bg-[#050814] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-4">
            Structured Migration
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Make Post-Quantum Migration More Manageable.
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed font-normal">
            Post-quantum cryptography migration will be one of the largest infrastructural transitions in computing
            history. Qcrypt makes this monumental challenge approachable and structured.
          </p>

          {/* Prominent Core Value Proposition Box */}
          <div className="mt-8 p-5 rounded-2xl bg-cyan-950/30 border border-cyan-400/30 shadow-[0_0_25px_rgba(0,240,255,0.1)]">
            <div className="text-xs font-mono uppercase text-cyan-300 tracking-wider font-semibold mb-2">
              Our Core Differentiation
            </div>
            <p className="text-base sm:text-lg text-white font-semibold leading-relaxed">
              &ldquo;Qcrypt connects cryptographic discovery, risk prioritization, and migration planning in one
              structured workflow.&rdquo;
            </p>
          </div>
        </div>

        {/* 4 Key Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {differentiators.map((diff) => {
            const Icon = diff.icon;
            return (
              <div key={diff.title} className="cyber-card rounded-2xl p-6 sm:p-7 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-950/50 border border-cyan-500/25 flex items-center justify-center text-cyan-400 shrink-0">
                  <Icon className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                    {diff.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {diff.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Honest Comparison Matrix */}
        <div className="double-bezel">
          <div className="double-bezel-inner p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white mb-2">
              How Qcrypt Compares
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6 font-mono">
              Designed specifically for post-quantum cryptographic intelligence, not generic vulnerability noise.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-3">Cryptographic Dimension</th>
                    <th className="py-3 px-3 text-slate-400">Generic SCA Tools</th>
                    <th className="py-3 px-3 text-slate-400">Manual Audits</th>
                    <th className="py-3 px-3 text-cyan-300 bg-cyan-950/40 rounded-t-lg">Qcrypt Platform</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-3 font-semibold text-white">
                        {row.capability}
                      </td>
                      <td className="py-3.5 px-3 text-slate-400 text-xs">
                        {row.genericSca}
                      </td>
                      <td className="py-3.5 px-3 text-slate-400 text-xs">
                        {row.manualAudit}
                      </td>
                      <td className="py-3.5 px-3 text-cyan-200 text-xs font-semibold bg-cyan-950/20">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                          {row.qcrypt}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
