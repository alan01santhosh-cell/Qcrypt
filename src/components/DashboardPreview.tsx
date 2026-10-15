import { useState, useMemo, Fragment } from 'react';
import { MOCK_CBOM_ITEMS } from '../data/mockData';
import {
  Search,
  Filter,
  Download,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Cpu,
  Info,
  X
} from 'lucide-react';

export const DashboardPreview: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRisk, setSelectedRisk] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>('CRY-101');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Filtered Items
  const filteredItems = useMemo(() => {
    return MOCK_CBOM_ITEMS.filter((item) => {
      const matchesSearch =
        item.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.algorithm.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      const matchesRisk =
        selectedRisk === 'All' ||
        (selectedRisk === 'Vulnerable' && item.quantumVulnerable) ||
        (selectedRisk === 'Quantum-Ready' && !item.quantumVulnerable) ||
        item.riskScore === selectedRisk;

      return matchesSearch && matchesCategory && matchesRisk;
    });
  }, [searchQuery, selectedCategory, selectedRisk]);

  // Export CBOM JSON file handler
  const handleDownloadCbom = () => {
    const cbomData = {
      $schema: 'http://cyclonedx.org/schema/bom-1.6.schema.json',
      bomFormat: 'CycloneDX',
      specVersion: '1.6',
      serialNumber: 'urn:uuid:7b941d24-3f0e-43f1-b99b-4028f86d1cb8',
      version: 1,
      metadata: {
        timestamp: new Date().toISOString(),
        tools: [{ vendor: 'Qcrypt Intelligence', name: 'qcrypt-cli', version: '0.9.4-pilot' }],
        component: { name: 'Acme Enterprise Monorepo', type: 'application', version: '2026.10' }
      },
      cryptographicAssets: MOCK_CBOM_ITEMS.map((item) => ({
        id: item.id,
        name: item.assetName,
        type: item.category,
        algorithm: item.algorithm,
        keyLength: item.keySize,
        quantumVulnerable: item.quantumVulnerable,
        riskClassification: item.riskScore,
        location: item.location,
        nistRecommendedTarget: item.nistReplacement
      }))
    };

    const blob = new Blob([JSON.stringify(cbomData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qcrypt-cbom-cyclonedx-demo-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setExportNotice('Downloaded CycloneDX 1.6 CBOM demo file successfully.');
    setTimeout(() => setExportNotice(null), 4000);
  };

  return (
    <section id="dashboard-preview" className="relative py-24 sm:py-32 bg-[#030712] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-4">
              <Cpu className="w-3.5 h-3.5" />
              Interactive Product Console
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              Product Dashboard Preview
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Explore how security and engineering teams investigate cryptographic findings, track dependency risk,
              and manage NIST-aligned migration roadmaps.
            </p>
          </div>

          {/* Sample Data & Disclaimer Notice */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0 text-amber-400" />
              <span>Simulated Demo Data &bull; Real scanning engine in private pilot</span>
            </div>
            <button
              onClick={handleDownloadCbom}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-xs font-semibold font-mono transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CBOM (.json)
            </button>
          </div>
        </div>

        {exportNotice && (
          <div className="mb-6 p-3 rounded-xl bg-cyan-950/70 border border-cyan-400/50 text-cyan-200 text-xs font-mono flex items-center justify-between">
            <span>&check; {exportNotice}</span>
            <button onClick={() => setExportNotice(null)} className="text-cyan-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Dashboard Shell with Double-Bezel Framing */}
        <div className="double-bezel">
          <div className="double-bezel-inner p-4 sm:p-6 lg:p-8">
            {/* Top Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-[#030611] border border-white/10">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Discovered Crypto Assets
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">1,482</div>
                <div className="text-[11px] text-slate-400 mt-1 font-mono">Across 42 microservices</div>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30">
                <div className="text-xs font-mono text-rose-300 uppercase tracking-wider mb-1">
                  Quantum-Vulnerable
                </div>
                <div className="text-2xl sm:text-3xl font-black text-rose-400">418</div>
                <div className="text-[11px] text-rose-300/80 mt-1 font-mono">RSA &amp; ECC Asymmetric ciphers</div>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30">
                <div className="text-xs font-mono text-amber-300 uppercase tracking-wider mb-1">
                  High Priority HNDL
                </div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400">19</div>
                <div className="text-[11px] text-amber-300/80 mt-1 font-mono">Public TLS &amp; Long-life Vaults</div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                <div className="text-xs font-mono text-emerald-300 uppercase tracking-wider mb-1">
                  Quantum-Resistant
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">1,064</div>
                <div className="text-[11px] text-emerald-300/80 mt-1 font-mono">AES-256 &amp; SHA-2/3 primitives</div>
              </div>
            </div>

            {/* Controls Bar: Search, Category Filter, Risk Filter */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-2xl bg-[#040814] border border-white/10 mb-6">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter by asset name, algorithm (e.g. RSA, secp256r1, AES), or file path..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-black/50 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/70"
                />
              </div>

              {/* Category & Risk Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-400"
                >
                  <option value="All">All Categories</option>
                  <option value="Key Exchange">Key Exchange</option>
                  <option value="Digital Signature">Digital Signature</option>
                  <option value="Symmetric Encryption">Symmetric Encryption</option>
                  <option value="TLS Configuration">TLS Configuration</option>
                  <option value="Hashing">Hashing</option>
                </select>

                <span className="text-xs font-mono text-slate-400 ml-1 mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" />
                  Risk:
                </span>
                {['All', 'Vulnerable', 'Critical', 'Quantum-Ready'].map((risk) => (
                  <button
                    key={risk}
                    onClick={() => setSelectedRisk(risk)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                      selectedRisk === risk
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300'
                    }`}
                  >
                    {risk}
                  </button>
                ))}
              </div>
            </div>

            {/* CBOM Inventory Table */}
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#030611]">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 text-[11px] uppercase tracking-wider">
                    <th className="py-3.5 px-4 font-semibold">Asset ID &amp; Target</th>
                    <th className="py-3.5 px-4 font-semibold">Category</th>
                    <th className="py-3.5 px-4 font-semibold">Algorithm &amp; Key Size</th>
                    <th className="py-3.5 px-4 font-semibold">Quantum Risk</th>
                    <th className="py-3.5 px-4 font-semibold">NIST Replacement Target</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {filteredItems.map((item) => {
                    const isExpanded = expandedId === item.id;
                    return (
                      <Fragment key={item.id}>
                        <tr
                          onClick={() => setExpandedId(isExpanded ? null : item.id)}
                          className={`hover:bg-cyan-950/20 cursor-pointer transition-colors ${
                            isExpanded ? 'bg-cyan-950/30' : ''
                          }`}
                        >
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-white flex items-center gap-2">
                              <span className="text-cyan-400">{item.id}</span>
                              <span className="font-sans text-xs text-slate-200">{item.assetName}</span>
                            </div>
                            <div className="text-[10px] text-slate-400 truncate max-w-xs mt-0.5">
                              {item.location}
                            </div>
                          </td>

                          <td className="py-3.5 px-4 text-slate-300">
                            {item.category}
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="text-white font-semibold">{item.algorithm}</span>
                            <span className="text-slate-400 ml-1.5 text-[11px]">({item.keySize})</span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider ${
                                item.riskScore === 'Critical'
                                  ? 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
                                  : item.riskScore === 'High'
                                  ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                                  : item.riskScore === 'Medium'
                                  ? 'bg-yellow-950/70 text-yellow-300 border border-yellow-500/30'
                                  : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                              }`}
                            >
                              {item.quantumVulnerable ? (
                                <AlertTriangle className="w-3 h-3 text-rose-400" />
                              ) : (
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              )}
                              {item.riskScore}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-slate-300">
                            <span className="text-cyan-300 font-semibold">{item.nistReplacement}</span>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedId(isExpanded ? null : item.id);
                              }}
                              className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white"
                              aria-label="Toggle details"
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </td>
                        </tr>

                        {/* Expandable Remediation Drawer */}
                        {isExpanded && (
                          <tr className="bg-[#02050e] border-b border-cyan-500/20">
                            <td colSpan={6} className="p-4 sm:p-6">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                                <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                                  <div className="font-mono text-[11px] text-cyan-400 uppercase tracking-wider mb-1">
                                    Dependency Origin &amp; Call Site
                                  </div>
                                  <div className="text-white font-medium mb-1">{item.dependency}</div>
                                  <div className="font-mono text-slate-400 text-[11px] break-all">
                                    {item.location}
                                  </div>
                                </div>

                                <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                                  <div className="font-mono text-[11px] text-amber-400 uppercase tracking-wider mb-1">
                                    Quantum Threat Analysis
                                  </div>
                                  <div className="text-slate-300 text-xs leading-relaxed">
                                    {item.quantumVulnerable
                                      ? `Vulnerable to Shor's algorithm polynomial time discrete logarithm / integer factorization. Poses immediate risk for long-term encrypted records.`
                                      : `Symmetric cipher / hash primitive provides adequate quantum security margin against Grover's speedup algorithm.`}
                                  </div>
                                </div>

                                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30">
                                  <div className="font-mono text-[11px] text-cyan-300 uppercase tracking-wider mb-1 font-semibold">
                                    Recommended Remediation Action
                                  </div>
                                  <div className="text-slate-200 text-xs leading-relaxed font-medium mb-2">
                                    {item.recommendedAction}
                                  </div>
                                  <div className="font-mono text-[10px] text-cyan-400 flex items-center gap-1">
                                    <span>Target: {item.nistReplacement}</span>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>

              {filteredItems.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                  No cryptographic assets matched your search filters.
                </div>
              )}
            </div>

            {/* Dashboard Footer Action Bar */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span>Showing {filteredItems.length} of {MOCK_CBOM_ITEMS.length} demo assets</span>
                <span>&bull;</span>
                <span className="text-cyan-400">CycloneDX 1.6 Compliant</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsExportModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-white/10 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  View Audit Report Summary
                </button>
                <button
                  onClick={handleDownloadCbom}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download CycloneDX CBOM (.json)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Report Summary Modal */}
        {isExportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative max-w-2xl w-full rounded-3xl bg-[#060b17] border border-white/20 p-6 sm:p-8 shadow-2xl text-left">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    Audit-Ready PQC Executive Summary
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">
                    Document ID: QC-2026-DEMO-AUDIT &bull; Generated from CBOM v1.6
                  </p>
                </div>
                <button
                  onClick={() => setIsExportModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs text-slate-300 font-sans leading-relaxed">
                <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30">
                  <span className="font-semibold text-white">Posture Overview:</span> Evaluated 1,482 cryptographic
                  assets across sample repository artifacts. Identified 418 asymmetric primitives vulnerable to Shor’s
                  algorithm, including 19 critical external TLS and auth endpoints requiring priority migration.
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                    <div className="font-mono text-slate-400 uppercase text-[10px]">Asymmetric Exposure</div>
                    <div className="text-base font-bold text-rose-400 mt-0.5">RSA-2048 &amp; ECDSA (256-bit)</div>
                    <div className="text-[11px] text-slate-400 mt-1">High HNDL risk on session exchange</div>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                    <div className="font-mono text-slate-400 uppercase text-[10px]">Target Standard</div>
                    <div className="text-base font-bold text-cyan-400 mt-0.5">NIST FIPS 203 / 204</div>
                    <div className="text-[11px] text-slate-400 mt-1">Staged Hybrid Rollout recommended</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 font-mono text-[11px] text-slate-400">
                  <strong>Disclaimer:</strong> This executive summary is generated from illustrative demo data for
                  product evaluation purposes. Production deployment requires connecting the Qcrypt AST analyzer to your
                  enterprise repositories.
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  onClick={() => setIsExportModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleDownloadCbom();
                    setIsExportModalOpen(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  Download CBOM JSON
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
