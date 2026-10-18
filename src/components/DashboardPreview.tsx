import React, { useState, useMemo, Fragment } from 'react';
import { MOCK_CBOM_ITEMS } from '../data/mockData';
import {
  Search,
  Download,
  ChevronDown,
  ChevronUp,
  Cpu,
  X,
  Sliders,
  Copy,
  Check
} from 'lucide-react';

export const DashboardPreview: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRisk, setSelectedRisk] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>('CRY-101');
  const [exportNotice, setExportNotice] = useState<string | null>(null);
  const [migrationSimPercent, setMigrationSimPercent] = useState<number>(28);
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);

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

    setExportNotice('Downloaded CycloneDX 1.6 CBOM JSON artifact successfully.');
    setTimeout(() => setExportNotice(null), 4000);
  };

  const handleCopySnippet = (item: any) => {
    const snippet = `// CBOM Entry for ${item.id} (${item.assetName})
// Location: ${item.location}
{
  "algorithm": "${item.algorithm}",
  "keyLength": ${item.keySize},
  "quantumVulnerable": ${item.quantumVulnerable},
  "remediation": "${item.nistReplacement}"
}`;
    navigator.clipboard.writeText(snippet);
    setCopiedSnippetId(item.id);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  return (
    <section id="dashboard-preview" className="relative py-28 sm:py-36 bg-[#030712]/75 backdrop-blur-[1px] border-t border-white/[0.08] scroll-mt-28 sm:scroll-mt-36">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-5">
            <Cpu className="size-3.5" aria-hidden="true" />
            Interactive Product Sandbox
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight text-balance">
            Explore the Cryptographic Bill of Materials (CBOM).
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-pretty">
            Interact with simulated cryptographic findings extracted across enterprise repositories. Filter by risk tier,
            inspect source call sites, simulate migration agility progress, or export in standardized{' '}
            <strong className="text-white">CycloneDX 1.6 CBOM</strong> format.
          </p>
        </div>

        {/* Live Interactive Migration Simulator Strip */}
        <div className="p-5 rounded-2xl bg-[#060a16] border border-cyan-500/20 mb-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2 text-xs font-mono">
              <Sliders className="size-4 text-cyan-400" aria-hidden="true" />
              <span className="text-white font-bold">Migration Velocity Simulator:</span>
              <span className="text-cyan-300 font-bold tabular-nums">{migrationSimPercent}% Transitioned</span>
            </div>
            <div className="text-xs font-mono text-slate-400">
              Simulated Residual Shor’s Exposure:{' '}
              <span className="text-rose-400 font-bold tabular-nums">{100 - migrationSimPercent}%</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="100"
              value={migrationSimPercent}
              onChange={(e) => setMigrationSimPercent(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label="Simulate migration velocity"
            />
            <button
              type="button"
              onClick={() => setMigrationSimPercent(100)}
              className="px-3 py-1 rounded-lg bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono whitespace-nowrap cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              Simulate 100% PQC
            </button>
          </div>
        </div>

        {/* Interactive CBOM Explorer Container (Doppelrand Double-Bezel) */}
        <div className="double-bezel group">
          <div className="double-bezel-inner p-4 sm:p-6 lg:p-8">
            {/* Control Bar: Search & Filters */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
              {/* Search input */}
              <div className="relative flex-1 max-w-md">
                <Search className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  type="text"
                  aria-label="Search cryptographic assets by algorithm, service, path, or ID"
                  placeholder="Search algorithm, service, path, or ID…"
                  spellCheck={false}
                  autoComplete="off"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-cyan-400 transition-colors focus-visible:ring-1 focus-visible:ring-cyan-400"
                />
              </div>

              {/* Category & Risk Filter Chips */}
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-slate-300 text-xs font-mono focus:outline-none focus:border-cyan-400 cursor-pointer focus-visible:ring-1 focus-visible:ring-cyan-400"
                  aria-label="Filter by category"
                >
                  <option value="All">All Categories</option>
                  <option value="Key Exchange">Key Exchange</option>
                  <option value="Digital Signature">Digital Signature</option>
                  <option value="Symmetric Encryption">Symmetric Encryption</option>
                  <option value="Cryptographic Hash">Cryptographic Hash</option>
                </select>

                <select
                  value={selectedRisk}
                  onChange={(e) => setSelectedRisk(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-slate-300 text-xs font-mono focus:outline-none focus:border-cyan-400 cursor-pointer focus-visible:ring-1 focus-visible:ring-cyan-400"
                  aria-label="Filter by risk tier"
                >
                  <option value="All">All Risk Tiers</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Low">Low</option>
                  <option value="Vulnerable">Quantum Vulnerable</option>
                  <option value="Quantum-Ready">Quantum-Ready</option>
                </select>

                {/* Export Button */}
                <button
                  type="button"
                  onClick={handleDownloadCbom}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold text-xs font-mono shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Download className="size-3.5" aria-hidden="true" />
                  <span>Export CycloneDX 1.6</span>
                </button>
              </div>
            </div>

            {/* Notification Alert if downloaded */}
            {exportNotice && (
              <div role="status" aria-live="polite" className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-between animate-in fade-in">
                <span>{exportNotice}</span>
                <button type="button" onClick={() => setExportNotice(null)} className="cursor-pointer" aria-label="Dismiss notification">
                  <X className="size-3.5" aria-hidden="true" />
                </button>
              </div>
            )}

            {/* Table of Cryptographic Assets */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-mono">
                    <th className="py-3 px-3">Asset ID</th>
                    <th className="py-3 px-3">Cryptographic Primitive</th>
                    <th className="py-3 px-3">Key Size</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Quantum Status</th>
                    <th className="py-3 px-3">Risk Tier</th>
                    <th className="py-3 px-3 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-sans">
                  {filteredItems.map((item) => {
                    const isExpanded = expandedId === item.id;
                    return (
                      <Fragment key={item.id}>
                        <tr
                          role="button"
                          tabIndex={0}
                          aria-expanded={isExpanded}
                          onClick={() => setExpandedId(isExpanded ? null : item.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setExpandedId(isExpanded ? null : item.id);
                            }
                          }}
                          className="hover:bg-white/[0.03] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                        >
                          <td className="py-3 px-3 font-mono text-cyan-400 font-bold tabular-nums">{item.id}</td>
                          <td className="py-3 px-3">
                            <div className="font-semibold text-white">{item.assetName}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{item.algorithm}</div>
                          </td>
                          <td className="py-3 px-3 font-mono text-slate-300 tabular-nums">{item.keySize}</td>
                          <td className="py-3 px-3 text-slate-300">{item.category}</td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                                item.quantumVulnerable
                                  ? 'bg-rose-950/70 text-rose-300 border border-rose-500/30'
                                  : 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/30'
                              }`}
                            >
                              {item.quantumVulnerable ? 'Shor’s Vulnerable' : 'Resistant'}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                                item.riskScore === 'Critical'
                                  ? 'text-rose-400'
                                  : item.riskScore === 'High'
                                  ? 'text-amber-400'
                                  : 'text-emerald-400'
                              }`}
                            >
                              {item.riskScore}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            {isExpanded ? (
                              <ChevronUp className="size-4 text-cyan-400 inline" aria-hidden="true" />
                            ) : (
                              <ChevronDown className="size-4 text-slate-500 inline" aria-hidden="true" />
                            )}
                          </td>
                        </tr>

                        {/* Expandable Row Details */}
                        {isExpanded && (
                          <tr className="bg-black/40">
                            <td colSpan={7} className="p-4 sm:p-5">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                                <div>
                                  <div className="text-slate-400 mb-1">AST Code Location:</div>
                                  <div className="p-2 rounded bg-black/60 border border-white/10 text-cyan-300 font-mono break-all mb-3">
                                    {item.location}
                                  </div>

                                  <div className="text-slate-400 mb-1">Observed Vulnerability:</div>
                                  <div className="p-2 rounded bg-rose-950/20 border border-rose-500/20 text-rose-300">
                                    {item.recommendedAction}
                                  </div>
                                </div>

                                <div>
                                  <div className="text-slate-400 mb-1">Recommended NIST FIPS Replacement:</div>
                                  <div className="p-2 rounded bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 font-bold mb-3">
                                    {item.nistReplacement}
                                  </div>

                                  <div className="flex items-center justify-between pt-1">
                                    <span className="text-[11px] text-slate-400">CycloneDX Spec v1.6</span>
                                    <button
                                      type="button"
                                      aria-label={`Copy CBOM snippet for ${item.id}`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleCopySnippet(item);
                                      }}
                                      className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                                    >
                                      {copiedSnippetId === item.id ? (
                                        <span role="status" aria-live="polite" className="flex items-center gap-1.5 text-emerald-400">
                                          <Check className="size-3 text-emerald-400" aria-hidden="true" />
                                          <span>Snippet Copied</span>
                                        </span>
                                      ) : (
                                        <>
                                          <Copy className="size-3 text-slate-400" aria-hidden="true" />
                                          <span>Copy CBOM Snippet</span>
                                        </>
                                      )}
                                    </button>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
