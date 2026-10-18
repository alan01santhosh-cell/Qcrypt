import { useState } from 'react';
import {
  Send,
  Mail,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface ContactSectionProps {
  initialMode?: 'demo' | 'early-access' | 'contact';
  initialRole?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialMode = 'demo',
  initialRole = ''
}) => {
  const [mode, setMode] = useState<'demo' | 'early-access' | 'contact'>(initialMode);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState(initialRole);
  const [interest, setInterest] = useState('Source Code Discovery & CBOM');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedData, setSubmittedData] = useState<{
    subject: string;
    body: string;
    mailtoUrl: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const businessContactEmail = 'contact@qcrypt.security';

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!email.trim()) {
      errs.email = 'Business email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid email address';
    } else {
      // Check if generic personal email provider
      const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
      const domain = email.split('@')[1]?.toLowerCase();
      if (personalDomains.includes(domain)) {
        errs.email = 'Please use your corporate work email (e.g. name@company.com)';
      }
    }
    if (!company.trim()) errs.company = 'Company name is required';
    if (!jobTitle.trim()) errs.jobTitle = 'Job title or role is required';
    if (!message.trim() || message.length < 10) {
      errs.message = 'Please provide a brief message (minimum 10 characters)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const intentType =
      mode === 'demo' ? 'Product Demo Request' : mode === 'early-access' ? 'Early Access Pilot Application' : 'Enterprise Inquiry';

    const subject = `[Qcrypt ${intentType}] - ${company} (${fullName})`;
    const body = `Hello Qcrypt Team,

I would like to ${intentType.toLowerCase()} for ${company}.

Here are our details:
- Full Name: ${fullName}
- Business Email: ${email}
- Company: ${company}
- Job Title / Role: ${jobTitle}
- Primary Area of Interest: ${interest}

Project / Migration Context:
${message}

Looking forward to hearing from you.
Best regards,
${fullName}`;

    const mailtoUrl = `mailto:${businessContactEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setSubmittedData({
      subject,
      body,
      mailtoUrl
    });
  };

  const handleCopy = () => {
    if (!submittedData) return;
    navigator.clipboard.writeText(submittedData.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleReset = () => {
    setSubmittedData(null);
    setFullName('');
    setEmail('');
    setCompany('');
    setJobTitle('');
    setMessage('');
    setErrors({});
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#030712] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-4">
            <Sparkles className="size-3.5" />
            Engage With Our Engineering Team
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight text-balance">
            Ready to Understand Your Cryptographic Risk?
          </h2>
          <p className="text-base text-slate-300 leading-relaxed text-pretty">
            Start a conversation with Qcrypt to explore cryptographic visibility, risk prioritization, and your
            organization's post-quantum migration needs.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'demo', label: 'Request a Demo' },
            { id: 'early-access', label: 'Get Early Access' },
            { id: 'contact', label: 'Contact Our Team' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setMode(tab.id as any);
                setSubmittedData(null);
              }}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 ${
                mode === tab.id
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Double-Bezel Form Container */}
        <div className="double-bezel">
          <div className="double-bezel-inner p-6 sm:p-10">
            {submittedData ? (
              /* Success / Ready-to-Send State with Mailto Integration */
              <div className="text-left space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/40">
                  <CheckCircle2 className="size-6 text-cyan-400 shrink-0" />
                  <div>
                    <h3 className="text-base font-bold text-white text-balance">
                      Your inquiry has been formulated and is ready to dispatch.
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5 text-pretty">
                      Target destination: <strong className="text-cyan-300 font-mono">{businessContactEmail}</strong>
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/50 border border-white/10 font-mono text-xs text-slate-300">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10 text-slate-400">
                    <span>Generated Message Payload</span>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-sans text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-sm"
                    >
                      <Copy className="size-3.5" />
                      {copied ? 'Copied to Clipboard!' : 'Copy Text'}
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-slate-200">
                    {submittedData.body}
                  </pre>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                  >
                    <RotateCcw className="size-3.5" />
                    Submit Another Request
                  </button>

                  <a
                    href={submittedData.mailtoUrl}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-xs tracking-wide shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                  >
                    <Mail className="size-4" />
                    <span>Open in Email Client to Send Directly</span>
                    <ExternalLink className="size-3.5 ml-1" />
                  </a>
                </div>
              </div>
            ) : (
              /* Interactive Contact Form */
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Full Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. Dr. Jane Doe"
                      value={fullName}
                      aria-invalid={errors.fullName ? 'true' : 'false'}
                      aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors({ ...errors, fullName: '' });
                      }}
                      className={`w-full px-4 py-2.5 rounded-xl bg-black/40 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors focus-visible:ring-1 focus-visible:ring-cyan-400 ${
                        errors.fullName ? 'border-rose-500' : 'border-white/10 focus:border-cyan-400'
                      }`}
                    />
                    {errors.fullName && (
                      <p id="fullName-error" role="alert" className="text-[11px] text-rose-400 mt-1 font-mono flex items-center gap-1">
                        <AlertCircle className="size-3" /> {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Business Email */}
                  <div>
                    <label htmlFor="businessEmail" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Business Email <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="businessEmail"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="name@company.com"
                      value={email}
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'businessEmail-error' : undefined}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`w-full px-4 py-2.5 rounded-xl bg-black/40 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors focus-visible:ring-1 focus-visible:ring-cyan-400 ${
                        errors.email ? 'border-rose-500' : 'border-white/10 focus:border-cyan-400'
                      }`}
                    />
                    {errors.email && (
                      <p id="businessEmail-error" role="alert" className="text-[11px] text-rose-400 mt-1 font-mono flex items-center gap-1">
                        <AlertCircle className="size-3" /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Company Name */}
                  <div>
                    <label htmlFor="companyName" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Company Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="companyName"
                      name="organization"
                      type="text"
                      autoComplete="organization"
                      placeholder="e.g. Acquia Technologies"
                      value={company}
                      aria-invalid={errors.company ? 'true' : 'false'}
                      aria-describedby={errors.company ? 'companyName-error' : undefined}
                      onChange={(e) => {
                        setCompany(e.target.value);
                        if (errors.company) setErrors({ ...errors, company: '' });
                      }}
                      className={`w-full px-4 py-2.5 rounded-xl bg-black/40 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors focus-visible:ring-1 focus-visible:ring-cyan-400 ${
                        errors.company ? 'border-rose-500' : 'border-white/10 focus:border-cyan-400'
                      }`}
                    />
                    {errors.company && (
                      <p id="companyName-error" role="alert" className="text-[11px] text-rose-400 mt-1 font-mono flex items-center gap-1">
                        <AlertCircle className="size-3" /> {errors.company}
                      </p>
                    )}
                  </div>

                  {/* Job Title / Role */}
                  <div>
                    <label htmlFor="jobTitle" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Job Title / Role <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="jobTitle"
                      name="organization-title"
                      type="text"
                      autoComplete="organization-title"
                      placeholder="e.g. CISO, Principal Security Architect, DevSecOps Lead"
                      value={jobTitle}
                      aria-invalid={errors.jobTitle ? 'true' : 'false'}
                      aria-describedby={errors.jobTitle ? 'jobTitle-error' : undefined}
                      onChange={(e) => {
                        setJobTitle(e.target.value);
                        if (errors.jobTitle) setErrors({ ...errors, jobTitle: '' });
                      }}
                      className={`w-full px-4 py-2.5 rounded-xl bg-black/40 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors focus-visible:ring-1 focus-visible:ring-cyan-400 ${
                        errors.jobTitle ? 'border-rose-500' : 'border-white/10 focus:border-cyan-400'
                      }`}
                    />
                    {errors.jobTitle && (
                      <p id="jobTitle-error" role="alert" className="text-[11px] text-rose-400 mt-1 font-mono flex items-center gap-1">
                        <AlertCircle className="size-3" /> {errors.jobTitle}
                      </p>
                    )}
                  </div>
                </div>

                {/* Primary Area of Interest */}
                <div>
                  <label htmlFor="interest" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                    Primary Area of Interest
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors focus-visible:ring-1 focus-visible:ring-cyan-400"
                  >
                    <option value="Source Code Discovery & CBOM" className="bg-[#050814]">
                      Source Code Cryptographic Discovery &amp; CBOM Generation
                    </option>
                    <option value="Quantum Threat Assessment & HNDL Risk" className="bg-[#050814]">
                      Quantum Threat Assessment &amp; Harvest-Now-Decrypt-Later (HNDL) Risk
                    </option>
                    <option value="NIST FIPS 203/204 Migration Roadmap" className="bg-[#050814]">
                      NIST FIPS 203 / 204 Migration Architecture Roadmap
                    </option>
                    <option value="CI/CD Pipeline Gateways" className="bg-[#050814]">
                      CI/CD Pipeline Security Gateways &amp; DevSecOps Integration
                    </option>
                    <option value="Enterprise Pilot & Custom Proof-of-Concept" className="bg-[#050814]">
                      Enterprise Pilot &amp; Custom Proof-of-Concept
                    </option>
                  </select>
                </div>

                {/* Project / Architecture Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                    Message / Architecture Scope <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your stack (e.g., Go, Rust, Java, Kubernetes), cryptographic needs, or upcoming audit timelines..."
                    value={message}
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    className={`w-full px-4 py-2.5 rounded-xl bg-black/40 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors focus-visible:ring-1 focus-visible:ring-cyan-400 ${
                      errors.message ? 'border-rose-500' : 'border-white/10 focus:border-cyan-400'
                    }`}
                  />
                  {errors.message && (
                    <p id="message-error" role="alert" className="text-[11px] text-rose-400 mt-1 font-mono flex items-center gap-1">
                      <AlertCircle className="size-3" /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Privacy Note */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed">
                  <ShieldCheck className="size-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div className="text-pretty">
                    <strong className="text-slate-300">Confidentiality &amp; Privacy Commitment:</strong> We respect
                    your security posture. Contact information is used solely to respond to your technical inquiry.
                    Qcrypt never sells data or sends unsolicited marketing spam.
                  </div>
                </div>

                {/* Submit Action Button (Button-in-Button Island Pattern) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full group btn-island-primary inline-flex items-center justify-center gap-3 pl-7 pr-2 py-2 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-sky-400 text-slate-950 font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(0,240,255,0.35)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                  >
                    <span>Send {mode === 'demo' ? 'Demo Request' : mode === 'early-access' ? 'Early Access Application' : 'Inquiry'}</span>
                    <div className="btn-icon-pod size-8 rounded-full bg-slate-950/20 text-slate-950 flex items-center justify-center transition-transform duration-300">
                      <Send className="size-4 stroke-[2.2]" />
                    </div>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
