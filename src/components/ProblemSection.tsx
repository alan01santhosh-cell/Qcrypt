import React from 'react';
import { EyeOff, AlertOctagon, Database, ArrowRight, FileCode2 } from 'lucide-react';
import { HndlTimeline } from './HndlTimeline';

interface ProblemSectionProps {
  onLearnMore: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onLearnMore }) => {
  return (
    <section id="problem" className="relative py-28 sm:py-36 bg-[#040814]/70 backdrop-blur-[1px] border-t border-white/[0.08] scroll-mt-28 sm:scroll-mt-36">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs font-mono tracking-wider uppercase mb-5">
            <AlertOctagon className="size-3.5" aria-hidden="true" />
            The Cryptographic Blindspot
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight text-balance">
            Your Cryptography May Be Harder to See Than You Think.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-pretty">
            Preparing for quantum threats is an <strong className="text-white">immediate present-day operational reality</strong>,
            not hypothetical physics. The threat of <span className="text-cyan-300 font-semibold">&ldquo;Harvest Now, Decrypt Later&rdquo; (HNDL)</span> means
            encrypted traffic intercepted today will be decrypted the moment a cryptographically relevant quantum computer (CRQC) comes online.
          </p>
        </div>

        {/* Asymmetrical Gapless Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 grid-flow-dense items-stretch mb-12">
          {/* Card 1: Interactive HNDL Timeline (Col span 12 or 8) */}
          <div className="md:col-span-12">
            <HndlTimeline />
          </div>

          {/* Card 2: The Transitive Crypto Iceberg (Col span 7) */}
          <div className="md:col-span-7 double-bezel group">
            <div className="double-bezel-inner p-6 sm:p-8 h-full flex flex-col justify-between">
              <div>
                <div className="size-12 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-105 transition-transform duration-500">
                  <EyeOff className="size-6 stroke-[1.5]" aria-hidden="true" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 text-balance">
                  Over 70% of Cryptography Hides in Transitive Dependencies
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6 text-pretty">
                  Cryptographic primitive calls rarely sit exposed in top-level handler functions. They hide deep inside
                  transitive package dependencies, embedded firmware, compiled binary blobs, deprecated JWT signing engines,
                  and legacy TLS ciphersuites that standard SAST/SCA scanners completely overlook.
                </p>
              </div>

              {/* Real AST Code Trace Visual Mockup */}
              <div className="p-4 rounded-xl bg-black/50 border border-white/10 font-mono text-xs text-slate-300">
                <div className="flex flex-wrap items-center justify-between text-slate-400 pb-2 border-b border-white/10 mb-2 gap-2">
                  <span className="text-cyan-300 flex items-center gap-1.5">
                    <FileCode2 className="size-3.5" aria-hidden="true" />
                    AST Dependency Call Hierarchy
                  </span>
                  <span className="text-rose-400 font-bold text-[11px] px-2 py-0.5 rounded bg-rose-950/60 border border-rose-500/30">
                    Transitive Vulnerability
                  </span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="text-slate-400">
                    <span className="text-white font-semibold">service/auth-gateway</span> &rarr;
                    <span className="text-purple-300"> pkg/jwt-v2.4.0</span> &rarr;
                    <span className="text-rose-400 font-bold"> crypto/rsa-2048 (PKCS#1 v1.5)</span>
                  </div>
                  <div className="text-slate-500 pl-4 border-l border-white/10 text-[10px]">
                    &rarr; Parameter: e=65537, keySize=2048 &bull; Shor’s Vulnerability: Critical
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: The CBOM Void (Col span 5) */}
          <div className="md:col-span-5 double-bezel group">
            <div className="double-bezel-inner p-6 sm:p-8 h-full flex flex-col justify-between">
              <div>
                <div className="size-12 rounded-2xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-105 transition-transform duration-500">
                  <Database className="size-6 stroke-[1.5]" aria-hidden="true" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 text-balance">
                  The Cryptographic Bill of Materials (CBOM) Void
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6 text-pretty">
                  While security teams maintain Software Bills of Materials (SBOM), virtually no enterprise possesses an
                  automated, machine-readable <strong className="text-white">Cryptographic Bill of Materials (CBOM)</strong>.
                  Without an automated CBOM, audits take months and compliance questionnaires are answered with guesswork.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Manual CBOM Accuracy:</span>
                  <span className="text-rose-400 font-bold tabular-nums">&lt; 15% Coverage</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Qcrypt AST Automated CBOM:</span>
                  <span className="text-emerald-400 font-bold tabular-nums">100% Deterministic</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden flex mt-1">
                  <div className="h-full bg-rose-500" style={{ width: '15%' }} />
                  <div className="h-full bg-emerald-500" style={{ width: '85%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Navigation CTA */}
        <div className="text-center pt-4">
          <button
            type="button"
            onClick={onLearnMore}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-cyan-300 font-mono text-xs border border-white/10 hover:border-cyan-400/40 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <span>See how the Qcrypt Engine solves the Cryptographic Blindspot</span>
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};
