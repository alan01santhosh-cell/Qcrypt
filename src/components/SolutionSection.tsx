import { useState } from 'react';
import { Search, Database, Sliders, MapPin, CheckCircle, Sparkles, Terminal, FileCode2 } from 'lucide-react';

interface SolutionSectionProps {
  onOpenDashboard: () => void;
}

export const SolutionSection: React.FC<SolutionSectionProps> = ({ onOpenDashboard }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'Discover Cryptographic Usage',
      shortTitle: 'Discover',
      icon: Search,
      badge: 'Implemented Capability',
      badgeColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30',
      description:
        'Continuously scan supported source code repositories, lockfiles, API gateway configs, and dependency trees using AST pattern analysis to pinpoint exact cryptographic primitive calls and key sizes.',
      businessBenefit:
        'Eliminates months of manual code auditing. Security teams gain instantaneous, codebase-wide visibility into every algorithm in minutes rather than quarters.',
      technicalArtifact: 'AST Call Graph + Package Lockfile Parser (Go, Rust, TypeScript, Python, Java)',
      metrics: 'Over 140+ cryptographic primitive rules supported'
    },
    {
      step: '02',
      title: 'Inventory as a Structured CBOM',
      shortTitle: 'Inventory (CBOM)',
      icon: Database,
      badge: 'Implemented Capability',
      badgeColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30',
      description:
        'Catalog all identified cryptographic assets into an industry-standard Cryptographic Bill of Materials (CBOM) compliant with CycloneDX 1.6 and SPDX formats.',
      businessBenefit:
        'Creates an audit-ready, centralized single source of truth for cryptographic assets, fulfilling upcoming enterprise regulatory and supply-chain transparency requirements.',
      technicalArtifact: 'CycloneDX v1.6 CBOM JSON/XML Export with Cryptographic Lineage',
      metrics: 'Structured schema with keys, curves, padding & file line markers'
    },
    {
      step: '03',
      title: 'Prioritize by Quantum Risk',
      shortTitle: 'Prioritize',
      icon: Sliders,
      badge: 'Implemented Capability',
      badgeColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30',
      description:
        'Filter out noise by evaluating assets against configurable risk dimensions: Shor’s algorithm vulnerability, public network exposure, data sensitivity, and retention duration.',
      businessBenefit:
        'Prevents alert fatigue. Developers receive a prioritized backlog focused solely on highest-impact exposures, like external TLS key exchanges and long-term confidential vaults.',
      technicalArtifact: 'Risk Matrix Algorithm (HNDL Threat + Public Exposure + Algorithm Type)',
      metrics: '3-tier classification: Critical, High, Quantum-Ready'
    },
    {
      step: '04',
      title: 'Plan NIST-Aligned Migration',
      shortTitle: 'Plan (Roadmap)',
      icon: MapPin,
      badge: 'In Active Pilot / Planned Integrations',
      badgeColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-500/30',
      description:
        'Generate structured remediation guides referencing finalized NIST Post-Quantum Standards (FIPS 203 ML-KEM, FIPS 204 ML-DSA, FIPS 205 SLH-DSA) with hybrid rollout strategies.',
      businessBenefit:
        'Provides engineering teams with clear code examples, cryptographic agility patterns, and milestone-based transition roadmaps without needing in-house cryptographers.',
      technicalArtifact: 'Hybrid Cipher Configuration Snippets & Agility Architecture Guide',
      metrics: 'Direct mapping to NIST FIPS 203, 204, and 205 specifications'
    }
  ];

  const current = steps[activeStep];
  const StepIcon = current.icon;

  return (
    <section id="solution" className="relative py-24 sm:py-32 bg-[#030712] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            The Qcrypt Engine
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            From Hidden Cryptography to an Actionable Migration Plan.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Qcrypt replaces fragmented manual crypto audits with a continuous, 4-step intelligence pipeline.
            We turn opaque lines of code into a prioritized, standards-aligned roadmap your engineering teams can
            confidently execute.
          </p>
        </div>

        {/* Interactive Step Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isSelected = idx === activeStep;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 relative group ${
                  isSelected
                    ? 'bg-[#091124] border-cyan-400/60 shadow-[0_0_25px_rgba(0,240,255,0.15)] ring-1 ring-cyan-400/40'
                    : 'bg-[#060a15] border-white/10 hover:border-white/20 hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-mono text-xs font-bold ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`}>
                    STEP {s.step}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-cyan-400 text-slate-950' : 'bg-white/5 text-slate-400 group-hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {s.shortTitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Step Deep-Dive Container (Double-Bezel Architecture) */}
        <div className="double-bezel">
          <div className="double-bezel-inner p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Explanatory Content */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-sm text-cyan-400 font-bold px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30 flex items-center gap-2">
                    <StepIcon className="w-4 h-4" />
                    Step {current.step}
                  </span>
                  <span className={`text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full border ${current.badgeColor}`}>
                    {current.badge}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {current.title}
                </h3>

                <p className="text-base text-slate-300 leading-relaxed">
                  {current.description}
                </p>

                {/* Plain-Language Business Benefit Box */}
                <div className="p-4 sm:p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/25">
                  <div className="text-xs font-mono uppercase text-cyan-300 tracking-wider font-semibold mb-2 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    Direct Business Benefit
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed font-medium">
                    {current.businessBenefit}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <FileCode2 className="w-4 h-4 text-cyan-400" />
                    {current.technicalArtifact}
                  </span>
                  <span className="text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded-md border border-cyan-500/20">
                    {current.metrics}
                  </span>
                </div>
              </div>

              {/* Right Column: Visual Interactive Graphic Mockup */}
              <div className="lg:col-span-5 bg-[#030610] border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 font-mono text-xs">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    qcrypt-engine://pipeline/step-{current.step}
                  </span>
                  <span className="text-emerald-400">active</span>
                </div>

                {/* Dynamic Visual representation for each step */}
                {activeStep === 0 && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="text-slate-400">Scanning repository AST...</div>
                    <div className="p-3 rounded-xl bg-black/60 border border-cyan-500/30 text-cyan-300">
                      <code>&gt; match: crypto.GenerateKey(rsa.2048)</code>
                      <div className="text-slate-400 text-[11px] mt-1">&rarr; Detected at: internal/signer.go:42</div>
                    </div>
                    <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-slate-300">
                      <code>&gt; match: tls.Config&#123;CurvePreferences: [P256]&#125;</code>
                      <div className="text-slate-400 text-[11px] mt-1">&rarr; Detected at: gateway/proxy.go:19</div>
                    </div>
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="text-slate-400">Synthesizing CycloneDX 1.6 CBOM...</div>
                    <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-slate-300 space-y-1">
                      <div className="text-cyan-400 font-bold">&#123; "bomFormat": "CycloneDX", "specVersion": "1.6",</div>
                      <div className="pl-4 text-purple-300">"cryptographicAssets": [</div>
                      <div className="pl-8 text-amber-300">&#123; "oid": "1.2.840.113549.1.1.1", "name": "RSA",</div>
                      <div className="pl-8 text-slate-400">"quantumVulnerable": true, "keyLength": 2048 &#125;</div>
                      <div className="pl-4 text-purple-300">] &#125;</div>
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="text-slate-400">Risk Weighted Matrix Calculation...</div>
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/30">
                        <div className="text-rose-400 font-bold text-sm">Critical (Score 9.4)</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">TLS Public + RSA-2048</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/30">
                        <div className="text-amber-400 font-bold text-sm">Medium (Score 5.2)</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Internal RPC secp256r1</div>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-center">
                      <div className="text-emerald-400 font-bold text-sm">Quantum-Safe (Grover Proof)</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">AES-256 Data Vault Storage</div>
                    </div>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="text-slate-400">NIST FIPS Recommended Transition:</div>
                    <div className="p-3 rounded-xl bg-black/60 border border-cyan-400/40 text-cyan-300">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                        Target: NIST FIPS 203 (ML-KEM-768)
                      </div>
                      <div className="text-[11px] text-slate-300 mt-1">
                        Deployment mode: Hybrid X25519MLKEM768 for seamless backward compatibility.
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Interactive Preview</span>
                  <button
                    onClick={onOpenDashboard}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
                  >
                    Open Live Dashboard &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
