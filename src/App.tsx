import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { FeaturesSection } from './components/FeaturesSection';
import { DashboardPreview } from './components/DashboardPreview';
import { WhyQcrypt } from './components/WhyQcrypt';
import { TargetCustomers } from './components/TargetCustomers';
import { StandardsSection } from './components/StandardsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

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
        {/* 1. Hero Section */}
        <Hero
          onRequestDemo={() => scrollToContact('demo')}
          onGetEarlyAccess={() => scrollToContact('early-access')}
          onExplorePlatform={() => scrollToSection('dashboard-preview')}
        />

        {/* 2. Problem Section */}
        <ProblemSection
          onLearnMore={() => scrollToSection('solution')}
        />

        {/* 3. Solution Section */}
        <SolutionSection
          onOpenDashboard={() => scrollToSection('dashboard-preview')}
        />

        {/* 4. Product Features & Customer Benefits */}
        <FeaturesSection />

        {/* 5. Product Dashboard Preview */}
        <DashboardPreview />

        {/* 6. Why Choose Qcrypt */}
        <WhyQcrypt />

        {/* 7. Target Customers */}
        <TargetCustomers
          onSelectAudience={(audience) => scrollToContact('demo', audience)}
        />

        {/* 8. Standards and Credibility */}
        <StandardsSection />

        {/* 9. FAQ Section */}
        <FaqSection />

        {/* 10. Conversion Section & Contact Form */}
        <ContactSection
          initialMode={contactMode}
          initialRole={selectedRole}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
