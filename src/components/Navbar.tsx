import { useState, useEffect } from 'react';
import { ChevronRight, Menu, X } from 'lucide-react';

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
    { label: 'Demo Dashboard', href: '#dashboard-preview' },
    { label: 'Standards', href: '#standards' },
    { label: 'Customers', href: '#customers' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3 pointer-events-none">
      <nav
        className={`pointer-events-auto max-w-6xl mx-auto rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isScrolled
            ? 'bg-[#050914]/85 backdrop-blur-2xl border border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(0,240,255,0.08)] py-2 sm:py-2.5 px-4 sm:px-6'
            : 'bg-[#080d1a]/60 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-2.5 sm:py-3 px-5 sm:px-7'
        } flex items-center justify-between`}
      >
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-full">
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-400/30 flex items-center justify-center p-1 shadow-[0_0_15px_rgba(0,240,255,0.25)] transition-transform duration-300 group-hover:scale-105">
            <svg viewBox="0 0 32 32" className="w-5 h-5 text-white" fill="none">
              <polygon points="16,3 28,9.5 28,22.5 16,29 4,22.5 4,9.5" stroke="currentColor" strokeWidth="1.75" />
              <circle cx="16" cy="16" r="3" fill="#00f0ff" />
              <line x1="16" y1="16" x2="28" y2="22.5" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="2 2" />
            </svg>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold tracking-tight text-white flex items-center">
              Q<span className="text-cyan-400">crypt</span>
            </span>
            <span className="hidden md:inline-flex items-center text-[10px] font-mono tracking-widest text-cyan-300/80 bg-cyan-950/60 border border-cyan-500/25 px-2 py-0.5 rounded-full uppercase">
              PQC Intelligence
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs xl:text-sm font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-full transition-colors duration-200 hover:bg-white/5"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={onOpenEarlyAccess}
            className="text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-2 rounded-full border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all duration-200"
          >
            Early Access
          </button>
          <button
            onClick={onOpenDemo}
            className="group relative inline-flex items-center gap-2 pl-4 pr-2 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-semibold text-xs tracking-wide shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
          >
            <span>Request Demo</span>
            <div className="w-6 h-6 rounded-full bg-slate-950/20 text-slate-950 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </button>
        </div>

        {/* Mobile Hamburger Morph */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto sm:hidden fixed inset-x-4 top-20 p-5 rounded-3xl bg-[#060b17]/95 backdrop-blur-3xl border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-1 pb-3 border-b border-white/10">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-2.5 pt-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEarlyAccess();
              }}
              className="w-full text-center py-2.5 text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors"
            >
              Get Early Access
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.3)]"
            >
              Request a Demo
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
