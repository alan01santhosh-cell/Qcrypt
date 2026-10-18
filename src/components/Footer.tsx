import {
  Mail,
  ExternalLink,
  ArrowUp
} from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#02050d] border-t border-white/10 text-slate-400 text-xs font-sans">
      {/* Upper Marketing Tagline Banner */}
      <div className="border-b border-white/5 py-12 px-4 sm:px-6 bg-gradient-to-b from-transparent to-[#040814]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2 text-balance">
              &ldquo;See Your Crypto. Prioritize Your Risk. Prepare for What&rsquo;s Next.&rdquo;
            </div>
            <p className="text-slate-300 text-sm max-w-2xl text-pretty">
              Qcrypt helps technology teams uncover hidden cryptographic risks and build a practical path toward
              post-quantum readiness.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
          >
            <span>Back to Top</span>
            <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5 text-cyan-400" />
          </button>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="size-7 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-600/30 border border-cyan-400/30 flex items-center justify-center p-1">
                <svg viewBox="0 0 32 32" className="size-4 text-white" fill="none">
                  <polygon points="16,3 28,9.5 28,22.5 16,29 4,22.5 4,9.5" stroke="currentColor" strokeWidth="2" />
                  <circle cx="16" cy="16" r="3" fill="#00f0ff" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Q<span className="text-cyan-400">crypt</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm text-pretty">
              Post-Quantum Cryptography Migration Intelligence platform providing automated source code AST discovery,
              standardized CBOM inventories, risk-weighted triage, and NIST-aligned transition roadmaps.
            </p>

            <div className="pt-2 flex items-center gap-3 text-slate-400">
              <a
                href="mailto:contact@qcrypt.security"
                className="hover:text-cyan-400 transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                aria-label="Send email to Qcrypt team"
                title="Email Us"
              >
                <Mail className="size-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                aria-label="Qcrypt on GitHub"
                title="GitHub"
              >
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                aria-label="Qcrypt on LinkedIn"
                title="LinkedIn"
              >
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 1 0 0-2.9 1.45 1.45 0 0 0 0 2.9M7.86 18.5V10.1H5.06v8.4h2.8z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product Navigation */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-white font-semibold">
              Product
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#problem" className="hover:text-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-sm">
                  The Crypto Blindspot
                </a>
              </li>
              <li>
                <a href="#solution" className="hover:text-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-sm">
                  4-Step Migration Pipeline
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-sm">
                  Platform Features
                </a>
              </li>
              <li>
                <a href="#dashboard-preview" className="hover:text-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-sm">
                  Interactive Demo Console
                </a>
              </li>
              <li>
                <a href="#why-qcrypt" className="hover:text-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-sm">
                  Why Choose Qcrypt
                </a>
              </li>
            </ul>
          </div>

          {/* Standards & Resources */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-white font-semibold">
              PQC Standards
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://csrc.nist.gov/projects/post-quantum-cryptography"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-sm"
                >
                  <span className="tabular-nums">NIST FIPS 203 (ML-KEM)</span>
                  <ExternalLink className="size-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://csrc.nist.gov/projects/post-quantum-cryptography"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-sm"
                >
                  <span className="tabular-nums">NIST FIPS 204 (ML-DSA)</span>
                  <ExternalLink className="size-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://csrc.nist.gov/projects/post-quantum-cryptography"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-sm"
                >
                  <span className="tabular-nums">NIST FIPS 205 (SLH-DSA)</span>
                  <ExternalLink className="size-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://cyclonedx.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-sm"
                >
                  <span className="tabular-nums">CycloneDX 1.6 CBOM</span>
                  <ExternalLink className="size-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-white font-semibold">
              Inquiries &amp; Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#contact" className="hover:text-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-sm">
                  Request a Demo
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-sm">
                  Join Pilot Program
                </a>
              </li>
              <li>
                <span className="text-slate-400 block font-mono text-[11px]">
                  contact@qcrypt.security
                </span>
              </li>
              <li>
                <span className="text-slate-400 block font-mono text-[11px]">
                  Zero telemetry without consent
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal / Disclaimer Row */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; <span className="tabular-nums">{CURRENT_YEAR}</span> Qcrypt Security Inc. All rights reserved. Post-Quantum Cryptography Migration Intelligence.
          </div>
          <div className="text-center md:text-right">
            Designed for high-assurance cybersecurity architectures.
          </div>
        </div>
      </div>
    </footer>
  );
};
