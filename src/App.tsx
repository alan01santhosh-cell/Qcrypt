import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { ThreeHeroScrollytelling } from './components/ThreeHeroScrollytelling';
import { CryptoMarquee } from './components/CryptoMarquee';

// Lazy-load below-the-fold components to accelerate initial First Contentful Paint (FCP) and LCP
const ProblemSection = lazy(() =>
  import('./components/ProblemSection').then((m) => ({ default: m.ProblemSection }))
);
const SolutionSection = lazy(() =>
  import('./components/SolutionSection').then((m) => ({ default: m.SolutionSection }))
);
const FeaturesSection = lazy(() =>
  import('./components/FeaturesSection').then((m) => ({ default: m.FeaturesSection }))
);
const DashboardPreview = lazy(() =>
  import('./components/DashboardPreview').then((m) => ({ default: m.DashboardPreview }))
);
const WhyQcrypt = lazy(() =>
  import('./components/WhyQcrypt').then((m) => ({ default: m.WhyQcrypt }))
);
const TargetCustomers = lazy(() =>
  import('./components/TargetCustomers').then((m) => ({ default: m.TargetCustomers }))
);
const StandardsSection = lazy(() =>
  import('./components/StandardsSection').then((m) => ({ default: m.StandardsSection }))
);
const FaqSection = lazy(() =>
  import('./components/FaqSection').then((m) => ({ default: m.FaqSection }))
);
const ContactSection = lazy(() =>
  import('./components/ContactSection').then((m) => ({ default: m.ContactSection }))
);
const Footer = lazy(() =>
  import('./components/Footer').then((m) => ({ default: m.Footer }))
);

export function App() {
  const [contactMode, setContactMode] = useState<'demo' | 'early-access' | 'contact'>('demo');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToContact = (mode: 'demo' | 'early-access' | 'contact', role?: string) => {
    setContactMode(mode);
    if (role) setSelectedRole(role);
    if (lenisRef.current) {
      lenisRef.current.scrollTo('#contact', { duration: 1.4, offset: -50 });
    } else {
      const element = document.getElementById('contact');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(`#${id}`, { duration: 1.4, offset: -50 });
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#02040a] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-white relative">
      {/* Accessible Skip Link for Keyboard Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] px-4 py-2 bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold text-xs rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-white transition-transform"
      >
        Skip to main content
      </a>

      {/* 1. Centerpiece Interactive 3D Scrollytelling Experience */}
      <ThreeHeroScrollytelling
        onOpenDemo={() => scrollToSection('dashboard-preview')}
        onOpenContact={() => scrollToContact('demo')}
        onExploreArchitecture={() => scrollToSection('problem')}
      />

      {/* Cryptographic Protocol Transition Infinite Marquee */}
      <CryptoMarquee />

      <main id="main-content" className="flex-1 relative z-10">
        {/* Below-the-fold components streamed in asynchronously */}
        <Suspense
          fallback={
            <div className="py-20 flex items-center justify-center text-cyan-400/60 font-mono text-xs">
              <span className="size-2 rounded-full bg-cyan-400 animate-ping mr-2" />
              Initializing cryptographic modules…
            </div>
          }
        >
          {/* 2. Problem Section */}
          <ProblemSection onLearnMore={() => scrollToSection('solution')} />

          {/* 3. Solution Section */}
          <SolutionSection onOpenDashboard={() => scrollToSection('dashboard-preview')} />

          {/* 4. Product Features & Customer Benefits */}
          <FeaturesSection />

          {/* 5. Product Dashboard Preview & CBOM Sandbox */}
          <DashboardPreview />

          {/* 6. Why Choose Qcrypt & Agility Scorecard */}
          <WhyQcrypt onExploreRemediation={() => scrollToContact('early-access')} />

          {/* 7. Target Customers & Personas */}
          <TargetCustomers onSelectAudience={(audience) => scrollToContact('demo', audience)} />

          {/* 8. Standards and NIST Credibility */}
          <StandardsSection />

          {/* 9. FAQ Knowledge Base */}
          <FaqSection />

          {/* 10. Conversion Section & Contact Form */}
          <ContactSection initialMode={contactMode} initialRole={selectedRole} />

          {/* Footer */}
          <Footer />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
