import React, { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Why should technology companies prepare now if cryptographically relevant quantum computers do not exist yet?',
      a: 'Preparing for quantum computing is a present-day data security challenge due to “Harvest Now, Decrypt Later” (HNDL). Hostile adversaries and state-sponsored groups are actively recording encrypted network traffic today. Once quantum computing reaches cryptographic relevance, this recorded data can be decrypted retroactively. If your enterprise handles intellectual property, banking records, health data, or state secrets that must remain confidential for 10+ years, your exposure window is already open. Furthermore, migrating enterprise-wide cryptographic infrastructure typically takes 3 to 7 years.'
    },
    {
      q: 'What is a Cryptographic Bill of Materials (CBOM) and why do we need one?',
      a: 'A Cryptographic Bill of Materials (CBOM) is a standardized, machine-readable inventory of all cryptographic assets, primitives, algorithms, key lengths, certificates, and protocols operating within your software ecosystem. While traditional Software Bills of Materials (SBOMs) catalog packages, CBOMs drill down into actual cryptographic parameters (e.g. RSA-2048, ECDSA secp256r1, AES-GCM). A CBOM is crucial for post-quantum planning, compliance audits, and proving cryptographic agility.'
    },
    {
      q: 'Does Qcrypt require uploading our proprietary source code to your cloud?',
      a: 'No. Security of your intellectual property is paramount. Qcrypt provides a local CLI and containerized scanner that runs directly inside your own VPC, developer workstations, or CI/CD runner pipelines. The AST analysis occurs locally inside your security perimeter, and only the generated metadata/CBOM telemetry is reported to the management console. Air-gapped deployments are also supported.'
    },
    {
      q: 'What specific NIST Post-Quantum standards does Qcrypt reference?',
      a: 'Qcrypt aligns directly with the finalized standards published by NIST in August 2024: FIPS 203 (ML-KEM for general encryption and key encapsulation), FIPS 204 (ML-DSA for primary digital signatures), and FIPS 205 (SLH-DSA for stateless hash-based backup signatures). Our migration recommendations guide engineering teams on implementing hybrid schemes (e.g., combining X25519 with ML-KEM) to maintain backward compatibility during migration.'
    },
    {
      q: 'Is the data shown in the online demo dashboard real customer data?',
      a: 'No. To maintain complete customer confidentiality and prevent unauthorized disclosures, the web demo displays synthetic, illustrative data derived from open-source microservice patterns. When you schedule a customized demo or pilot, we configure the analyzer against your test repositories in your own sandbox.'
    },
    {
      q: 'How does Qcrypt avoid overwhelming developers with thousands of crypto findings?',
      a: 'Qcrypt applies a multi-factor risk scoring engine. Rather than flagging every hash or random number generator as an emergency, Qcrypt evaluates algorithmic vulnerability (asymmetric vs. symmetric), public network exposure (external TLS vs. internal memory), and data sensitivity. This concentrates engineering effort on the 5% of assets that present existential quantum interception risks.'
    }
  ];

  return (
    <section id="faq" className="relative py-28 sm:py-36 bg-[#040814]/70 backdrop-blur-[1px] border-t border-white/[0.08] scroll-mt-28 sm:scroll-mt-36">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-5">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Knowledge Base
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-300 leading-relaxed text-pretty">
            Essential facts about post-quantum cryptography risks, migration timelines, and how Qcrypt operates.
          </p>
        </div>

        {/* FAQ Accordion List (Doppelrand Enclosures) */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="double-bezel group"
              >
                <div className="double-bezel-inner overflow-hidden">
                  <button
                    type="button"
                    id={`faq-btn-${index}`}
                    aria-controls={`faq-panel-${index}`}
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-white leading-snug text-balance">
                      {faq.q}
                    </span>
                    <div
                      className={`size-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                        isOpen ? 'rotate-180 text-cyan-400 border-cyan-500/40 bg-cyan-950/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]' : ''
                      }`}
                    >
                      <ChevronDown className="size-4" aria-hidden="true" />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-btn-${index}`}
                      className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 font-normal text-pretty animate-in fade-in duration-300"
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
