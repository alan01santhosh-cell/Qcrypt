import React, { useState } from 'react';
import { ShieldAlert, Clock } from 'lucide-react';

export const HndlTimeline: React.FC = () => {
  const [retentionYears, setRetentionYears] = useState(15);
  const [dataClassification, setDataClassification] = useState<'sovereign' | 'pii' | 'financial' | 'telecom'>('financial');

  // Mosca's theorem calculations
  // X = security shelf-life (retentionYears)
  // Y = migration time (average 4-7 years)
  // Z = estimated time to CRQC (assume 2032 = 6 years from 2026)
  const currentYear = 2026;
  const estimatedCrqcYear = 2032;
  const migrationYears = 4;
  const dataExpiryYear = currentYear + retentionYears;
  const isVulnerableToday = (retentionYears + migrationYears) > (estimatedCrqcYear - currentYear);
  const exposureWindowYears = Math.max(0, dataExpiryYear - estimatedCrqcYear);

  return (
    <div className="double-bezel w-full group">
      <div className="double-bezel-inner p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Clock className="size-4 stroke-[2]" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                Interactive HNDL Risk Exposure Calculator
              </h4>
              <p className="text-xs text-slate-400">
                Grounds Mosca's Theorem (X + Y &gt; Z) in your organization's specific data lifespan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/40 border border-rose-500/30 text-rose-300 font-mono text-xs">
            <ShieldAlert className="size-3.5" />
            <span>Retrospective Attack Vector</span>
          </div>
        </div>

        {/* Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Slider: Data Lifespan */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/10">
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="text-slate-300">Data Shelf-Life (X years)</span>
              <span className="text-cyan-400 font-bold text-sm">{retentionYears} Years</span>
            </div>
            <input
              type="range"
              min="3"
              max="30"
              value={retentionYears}
              onChange={(e) => setRetentionYears(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              aria-label="Adjust data retention years"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1.5">
              <span>3 Years (Ephemeral)</span>
              <span>15 Years (Enterprise)</span>
              <span>30 Years (Sovereign/Medical)</span>
            </div>
          </div>

          {/* Classification Selector */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
            <span className="text-xs font-mono text-slate-300 block mb-2">
              Data Sensitivity Category
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'financial', label: 'Financial Records', defaultYears: 10 },
                { id: 'pii', label: 'Healthcare & PII', defaultYears: 20 },
                { id: 'sovereign', label: 'Defense & State', defaultYears: 30 },
                { id: 'telecom', label: 'Session Keys/TLS', defaultYears: 5 }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setDataClassification(cat.id as any);
                    setRetentionYears(cat.defaultYears);
                  }}
                  className={`px-2.5 py-1.5 rounded-lg border text-left transition-colors font-mono text-[11px] ${
                    dataClassification === cat.id
                      ? 'bg-cyan-950/70 border-cyan-400 text-cyan-200'
                      : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Visual Timeline Graphic */}
        <div className="p-5 rounded-2xl bg-[#040813] border border-white/10 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-xs font-mono">
            <span className="text-slate-400">Timeline Projection ({currentYear} &rarr; {dataExpiryYear})</span>
            <span className={`px-2 py-0.5 rounded font-bold ${
              isVulnerableToday
                ? 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
                : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
            }`}>
              {isVulnerableToday ? 'ACTIVE THREAT: DATA EXPOSED TO HNDL' : 'LOW IMMEDIATE THREAT'}
            </span>
          </div>

          {/* Bar Diagram */}
          <div className="relative pt-6 pb-2">
            {/* Timeline track */}
            <div className="h-3 w-full bg-slate-900 rounded-full relative overflow-hidden flex">
              {/* Safe phase */}
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-rose-500 relative"
                style={{ width: `${Math.min(100, ((estimatedCrqcYear - currentYear) / retentionYears) * 100)}%` }}
                title="Harvest Window"
              />
              {/* Exposed phase */}
              <div
                className="h-full bg-rose-600 animate-pulse"
                style={{ width: `${Math.max(0, 100 - ((estimatedCrqcYear - currentYear) / retentionYears) * 100)}%` }}
                title="Decrypted Post-CRQC"
              />
            </div>

            {/* Milestones markers */}
            <div className="flex justify-between items-center text-[11px] font-mono mt-3">
              <div className="text-left">
                <span className="block text-amber-400 font-bold">{currentYear} (Today)</span>
                <span className="text-slate-500 text-[10px]">Ciphertext Harvested</span>
              </div>
              <div className="text-center px-2 py-0.5 rounded bg-rose-950/60 border border-rose-500/40">
                <span className="block text-rose-300 font-bold">~{estimatedCrqcYear} (CRQC Arrival)</span>
                <span className="text-rose-400 text-[10px]">Shor's Algorithm Feasible</span>
              </div>
              <div className="text-right">
                <span className="block text-cyan-400 font-bold">{dataExpiryYear}</span>
                <span className="text-slate-500 text-[10px]">Data Shelf-Life Ends</span>
              </div>
            </div>
          </div>

          {/* Risk Summary Statement */}
          <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="text-slate-300 text-pretty">
              If an adversary intercepts your encrypted traffic today, it will remain decryptable for{' '}
              <strong className="text-rose-400 font-mono text-sm underline">{exposureWindowYears} years</strong> before its legal confidentiality expires.
            </div>
            <div className="text-cyan-400 font-mono text-[11px] shrink-0">
              Qcrypt AST discovery flags this key exchange as Critical (Rank 1).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
