import { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ArrowRight,
  Terminal,
  Activity,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
  Lock,
  Cpu,
  Layers
} from 'lucide-react';
import { MOCK_TELEMETRY_FEED } from '../data/mockData';

interface HeroProps {
  onRequestDemo: () => void;
  onGetEarlyAccess: () => void;
  onExplorePlatform: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onRequestDemo,
  onGetEarlyAccess,
  onExplorePlatform,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    if (!isScanning) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % MOCK_TELEMETRY_FEED.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [isScanning]);

  return (
    <section className="relative pt-32 sm:pt-40 pb-20 md:pb-32 overflow-hidden bg-radial-gradient">
      {/* Background cyber grid & glow effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[250px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Eyebrow Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-400/30 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-8 shadow-[0_0_20px_rgba(0,240,255,0.15)] animate-pulse-subtle">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>PQC Migration Intelligence Platform</span>
          <span className="text-cyan-600">/</span>
          <span className="text-slate-400 font-sans normal-case tracking-normal">NIST FIPS 203 &bull; 204 &bull; 205 Aligned</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.08] mb-6">
          Find Hidden Crypto Risks.{' '}
          <span className="block mt-1 bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
            Prepare for the Quantum Era.
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-8">
          Qcrypt helps technology companies discover quantum-vulnerable cryptography across their code and
          dependencies, prioritize remediation by risk, and plan a structured migration toward post-quantum security.
        </p>

        {/* Prominent Unique Value Proposition Banner */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md max-w-3xl mx-auto mb-10 shadow-lg text-xs sm:text-sm text-slate-200">
          <div className="flex items-center gap-2 text-cyan-400 font-medium">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-slate-400">Core Value:</span>
          </div>
          <span className="font-semibold text-white tracking-wide">
            Finds quantum-vulnerable crypto &bull; Ranks fixes by risk &bull; Gives a NIST-aligned migration plan
          </span>
        </div>

        {/* 3 Prominent Calls to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-16">
          {/* CTA 1: Request a Demo */}
          <button
            onClick={onRequestDemo}
            className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-sky-400 text-slate-950 font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)] active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
          >
            <span>Request a Demo</span>
            <div className="w-7 h-7 rounded-full bg-slate-950/20 text-slate-950 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </button>

          {/* CTA 2: Get Early Access */}
          <button
            onClick={onGetEarlyAccess}
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white font-semibold text-sm border border-white/15 hover:border-cyan-400/50 backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
          >
            <span>Get Early Access</span>
            <span className="text-cyan-400 text-xs px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 font-mono">
              Pilot
            </span>
          </button>

          {/* CTA 3: Explore the Platform */}
          <button
            onClick={onExplorePlatform}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-slate-300 hover:text-white font-medium text-sm transition-colors duration-200 hover:bg-white/5"
          >
            <span>Explore the Platform</span>
            <ArrowRight className="w-4 h-4 opacity-60" />
          </button>
        </div>

        {/* Animated Cyber Dashboard Showcase (Double-Bezel Architecture) */}
        <div className="double-bezel max-w-5xl mx-auto text-left relative group">
          <div className="double-bezel-inner p-4 sm:p-6 lg:p-8 overflow-hidden relative">
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Dashboard Window Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="h-4 w-px bg-white/15 mx-1" />
                <span className="font-mono text-xs text-slate-400 flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>qcrypt-agent &bull; live inspection</span>
                </span>
              </div>

              {/* Status and Demo Data Badge */}
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-950/60 border border-amber-500/30 text-amber-300 font-mono text-[11px]">
                  <Activity className="w-3 h-3 animate-pulse" />
                  Demo Data &bull; Simulated Engine
                </span>
                <button
                  onClick={() => setIsScanning(!isScanning)}
                  className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                  title="Toggle scan simulation"
                >
                  {isScanning ? (
                    <>
                      <RotateCcw className="w-3 h-3 text-cyan-400 animate-spin" />
                      <span>Scanning</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-cyan-400" />
                      <span>Resume</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Telemetry Visual Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Column: Live Scanning Console */}
              <div className="lg:col-span-7 bg-[#040813] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-3 mb-3 border-b border-white/10">
                    <span className="text-cyan-400 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" />
                      Repository AST & Dependency Inspector
                    </span>
                    <span className="text-emerald-400">active scan 18.2k SLOC</span>
                  </div>

                  {/* Scanning Log Stream */}
                  <div className="space-y-2.5 font-mono text-xs">
                    {MOCK_TELEMETRY_FEED.map((item, idx) => {
                      const isCurrent = idx === activeStepIndex;
                      return (
                        <div
                          key={idx}
                          className={`p-2.5 rounded-xl border transition-all duration-300 ${
                            isCurrent
                              ? 'bg-cyan-950/30 border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.15)] translate-x-1'
                              : 'bg-white/[0.02] border-white/5 opacity-70'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-slate-400 text-[11px]">{item.time}</span>
                            <span className="text-cyan-300 font-semibold">{item.service}</span>
                            <span className="text-slate-300 truncate max-w-[150px]">{item.target}</span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                                item.status === 'Vulnerable'
                                  ? 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
                                  : item.status === 'HNDL Risk'
                                  ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                                  : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-300 mt-1 pl-1">
                            &rarr; {item.finding}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Target: AWS EKS prod-us-east-1</span>
                  <span className="text-cyan-400">CBOM CycloneDX v1.6 ready</span>
                </div>
              </div>

              {/* Right Column: Risk Indicators & Migration Roadmap */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                {/* Metric Summary Card */}
                <div className="bg-[#040813] border border-white/10 rounded-2xl p-4 sm:p-5">
                  <div className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-3 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                    Quantum Risk Profile
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30">
                      <div className="text-2xl font-black text-rose-400">418</div>
                      <div className="text-[11px] text-slate-300 font-medium">Asymmetric Crypto Assets</div>
                      <div className="text-[10px] text-rose-400 font-mono mt-0.5">Shor's Vulnerable</div>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                      <div className="text-2xl font-black text-emerald-400">1,064</div>
                      <div className="text-[11px] text-slate-300 font-medium">Symmetric & Hash Assets</div>
                      <div className="text-[10px] text-emerald-400 font-mono mt-0.5">Quantum Resistant</div>
                    </div>
                  </div>

                  {/* Risk Breakdown Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Migration Agility Readiness</span>
                      <span className="text-cyan-400 font-semibold">28% Ready</span>
                    </div>
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden flex">
                      <div className="h-full bg-emerald-500" style={{ width: '28%' }} title="Post-Quantum Ready" />
                      <div className="h-full bg-amber-500" style={{ width: '22%' }} title="In Progress" />
                      <div className="h-full bg-rose-500" style={{ width: '50%' }} title="Vulnerable Asymmetric" />
                    </div>
                  </div>
                </div>

                {/* NIST Migration Roadmap Milestone */}
                <div className="bg-[#040813] border border-white/10 rounded-2xl p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-cyan-400" />
                      NIST Aligned Remediation Path
                    </div>
                    <div className="space-y-2 mt-3">
                      <div className="flex items-center gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>FIPS 203 (ML-KEM): Session key exchange hybrid mode</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-slate-300">
                        <div className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin shrink-0" />
                        <span className="text-cyan-200 font-medium">FIPS 204 (ML-DSA): Identity & JWT signers</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-slate-400">
                        <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
                        <span>FIPS 205 (SLH-DSA): Supply chain & firmware certs</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Roadmap Phase 1 of 4</span>
                    <button
                      onClick={onExplorePlatform}
                      className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                    >
                      View Live CBOM &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Disclaimer */}
            <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                Zero code leaves your boundary &bull; Local CLI AST analyzer or Air-Gapped deployment
              </span>
              <span className="font-mono text-slate-400">
                Demonstration mode &bull; Non-operational scanner interface
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
