import { useState, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
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

  const scrollToContact = (mode: 'demo' | 'early-access' | 'contact', role?: string) => {
    setContactMode(mode);
    if (role) setSelectedRole(role);
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#02040a] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-white relative">
      {/* High-End Tactile Film-Grain Overlay */}
      <div className="film-grain" aria-hidden="true" />

      {/* Floating Island Navigation */}
      <Navbar
        onOpenDemo={() => scrollToContact('demo')}
        onOpenEarlyAccess={() => scrollToContact('early-access')}
      />

      <main className="flex-1">
        {/* 1. Hero Section (Immediate Critical Render) */}
        <Hero
          onRequestDemo={() => scrollToContact('demo')}
          onGetEarlyAccess={() => scrollToContact('early-access')}
          onExplorePlatform={() => scrollToSection('dashboard-preview')}
        />

        {/* Cryptographic Protocol Transition Infinite Marquee */}
        <CryptoMarquee />

        {/* Below-the-fold components streamed in asynchronously */}
        <Suspense
          fallback={
            <div className="py-20 flex items-center justify-center text-cyan-400/60 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping mr-2" />
              Initializing cryptographic modules...
            </div>
          }
        >
          {/* 2. Problem Section */}
          <ProblemSection onLearnMore={() => scrollToSection('solution')} />

          {/* 3. Solution Section */}
          <SolutionSection onOpenDashboard={() => scrollToSection('dashboard-preview')} />

          {/* 4. Product Features & Customer Benefits */}
          <FeaturesSection />

          {/* 5. Product Dashboard Preview */}
          <DashboardPreview />

          {/* 6. Why Choose Qcrypt */}
          <WhyQcrypt onExploreRemediation={() => scrollToContact('early-access')} />

          {/* 7. Target Customers */}
          <TargetCustomers onSelectAudience={(audience) => scrollToContact('demo', audience)} />

          {/* 8. Standards and Credibility */}
          <StandardsSection />

          {/* 9. FAQ Section */}
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
