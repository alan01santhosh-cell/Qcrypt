import { EyeOff, AlertOctagon, Database, ShieldAlert, Clock } from 'lucide-react';

interface ProblemSectionProps {
  onLearnMore: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onLearnMore }) => {
  return (
    <section id="problem" className="relative py-24 sm:py-32 bg-[#050814] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Eyebrow and Headline */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs font-mono tracking-wider uppercase mb-4">
            <AlertOctagon className="w-3.5 h-3.5" />
            The Cryptographic Blindspot
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Your Cryptography May Be Harder to See Than You Think.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Preparing for quantum threats is a <strong className="text-white">present-day planning challenge</strong>,
            not science fiction. While a cryptographically relevant quantum computer (CRQC) does not exist today, the
            operational reality of <span className="text-cyan-300 font-semibold">"Harvest Now, Decrypt Later" (HNDL)</span> and
            the years required to modernize legacy codebases make immediate visibility essential.
          </p>
        </div>

        {/* Asymmetrical Bento Grid (Taste Skill directive: break visual monotony with unequal spans) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Cryptographic Visibility (col-span-7) */}
          <div className="md:col-span-7 double-bezel group">
            <div className="double-bezel-inner p-6 sm:p-8 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-105 transition-transform">
                  <EyeOff className="w-6 h-6 stroke-[1.75]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Hidden Crypto in Code &amp; Deep Dependencies
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Over 70% of cryptographic calls don’t live in your primary service code—they hide inside third-party
                  libraries, transitive package dependencies, deprecated SDKs, embedded firmware, and hardcoded TLS configurations.
                  Standard static application security testing (SAST) tools flag generic bugs, but fail to identify cryptographic
                  primitive parameters, key sizes, or elliptic curve choices.
                </p>
              </div>

              {/* Visual Artifact Mockup */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-slate-300">
                <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-white/5 mb-2">
                  <span>transitive_lockfile_trace.json</span>
                  <span className="text-rose-400 font-semibold">Hidden Vulnerability</span>
                </div>
                <div className="text-slate-400">
                  <span className="text-purple-400">auth-service</span> &rarr; jwt-engine v2.1 &rarr;{' '}
                  <span className="text-rose-400 font-bold">crypto/rsa-2048</span> (Deprecated)
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Centralized CBOM Absence (col-span-5) */}
          <div className="md:col-span-5 double-bezel group">
            <div className="double-bezel-inner p-6 sm:p-8 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-105 transition-transform">
                  <Database className="w-6 h-6 stroke-[1.75]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Absence of a Centralized Cryptographic Inventory
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Most organizations have Software Bills of Materials (SBOM), but zero centralized visibility into their
                  <strong className="text-white"> Cryptographic Bill of Materials (CBOM)</strong>. Without an automated inventory,
                  security leaders cannot answer simple compliance or audit questions: which algorithms are running, where keys are
                  stored, and what algorithms are quantum-vulnerable.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">CBOM Coverage:</span>
                <span className="text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                  0% Automated Today
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Prioritization Paralysis (col-span-5) */}
          <div className="md:col-span-5 double-bezel group">
            <div className="double-bezel-inner p-6 sm:p-8 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-105 transition-transform">
                  <ShieldAlert className="w-6 h-6 stroke-[1.75]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Finding Paralysis vs. Actionable Risk
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  A blind grep reveals thousands of cryptographic references across enterprise repositories. Engineering
                  teams cannot and should not attempt to rewrite everything simultaneously. Security architects need
                  risk-weighted scoring that considers algorithm weakness, data exposure, and external network reachability.
                </p>
              </div>

              <div className="flex gap-2">
                <span className="text-xs px-2.5 py-1 rounded-md bg-rose-950/50 text-rose-300 border border-rose-500/30 font-mono">
                  Shor's Vulnerable: High
                </span>
                <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-950/50 text-emerald-300 border border-emerald-500/30 font-mono">
                  Symmetric: Safe
                </span>
              </div>
            </div>
          </div>

          {/* Card 4: Long-Term Data Security & Migration Complexity (col-span-7) */}
          <div className="md:col-span-7 double-bezel group">
            <div className="double-bezel-inner p-6 sm:p-8 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-105 transition-transform">
                  <Clock className="w-6 h-6 stroke-[1.75]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Long-Lived Data &amp; Multi-Year Migration Complexity
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  Financial transactions, confidential medical data, trade secrets, and government communications must
                  remain secure for <strong className="text-white">10 to 30 years</strong>. Adversaries can capture encrypted
                  traffic today and store it until decryption becomes viable.
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Migrating an enterprise infrastructure from RSA and elliptic curves to post-quantum algorithms like ML-KEM
                  and ML-DSA will take an estimated 3 to 7 years across protocols, hardware, and client applications. Early
                  planning is the only defence against costly emergency refactors.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400">Mosca's Theorem: If D + M &gt; Q, you are already vulnerable</span>
                <button
                  onClick={onLearnMore}
                  className="text-xs text-slate-300 hover:text-white font-medium flex items-center gap-1.5 transition-colors"
                >
                  Explore Solution &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
