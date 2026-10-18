import React, { useState } from 'react';
import { Search, Database, Sliders, MapPin, CheckCircle, Sparkles, Terminal, Copy, Check, ArrowRight } from 'lucide-react';

interface SolutionSectionProps {
  onOpenDashboard: () => void;
}

export const SolutionSection: React.FC<SolutionSectionProps> = ({ onOpenDashboard }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);

  const steps = [
    {
      step: '01',
      title: 'Discover Cryptographic Usage',
      shortTitle: 'Discover',
      icon: Search,
      badge: 'Automated AST Engine',
      badgeColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-500/30',
      description:
        'Continuously scan supported source code repositories, lockfiles, API gateway configs, and dependency trees using AST pattern analysis to pinpoint exact cryptographic primitive calls, curves, and key sizes.',
      businessBenefit:
        'Eliminates months of manual code auditing. Security teams gain instantaneous, codebase-wide visibility into every algorithm in minutes rather than quarters.',
      codeSample: `// Qcrypt AST Scanner Output: auth-service/crypto.go
{
  "file": "src/auth/jwt_signer.go",
  "line": 142,
  "caller": "jwt.NewWithClaims()",
  "primitive": "RSA-2048 (PKCS#1 v1.5)",
  "shor_vulnerable": true,
  "hndl_risk": "CRITICAL",
  "recommended_pqc": "NIST FIPS 204 (ML-DSA-65)"
}`,
      metrics: 'Over 140+ cryptographic primitive rules supported across Go, Rust, TS, Python, Java'
    },
    {
      step: '02',
      title: 'Inventory as a Structured CBOM',
      shortTitle: 'Inventory (CBOM)',
      icon: Database,
      badge: 'CycloneDX 1.6 Compliant',
      badgeColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30',
      description:
        'Catalog all identified cryptographic assets into an industry-standard Cryptographic Bill of Materials (CBOM) compliant with CycloneDX 1.6 and SPDX specifications.',
      businessBenefit:
        'Creates an audit-ready, centralized single source of truth for cryptographic assets, fulfilling upcoming enterprise regulatory and supply-chain transparency requirements.',
      codeSample: `// CycloneDX 1.6 CBOM Schema Output
{
  "bomFormat": "CycloneDX",
  "specVersion": "1.6",
  "cryptographicAssets": [
    {
      "id": "CRY-101",
      "name": "TLS Edge Termination Key",
      "type": "key-exchange",
      "algorithm": "ECDH-X25519",
      "nistReplacement": "X25519MLKEM768 (Hybrid)"
    }
  ]
}`,
      metrics: 'Standardized schema with keys, curves, padding, protocol version & line markers'
    },
    {
      step: '03',
      title: 'Prioritize by Quantum Risk',
      shortTitle: 'Prioritize',
      icon: Sliders,
      badge: 'Multi-Factor Triage',
      badgeColor: 'text-amber-400 bg-amber-950/60 border-amber-500/30',
      description:
        'Filter out noise by evaluating assets against configurable risk dimensions: Shor’s algorithm vulnerability, public network exposure, data sensitivity, and retention duration.',
      businessBenefit:
        'Prevents alert fatigue. Developers receive a prioritized backlog focused solely on highest-impact exposures, like external TLS key exchanges and long-term confidential vaults.',
      codeSample: `// Multi-Factor Risk Scoring Algorithm
function computeQuantumRisk(asset: CryptoAsset): RiskScore {
  const shorWeight = asset.isAsymmetric ? 0.45 : 0.05;
  const exposureWeight = asset.isPublicInternet ? 0.35 : 0.10;
  const lifespanWeight = (asset.retentionYears > 10) ? 0.20 : 0.05;
  
  return calculatePriority(shorWeight + exposureWeight + lifespanWeight);
  // Yields: CRITICAL (Rank 1 - Immediate Sprint Remediation)
}`,
      metrics: '3-tier classification: Critical HNDL, High Exposure, Quantum-Ready'
    },
    {
      step: '04',
      title: 'Plan NIST-Aligned Migration',
      shortTitle: 'Plan (Roadmap)',
      icon: MapPin,
      badge: 'NIST Standards Aligned',
      badgeColor: 'text-indigo-400 bg-indigo-950/60 border-indigo-500/30',
      description:
        'Generate structured remediation guides referencing finalized NIST Post-Quantum Standards (FIPS 203 ML-KEM, FIPS 204 ML-DSA, FIPS 205 SLH-DSA) with backward-compatible hybrid recipes.',
      businessBenefit:
        'Provides engineering teams with clear code examples, cryptographic agility patterns, and milestone-based transition roadmaps without needing in-house cryptographers.',
      codeSample: `// Backward-Compatible Hybrid Post-Quantum TLS 1.3 Recipe
// Target: NIST FIPS 203 ML-KEM-768
cfg := &tls.Config{
    MinVersion: tls.VersionTLS13,
    CurvePreferences: []tls.CurveID{
        tls.X25519MLKEM768, // Primary Hybrid Post-Quantum
        tls.X25519,         // Classical Fallback
    },
};`,
      metrics: 'Direct mapping to NIST FIPS 203, 204, and 205 specifications'
    }
  ];

  const current = steps[activeStep];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.codeSample);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="solution" className="relative py-28 sm:py-36 bg-[#030712]/70 backdrop-blur-[1px] border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-5">
            <Sparkles className="size-3.5" />
            The Qcrypt Engine
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight text-balance">
            From Hidden Cryptography to an Actionable Migration Plan.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-pretty">
            Qcrypt replaces fragmented manual crypto audits with a continuous, 4-step intelligence pipeline.
            We turn opaque lines of code into a prioritized, standards-aligned roadmap your engineering teams can
            confidently execute.
          </p>
        </div>

        {/* Step Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isSelected = idx === activeStep;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(idx)}
                className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.15)] -translate-y-0.5'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-xs font-bold ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`}>
                    STEP {s.step}
                  </span>
                  <Icon className={`size-4 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                </div>
                <div className="text-sm font-bold text-white truncate">
                  {s.shortTitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase (Doppelrand Double-Bezel Enclosure) */}
        <div className="double-bezel group mb-12">
          <div className="double-bezel-inner p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Column: Stage Narrative (6 cols) */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-mono border font-semibold ${current.badgeColor}`}>
                      {current.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-400">Step {current.step} of 04</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 text-balance">
                    {current.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 text-pretty">
                    {current.description}
                  </p>

                  <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 mb-6">
                    <div className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold mb-1">
                      Business &amp; Operational Benefit:
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {current.businessBenefit}
                    </p>
                  </div>
                </div>

                <div className="text-xs font-mono text-slate-400 pt-4 border-t border-white/10 flex items-center gap-2">
                  <CheckCircle className="size-4 text-emerald-400 shrink-0" />
                  <span>{current.metrics}</span>
                </div>
              </div>

              {/* Right Column: Code & Configuration Inspector (6 cols) */}
              <div className="lg:col-span-6 bg-[#040813] border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs font-mono">
                    <span className="text-cyan-400 flex items-center gap-1.5">
                      <Terminal className="size-3.5" />
                      Qcrypt Intelligence Artifact
                    </span>
                    <button
                      onClick={handleCopy}
                      className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="size-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-3 text-slate-400" />
                          <span>Copy Snippet</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="p-3.5 rounded-xl bg-black/60 border border-white/5 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
                    <code>{current.codeSample}</code>
                  </pre>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={onOpenDashboard}
                    className="group inline-flex items-center gap-2 text-xs font-bold font-mono text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    <span>Inspect Live in Interactive CBOM Sandbox</span>
                    <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
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
