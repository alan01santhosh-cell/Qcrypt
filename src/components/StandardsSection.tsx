import { NIST_STANDARDS_DATA } from '../data/mockData';
import { ExternalLink, Award, CheckCircle2, AlertCircle } from 'lucide-react';

export const StandardsSection: React.FC = () => {
  return (
    <section id="standards" className="relative py-24 sm:py-32 bg-[#050814] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-4">
            <Award className="size-3.5" />
            Global Cryptographic Frameworks
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight text-balance">
            Plan Your Migration with Established Standards.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-pretty">
            The National Institute of Standards and Technology (NIST) has officially released finalized Federal
            Information Processing Standards (FIPS) for Post-Quantum Cryptography. Qcrypt aligns your code analysis,
            CBOM categorization, and remediation blueprints directly with these international benchmarks.
          </p>

          <div className="mt-6">
            <a
              href="https://csrc.nist.gov/projects/post-quantum-cryptography"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-400 hover:text-cyan-300 border border-white/10 text-xs font-semibold font-mono transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
            >
              <span>Visit Official NIST Post-Quantum Cryptography Portal</span>
              <ExternalLink className="size-3.5" />
            </a>
          </div>
        </div>

        {/* 3 NIST Standards Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {NIST_STANDARDS_DATA.map((std) => (
            <div key={std.standard} className="cyber-card group">
              <div className="cyber-card-inner p-6 sm:p-7 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                    <span className="font-mono text-sm font-bold text-cyan-400 tabular-nums">
                      {std.standard}
                    </span>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                      Finalized FIPS
                    </span>
                  </div>

                  <div className="text-2xl font-black text-white mb-1 group-hover:text-cyan-300 transition-colors text-balance">
                    {std.algorithm}
                  </div>
                  <div className="text-xs text-slate-400 mb-5 leading-snug text-pretty">
                    {std.fullName}
                  </div>

                  <div className="space-y-3.5 text-xs">
                    <div>
                      <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                        Primary Function:
                      </span>
                      <span className="text-slate-200 font-medium">{std.primaryUse}</span>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                        Legacy Algorithms Replaced:
                      </span>
                      <span className="text-rose-300 font-mono bg-rose-950/30 px-2 py-0.5 rounded border border-rose-500/20">
                        {std.replaces}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-white/5">
                      <span className="font-mono text-[10px] text-cyan-300 uppercase tracking-wider block mb-1">
                        How Qcrypt Aligns:
                      </span>
                      <p className="text-slate-300 text-xs leading-relaxed text-pretty">
                        {std.qcryptAlignment}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="tabular-nums">Standardized Aug 2024</span>
                  <span className="text-cyan-400 flex items-center gap-1">
                    <CheckCircle2 className="size-3.5" />
                    Direct Mapping
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Clear Standards & Endorsement Disclaimer */}
        <div className="p-5 rounded-2xl bg-[#030610] border border-white/10 flex items-start gap-3.5 text-xs text-slate-400 leading-relaxed">
          <AlertCircle className="size-4 text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-pretty">
            <strong className="text-slate-300 font-medium">Regulatory &amp; Standards Note:</strong> Qcrypt’s
            remediation guides and cryptographic discovery algorithms are designed to reference and align with
            applicable NIST, ANSSI, and BSI post-quantum standards. Reference to NIST publications does not imply or
            claim that NIST or the United States Government endorses, evaluates, or certifies Qcrypt or its commercial
            software.
          </div>
        </div>
      </div>
    </section>
  );
};
