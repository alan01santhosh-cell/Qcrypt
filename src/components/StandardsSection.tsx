import React, { useState } from 'react';
import { NIST_STANDARDS_DATA } from '../data/mockData';
import { ExternalLink, Award, ShieldCheck, Cpu } from 'lucide-react';

export const StandardsSection: React.FC = () => {
  const [selectedStandard, setSelectedStandard] = useState<'fips203' | 'fips204' | 'fips205'>('fips203');

  const parameterTable = {
    fips203: {
      standard: 'NIST FIPS 203',
      name: 'ML-KEM (Module-Lattice Key Encapsulation)',
      levels: [
        { param: 'ML-KEM-512', category: 'NIST Level 1 (AES-128 equivalent)', pkSize: '800 bytes', ctSize: '768 bytes', primaryUse: 'Resource-constrained edge IoT' },
        { param: 'ML-KEM-768', category: 'NIST Level 3 (AES-192 equivalent)', pkSize: '1,184 bytes', ctSize: '1,088 bytes', primaryUse: 'Standard Enterprise TLS 1.3 Key Exchange (Recommended)' },
        { param: 'ML-KEM-1024', category: 'NIST Level 5 (AES-256 equivalent)', pkSize: '1,568 bytes', ctSize: '1,568 bytes', primaryUse: 'Sovereign & Long-Term Secret Confidentiality' }
      ]
    },
    fips204: {
      standard: 'NIST FIPS 204',
      name: 'ML-DSA (Module-Lattice Digital Signatures)',
      levels: [
        { param: 'ML-DSA-44', category: 'NIST Level 2', pkSize: '1,312 bytes', ctSize: '2,420 bytes', primaryUse: 'Microservice authentication & high throughput' },
        { param: 'ML-DSA-65', category: 'NIST Level 3', pkSize: '1,952 bytes', ctSize: '3,309 bytes', primaryUse: 'General Purpose Enterprise Signing (Recommended)' },
        { param: 'ML-DSA-87', category: 'NIST Level 5', pkSize: '2,592 bytes', ctSize: '4,627 bytes', primaryUse: 'Root Certificate Authority (CA) Signatures' }
      ]
    },
    fips205: {
      standard: 'NIST FIPS 205',
      name: 'SLH-DSA (Stateless Hash Digital Signatures)',
      levels: [
        { param: 'SLH-DSA-128s', category: 'NIST Level 1 (Small Signature)', pkSize: '32 bytes', ctSize: '7,856 bytes', primaryUse: 'Firmware verification & cold storage' },
        { param: 'SLH-DSA-128f', category: 'NIST Level 1 (Fast Signing)', pkSize: '32 bytes', ctSize: '17,088 bytes', primaryUse: 'Lattice-independent safety backup' },
        { param: 'SLH-DSA-256s', category: 'NIST Level 5', pkSize: '64 bytes', ctSize: '29,792 bytes', primaryUse: 'Ultra-conservative government signing' }
      ]
    }
  };

  const activeParams = parameterTable[selectedStandard];

  return (
    <section id="standards" className="relative py-28 sm:py-36 bg-[#040814]/70 backdrop-blur-[1px] border-t border-white/[0.08] scroll-mt-28 sm:scroll-mt-36">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-5">
            <Award className="size-3.5" aria-hidden="true" />
            Global Cryptographic Frameworks
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight text-balance">
            Plan Your Migration with Finalized NIST Standards.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-pretty">
            The National Institute of Standards and Technology (NIST) officially released the finalized Federal
            Information Processing Standards (FIPS) for Post-Quantum Cryptography in August 2024. Qcrypt aligns your
            code analysis, CBOM categorization, and remediation blueprints directly with these benchmarks.
          </p>

          <div className="mt-6">
            <a
              href="https://csrc.nist.gov/projects/post-quantum-cryptography"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-400 hover:text-cyan-300 border border-white/10 text-xs font-semibold font-mono transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
            >
              <span>Visit Official NIST Post-Quantum Cryptography Portal</span>
              <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* 3 NIST Standards Cards (Doppelrand Enclosures) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {NIST_STANDARDS_DATA.map((std) => (
            <div key={std.standard} className="double-bezel group">
              <div className="double-bezel-inner p-6 sm:p-7 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                    <span className="font-mono text-xs font-bold text-cyan-400 tabular-nums">
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

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-emerald-400">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="size-3.5" aria-hidden="true" />
                    <span>NIST Benchmark Aligned</span>
                  </span>
                  <span className="text-slate-400 tabular-nums">Published 2024</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive NIST Parameter Comparator */}
        <div className="double-bezel group">
          <div className="double-bezel-inner p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-white/10">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Cpu className="size-4 text-cyan-400" aria-hidden="true" />
                  NIST Parameter Specification Matrix
                </h4>
                <p className="text-xs text-slate-400">
                  Compare public key and ciphertext/signature overhead across security categories
                </p>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/50 border border-white/10 text-xs font-mono" role="tablist" aria-label="NIST FIPS parameter specifications">
                {[
                  { id: 'fips203', label: 'FIPS 203 (ML-KEM)' },
                  { id: 'fips204', label: 'FIPS 204 (ML-DSA)' },
                  { id: 'fips205', label: 'FIPS 205 (SLH-DSA)' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={selectedStandard === tab.id}
                    onClick={() => setSelectedStandard(tab.id as any)}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 ${
                      selectedStandard === tab.id
                        ? 'bg-cyan-950/80 text-cyan-300 font-bold border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[650px]">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-mono">
                    <th className="py-2.5 px-3">Parameter Set</th>
                    <th className="py-2.5 px-3">NIST Security Strength</th>
                    <th className="py-2.5 px-3">Public Key Size</th>
                    <th className="py-2.5 px-3">Ciphertext / Signature</th>
                    <th className="py-2.5 px-3">Primary Deployment Use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-sans">
                  {activeParams.levels.map((lvl, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-cyan-300">{lvl.param}</td>
                      <td className="py-3 px-3 text-slate-300 font-medium">{lvl.category}</td>
                      <td className="py-3 px-3 font-mono text-emerald-400 tabular-nums">{lvl.pkSize}</td>
                      <td className="py-3 px-3 font-mono text-amber-400 tabular-nums">{lvl.ctSize}</td>
                      <td className="py-3 px-3 text-slate-400">{lvl.primaryUse}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-slate-400 font-mono flex items-center justify-between">
              <span>*Reference: NIST SP 800-227 / FIPS 203, 204, 205 specifications.</span>
              <span className="text-cyan-400">Qcrypt automated recipes select the optimal parameter set by network throughput</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
