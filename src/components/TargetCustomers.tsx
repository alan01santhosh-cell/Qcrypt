import {
  ShieldCheck,
  Code2,
  Landmark,
  Cloud,
  FileLock2,
  Compass,
  ArrowRight
} from 'lucide-react';

interface TargetCustomersProps {
  onSelectAudience: (role: string) => void;
}

export const TargetCustomers: React.FC<TargetCustomersProps> = ({ onSelectAudience }) => {
  const audiences = [
    {
      title: 'Enterprise Security & CISOs',
      role: 'Chief Information Security Officers & Cryptographic Architects',
      icon: ShieldCheck,
      useCase:
        'Continuous cryptographic governance across sprawling multi-cloud organizations, providing executive boards with quantifiable risk metrics and defensible PQC readiness roadmaps.',
      benefit:
        'Replaces anecdotal security reviews with verifiable CBOM inventories and avoids sudden regulatory compliance penalties.'
    },
    {
      title: 'Software Engineering & DevSecOps',
      role: 'Platform Engineers, DevSecOps Leads & Principal Developers',
      icon: Code2,
      useCase:
        'Integrate cryptographic AST checks directly into CI/CD pipelines, preventing engineers from unintentionally introducing deprecated RSA or non-agile key implementations.',
      benefit:
        'Detects cryptographic debt at the pull-request stage with clear, actionable remediation code snippets before production merge.'
    },
    {
      title: 'Financial Services & Fintech',
      role: 'Banking Security Leads, Payment Gateway Architects',
      icon: Landmark,
      useCase:
        'Securing high-frequency transaction messaging, payment authorization chains, and customer banking vaults where transaction confidentiality and non-repudiation are paramount.',
      benefit:
        'Mitigates exposure to financial fraud and regulatory mandates (e.g. PCI-DSS, Basel Committee PQC advisories, and central bank migration frameworks).'
    },
    {
      title: 'Cloud & Infrastructure Providers',
      role: 'Infrastructure Architects & Cloud Security Teams',
      icon: Cloud,
      useCase:
        'Modernizing TLS termination layers, service mesh mTLS sidecars, and edge API proxies to support hybrid post-quantum key encapsulation algorithms (e.g. X25519MLKEM768).',
      benefit:
        'Protects customer transit traffic from Harvest-Now-Decrypt-Later interception with zero downtime or protocol degradation.'
    },
    {
      title: 'Stewards of Long-Lived Sensitive Data',
      role: 'Healthcare, Defense, Intellectual Property & Life Sciences',
      icon: FileLock2,
      useCase:
        'Protecting electronic health records, genomic sequences, proprietary trade secrets, and national security data that must remain secret for 20+ years.',
      benefit:
        'Addresses Mosca’s theorem directly: guarantees cryptographic secrecy long before quantum compute reaches commercial maturity.'
    },
    {
      title: 'Technology Innovators Planning PQC Strategy',
      role: 'CTOs, R&D Labs & Product Strategy Teams',
      icon: Compass,
      useCase:
        'Designing next-generation SaaS architectures and hardware devices with cryptographic agility so future cipher migrations require config updates rather than full rewrites.',
      benefit:
        'Future-proofs software investments, turns quantum resilience into a distinct commercial advantage, and wins enterprise procurement deals.'
    }
  ];

  return (
    <section id="customers" className="relative py-24 sm:py-32 bg-[#030712] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-4">
            Tailored For High-Assurance Teams
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight text-balance">
            Built for Organizations with High Cryptographic Needs.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-pretty">
            Whether your priority is securing confidential data for decades, achieving compliance, or modernizing
            a cloud-scale microservice architecture, Qcrypt provides tailored visibility and workflows.
          </p>
        </div>

        {/* 6 Target Audiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((aud) => {
            const Icon = aud.icon;
            return (
              <div
                key={aud.title}
                className="cyber-card group"
              >
                <div className="cyber-card-inner p-6 sm:p-7 flex flex-col justify-between h-full">
                  <div>
                    <div className="size-12 rounded-xl bg-cyan-950/50 border border-cyan-500/25 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                      <Icon className="size-5 stroke-[1.5]" />
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors text-balance">
                      {aud.title}
                    </h3>
                    <div className="text-xs font-mono text-slate-400 mb-4 pb-2 border-b border-white/5">
                      {aud.role}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 mb-1">
                          Operational Use Case
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed text-pretty">
                          {aud.useCase}
                        </p>
                      </div>

                      <div className="pt-2">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 mb-1">
                          Strategic Business ROI
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed text-pretty">
                          {aud.benefit}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5">
                    <button
                      onClick={() => onSelectAudience(aud.title)}
                      className="min-h-[44px] py-2 px-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5 group/btn rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                    >
                      <span>Request tailored walkthrough</span>
                      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
