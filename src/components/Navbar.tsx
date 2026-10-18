import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenDemo: () => void;
  onOpenEarlyAccess: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemo, onOpenEarlyAccess }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Problem', href: '#problem' },
    { label: 'Solution', href: '#solution' },
    { label: 'Features', href: '#features' },
    { label: 'Dashboard', href: '#dashboard-preview' },
    { label: 'Standards', href: '#standards' },
    { label: 'Customers', href: '#customers' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-[max(1rem,env(safe-area-inset-top))] pointer-events-none">
      <nav
        className={`pointer-events-auto max-w-6xl mx-auto rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isScrolled
            ? 'bg-[#040814]/85 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(0,240,255,0.08)] py-2 sm:py-2.5 px-4 sm:px-6 ring-1 ring-white/10'
            : 'bg-[#060a16]/65 backdrop-blur-xl border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] py-2.5 sm:py-3.5 px-5 sm:px-7'
        } flex items-center justify-between gap-4`}
      >
        {/* Brand Logo */}
        <a href="#" aria-label="Qcrypt Home" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-full shrink-0">
          <div className="relative size-8 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-600/30 border border-cyan-400/30 flex items-center justify-center p-1 shadow-[0_0_15px_rgba(0,240,255,0.25)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110 shrink-0">
            <svg viewBox="0 0 32 32" className="size-5 text-white" fill="none">
              <polygon points="16,3 28,9.5 28,22.5 16,29 4,22.5 4,9.5" stroke="currentColor" strokeWidth="1.75" />
              <circle cx="16" cy="16" r="3" fill="#00f0ff" />
              <line x1="16" y1="16" x2="28" y2="22.5" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="2 2" />
            </svg>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-lg font-bold tracking-tight text-white flex items-center whitespace-nowrap">
              Q<span className="text-cyan-400">crypt</span>
            </span>
            <span className="hidden xl:inline-flex items-center whitespace-nowrap text-[10px] font-mono tracking-widest text-cyan-300/80 bg-cyan-950/60 border border-cyan-500/25 px-2.5 py-0.5 rounded-full uppercase shrink-0">
              PQC Intelligence
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="whitespace-nowrap text-xs xl:text-sm font-medium text-slate-300 hover:text-white px-3 xl:px-3.5 py-1.5 rounded-full transition-all duration-300 hover:bg-white/[0.06] shrink-0"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Action CTAs (Island Button Architecture with Nested Icon Pod) */}
        <div className="hidden sm:flex items-center gap-2 xl:gap-3 shrink-0">
          <button
            onClick={onOpenEarlyAccess}
            className="whitespace-nowrap shrink-0 text-xs font-semibold text-slate-300 hover:text-white px-3.5 xl:px-4 py-2 rounded-full border border-white/10 hover:border-white/25 hover:bg-white/[0.06] transition-all duration-300"
          >
            Early Access
          </button>
          <button
            onClick={onOpenDemo}
            className="group btn-island-primary relative inline-flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-sky-400 text-slate-950 font-bold text-xs tracking-wide shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:shadow-[0_0_30px_rgba(0,240,255,0.55)] whitespace-nowrap shrink-0"
          >
            <span className="whitespace-nowrap">Request Demo</span>
            <div className="btn-icon-pod size-6 rounded-full bg-slate-950/20 text-slate-950 flex items-center justify-center transition-transform duration-300 shrink-0">
              <ChevronRight className="size-3.5 stroke-[2.5]" />
            </div>
          </button>
        </div>

        {/* Mobile Hamburger Morph (Section 5.A: Two fluid lines rotating into an X with 44px touch target) */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="size-11 rounded-full bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-1.5 text-slate-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-colors"
          >
            <span
              className={`w-4 h-0.5 bg-current rounded-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                mobileMenuOpen ? 'rotate-45 translate-y-[4px]' : ''
              }`}
            />
            <span
              className={`w-4 h-0.5 bg-current rounded-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                mobileMenuOpen ? '-rotate-45 -translate-y-[4px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Screen-Filling Modal Expansion (Section 5.A: Heavy glass overlay + staggered mask reveal, scroll-safe) */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto lg:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl p-6 pt-24 pb-8 flex flex-col justify-between overflow-y-auto overscroll-contain animate-in fade-in duration-300">
          <div className="space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400 mb-3 px-3">
              Navigation Index
            </div>
            {navLinks.map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{ animationDelay: `${idx * 40}ms` }}
                className="block px-4 py-2.5 text-base font-bold text-slate-100 hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-all duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="space-y-3 pt-4 border-t border-white/10 mt-6">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEarlyAccess();
              }}
              className="w-full py-3 text-sm font-semibold text-slate-200 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
            >
              Get Early Access
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl shadow-[0_0_25px_rgba(0,240,255,0.4)]"
            >
              <span>Request a Demo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

