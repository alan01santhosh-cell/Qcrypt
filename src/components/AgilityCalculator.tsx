import React, { useState } from 'react';
import { Gauge, CheckCircle2, ArrowRight } from 'lucide-react';

interface Question {
  id: string;
  label: string;
  description: string;
  options: { text: string; score: number }[];
}

export const AgilityCalculator: React.FC<{ onExploreRemediation: () => void }> = ({
  onExploreRemediation
}) => {
  const questions: Question[] = [
    {
      id: 'cbom',
      label: 'Cryptographic Inventory (CBOM)',
      description: 'How do you currently track algorithms, key lengths, and certificate dependencies?',
      options: [
        { text: 'Manual spreadsheets / Ad-hoc audits', score: 5 },
        { text: 'Standard SBOM only (no crypto parameters)', score: 15 },
        { text: 'Automated CBOM (CycloneDX/SPDX) via CI/CD', score: 35 }
      ]
    },
    {
      id: 'abstraction',
      label: 'Cryptographic Abstraction Layer',
      description: 'Are crypto primitives hardcoded directly into services or abstracted via agility providers?',
      options: [
        { text: 'Hardcoded direct calls across 100+ repos', score: 5 },
        { text: 'Centralized internal crypto helper library', score: 20 },
        { text: 'Provider-abstracted crypto with runtime cipher agility', score: 35 }
      ]
    },
    {
      id: 'hybrid',
      label: 'Hybrid Post-Quantum TLS Deployment',
      description: 'Have you tested or enabled NIST hybrid key exchanges (e.g. X25519MLKEM768)?',
      options: [
        { text: 'No PQC testing yet', score: 0 },
        { text: 'Internal lab pilot / staging testing', score: 15 },
        { text: 'Hybrid PQC enabled in edge proxies/TLS', score: 30 }
      ]
    }
  ];

  const [answers, setAnswers] = useState<Record<string, number>>({
    cbom: 5,
    abstraction: 5,
    hybrid: 0
  });

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);

  const getTier = (score: number) => {
    if (score >= 75) return { label: 'Quantum Resilient', color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-500/30' };
    if (score >= 40) return { label: 'Transition In-Flight', color: 'text-cyan-400', bg: 'bg-cyan-950/40 border-cyan-500/30' };
    return { label: 'Critical Cryptographic Debt', color: 'text-rose-400', bg: 'bg-rose-950/40 border-rose-500/30' };
  };

  const tier = getTier(totalScore);

  return (
    <div className="double-bezel w-full group">
      <div className="double-bezel-inner p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Gauge className="size-4 stroke-[2]" aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">
                Cryptographic Agility Scorecard
              </h4>
              <p className="text-xs text-slate-400">
                Self-assess your infrastructure readiness against upcoming federal & enterprise mandates
              </p>
            </div>
          </div>

          <div className={`px-3 py-1 rounded-full border text-xs font-mono font-bold tabular-nums ${tier.bg} ${tier.color}`}>
            Score: {totalScore}/100 &bull; {tier.label}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Questions (Left 7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {questions.map((q) => (
              <div key={q.id} className="p-4 rounded-xl bg-black/40 border border-white/10">
                <div className="text-xs font-bold text-white mb-1">{q.label}</div>
                <div className="text-[11px] text-slate-400 mb-3">{q.description}</div>
                <div className="space-y-2">
                  {q.options.map((opt, idx) => {
                    const isSelected = answers[q.id] === opt.score;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt.score }))}
                        className={`w-full text-left px-3 py-2 rounded-lg border text-xs transition-all flex items-center justify-between gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 ${
                          isSelected
                            ? 'bg-cyan-950/60 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(0,240,255,0.1)]'
                            : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.05]'
                        }`}
                      >
                        <span className="font-mono text-[11px] truncate">{opt.text}</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded tabular-nums ${
                          isSelected ? 'bg-cyan-400 text-slate-950 font-bold' : 'text-slate-500'
                        }`}>
                          +{opt.score} pts
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Score Gauge & Action Recommendation (Right 5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#040813] border border-white/10 flex flex-col justify-between h-full">
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Evaluated Readiness Posture
              </div>

              {/* Gauge Meter Display */}
              <div className="py-6 flex flex-col items-center justify-center text-center">
                <div className="relative size-36 flex items-center justify-center">
                  <svg className="size-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="text-slate-800"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className={tier.color}
                      strokeWidth="8"
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 - (251.2 * totalScore) / 100}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black text-white tabular-nums tracking-tight">
                      {totalScore}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-mono">Index / 100</span>
                  </div>
                </div>

                <div className={`mt-3 text-sm font-bold ${tier.color}`}>
                  {tier.label}
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300 font-sans mt-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>NIST FIPS 203/204 compliance gap identified</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>CBOM automation saves ~4 months of manual discovery</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={onExploreRemediation}
                className="w-full btn-island-primary group inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold text-xs tracking-wide shadow-[0_0_20px_rgba(0,240,255,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Generate Tailored Remediation Blueprint</span>
                <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
