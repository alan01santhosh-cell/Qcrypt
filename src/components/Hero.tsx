import { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ArrowRight,
  Terminal,
  Activity,
  Play,
  RotateCcw,
  Sparkles,
  Cpu,
  ChevronRight
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
  const [selectedAlgoTab, setSelectedAlgoTab] = useState<'rsa' | 'ecc' | 'kem'>('kem');

  useEffect(() => {
    if (!isScanning) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % MOCK_TELEMETRY_FEED.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [isScanning]);

  const algoDetails = {
    rsa: {
      name: 'RSA-2048 / RSA-4096',
      status: 'Shor Vulnerable',
      statusColor: 'text-rose-400 bg-rose-950/60 border-rose-500/40',
      vector: 'Harvest-Now-Decrypt-Later (HNDL)',
      nistFix: 'NIST FIPS 203 ML-KEM-768 / ML-KEM-1024',
      codeSnippet: `// Vulnerable Legacy Call
crypto/rsa: rsa.GenerateKey(rand.Reader, 2048);
// Qcrypt Automated AST Migration Target:
crypto/fips203: mlkem768.GenerateKey();`
    },
    ecc: {
      name: 'ECDSA P-256 / Ed25519',
      status: 'Shor Vulnerable',
      statusColor: 'text-amber-400 bg-amber-950/60 border-amber-500/40',
      vector: 'Forged Digital Signatures & Auth Bypass',
      nistFix: 'NIST FIPS 204 ML-DSA-65 / ML-DSA-87',
      codeSnippet: `// Vulnerable Legacy Signature
ecdsa.Sign(rand.Reader, privKey, hash);
// Qcrypt Automated AST Migration Target:
mldsa65.Sign(privKey, message, context);`
    },
    kem: {
      name: 'X25519MLKEM768 Hybrid',
      status: 'Quantum-Resilient',
      statusColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40',
      vector: 'Dual Classical + Post-Quantum Lattice',
      nistFix: 'Aligned with NIST FIPS 203 + IETF Draft',
      codeSnippet: `// Hybrid Post-Quantum TLS 1.3 Key Exchange
tlsConfig := &tls.Config{
  CurvePreferences: []tls.CurveID{
    tls.X25519MLKEM768, // Quantum-Resistant
  },
};`
    }
  };

  const currentAlgo = algoDetails[selectedAlgoTab];

  return (
    <section className="relative pt-32 sm:pt-40 pb-20 md:pb-36 overflow-hidden bg-transparent">
      {/* Cyber Grid & Ambient Radial Occlusion */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[300px] bg-blue-600/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center z-10">
        {/* Eyebrow Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-8 shadow-[0_0_25px_rgba(0,240,255,0.2)] animate-pulse-subtle">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>PQC Migration Intelligence</span>
          <span className="text-cyan-600">/</span>
          <span className="text-slate-300 font-sans normal-case tracking-normal">NIST FIPS 203 &bull; 204 &bull; 205 Aligned</span>
        </div>

        {/* Ultra-Wide Editorial Headline (Strict 2-Line Iron Rule) */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08] sm:leading-[1.04] mb-6 text-balance">
          Find Hidden Crypto Risks.{' '}
          <span className="inline bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-500 bg-clip-text text-transparent">
            Prepare for the Quantum Era.
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-10 text-pretty">
          Qcrypt helps technology companies discover quantum-vulnerable cryptography across their code and
          dependencies, prioritize remediation by risk, and plan a structured migration toward post-quantum security.
        </p>

        {/* Value Proposition Strip */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-white/[0.035] border border-white/10 backdrop-blur-md max-w-3xl mx-auto mb-12 shadow-xl text-xs sm:text-sm text-slate-200">
          <div className="flex items-center gap-2 text-cyan-400 font-medium">
            <Sparkles className="size-4 text-cyan-400 shrink-0" aria-hidden="true" />
            <span className="text-slate-400">Core Engine:</span>
          </div>
          <span className="font-semibold text-white tracking-wide">
            Finds quantum-vulnerable crypto &bull; Ranks fixes by risk &bull; Gives a NIST-aligned migration plan
          </span>
        </div>

        {/* High-Contrast Island Button Architecture */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-20">
          {/* CTA 1: Request a Demo (Button-in-Button) */}
          <button
            type="button"
            onClick={onRequestDemo}
            className="w-full sm:w-auto group btn-island-primary relative inline-flex items-center justify-center gap-3 pl-7 pr-2.5 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-sky-400 text-slate-950 font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_45px_rgba(0,240,255,0.6)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <span>Request a Demo</span>
            <div className="btn-icon-pod size-8 rounded-full bg-slate-950/20 text-slate-950 flex items-center justify-center transition-transform duration-300">
              <ArrowRight className="size-4 stroke-[2.5]" aria-hidden="true" />
            </div>
          </button>

          {/* CTA 2: Get Early Access */}
          <button
            type="button"
            onClick={onGetEarlyAccess}
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white font-semibold text-sm border border-white/15 hover:border-cyan-400/50 backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <span>Get Early Access</span>
            <span className="text-cyan-400 text-xs px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 font-mono">
              Pilot
            </span>
          </button>

          {/* CTA 3: Explore Platform */}
          <button
            type="button"
            onClick={onExplorePlatform}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-slate-300 hover:text-white font-medium text-sm transition-all duration-300 hover:bg-white/[0.06] active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <span>Explore Platform</span>
            <ChevronRight className="size-4 opacity-60" aria-hidden="true" />
          </button>
        </div>

        {/* Animated Cyber Dashboard Showcase (Doppelrand Double-Bezel Architecture) */}
        <div className="double-bezel max-w-5xl mx-auto text-left relative group">
          <div className="double-bezel-inner p-4 sm:p-6 lg:p-8 overflow-hidden relative">
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Dashboard Window Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="size-3 rounded-full bg-rose-500/80" />
                  <span className="size-3 rounded-full bg-amber-500/80" />
                  <span className="size-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="h-4 w-px bg-white/15 mx-1" />
                <span className="font-mono text-xs text-slate-400 flex items-center gap-2">
                  <Terminal className="size-3.5 text-cyan-400" aria-hidden="true" />
                  <span>qcrypt-agent &bull; live repository AST scanner</span>
                </span>
              </div>

              {/* Status and Demo Data Badge */}
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-950/60 border border-amber-500/30 text-amber-300 font-mono text-[11px] tabular-nums">
                  <Activity className="size-3 animate-pulse motion-reduce:animate-none" aria-hidden="true" />
                  Live AST Telemetry &bull; CycloneDX 1.6
                </span>
                <button
                  type="button"
                  onClick={() => setIsScanning(!isScanning)}
                  aria-label="Toggle scan simulation"
                  className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
                  title="Toggle scan simulation"
                >
                  {isScanning ? (
                    <>
                      <RotateCcw className="size-3 text-cyan-400 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                      <span>Scanning</span>
                    </>
                  ) : (
                    <>
                      <Play className="size-3 text-cyan-400" aria-hidden="true" />
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
                  <div className="flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 pb-3 mb-3 border-b border-white/10 gap-2">
                    <span className="text-cyan-400 flex items-center gap-1.5 truncate">
                      <Cpu className="size-3.5 shrink-0" aria-hidden="true" />
                      AST Parser &amp; Cryptographic Call Tracer
                    </span>
                    <span className="text-emerald-400 tabular-nums shrink-0">18.2k SLOC Scanned</span>
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
                              ? 'bg-cyan-950/40 border-cyan-500/60 shadow-[0_0_20px_rgba(0,240,255,0.2)] translate-x-1'
                              : 'bg-white/[0.02] border-white/5 opacity-70'
                          }`}
                        >
                          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-1.5 sm:gap-2">
                            <span className="text-slate-400 text-[10px] sm:text-[11px] tabular-nums shrink-0">{item.time}</span>
                            <span className="text-cyan-300 font-semibold text-xs shrink-0">{item.service}</span>
                            <span className="text-slate-300 truncate max-w-[130px] sm:max-w-[170px] text-[11px] sm:text-xs">{item.target}</span>
                            <span
                              className={`shrink-0 px-2 py-0.5 rounded text-[9px] sm:text-[10px] uppercase font-bold tracking-wider ${
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
                          <div className="text-[11px] text-slate-300 mt-1 pl-1 break-words">
                            &rarr; {item.finding}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 font-mono">
                  <span>Target: AWS EKS prod-us-east-1</span>
                  <span className="text-cyan-400 font-semibold">CycloneDX 1.6 CBOM Stream Ready</span>
                </div>
              </div>

              {/* Right Column: Interactive Algorithm Triage & Migration Blueprint */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                {/* Metric Summary Card */}
                <div className="bg-[#040813] border border-white/10 rounded-2xl p-4 sm:p-5">
                  <div className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                      <ShieldAlert className="size-3.5" aria-hidden="true" />
                      Quantum Risk Profile
                    </span>
                    <span className="text-[10px] text-slate-400">AST Analysis</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30">
                      <div className="text-2xl font-black text-rose-400 tabular-nums">418</div>
                      <div className="text-[11px] text-slate-300 font-medium">Asymmetric Crypto Assets</div>
                      <div className="text-[10px] text-rose-400 font-mono mt-0.5">Shor’s Vulnerable</div>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                      <div className="text-2xl font-black text-emerald-400 tabular-nums">1,064</div>
                      <div className="text-[11px] text-slate-300 font-medium">Symmetric &amp; Hash Assets</div>
                      <div className="text-[10px] text-emerald-400 font-mono mt-0.5">Quantum Resistant</div>
                    </div>
                  </div>

                  {/* Interactive Algorithm Inspector Tabs */}
                  <div className="pt-3 border-t border-white/10">
                    <div className="text-xs font-mono text-slate-400 mb-2 flex items-center justify-between">
                      <span>Click to inspect AST code diff:</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 mb-3" role="tablist" aria-label="Algorithm migration code diff tabs">
                      {[
                        { id: 'kem', label: 'ML-KEM (PQC)' },
                        { id: 'rsa', label: 'RSA-2048' },
                        { id: 'ecc', label: 'ECDSA P256' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          role="tab"
                          aria-selected={selectedAlgoTab === tab.id}
                          onClick={() => setSelectedAlgoTab(tab.id as any)}
                          className={`px-2 py-1.5 rounded-lg text-[10px] font-mono border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 ${
                            selectedAlgoTab === tab.id
                              ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                              : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Active Algorithm Diff Box */}
                    <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-xs font-mono">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-white text-[11px]">{currentAlgo.name}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded border ${currentAlgo.statusColor}`}>
                          {currentAlgo.status}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 mb-2">
                        &bull; Target: <span className="text-cyan-300">{currentAlgo.nistFix}</span>
                      </div>
                      <pre className="text-[10px] text-slate-300 p-2 rounded bg-slate-950 overflow-x-auto leading-relaxed border border-white/5">
                        {currentAlgo.codeSnippet}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
