import Header from '@/components/feature/Header';
import Footer from '@/components/feature/Footer';
import HeroSection from './components/HeroSection';
import TreatmentsSection from './components/TreatmentsSection';
import StepsSection from './components/StepsSection';
import GoalsSection from './components/GoalsSection';
import PrivacySection from './components/PrivacySection';
import TestimonialsSection from './components/TestimonialsSection';
import BenefitsSection from './components/BenefitsSection';
import LabsSection from './components/LabsSection';
import FaqSection from './components/FaqSection';
import FeaturedSection from './components/FeaturedSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-background-50 text-foreground-950">
      <Header />
      <main>
        <HeroSection />
        <TreatmentsSection />
        <StepsSection />
        <GoalsSection />
        <PrivacySection />
        <TestimonialsSection />
        <BenefitsSection />
        <LabsSection />
        <FaqSection />
        <FeaturedSection />
      </main>
      <Footer />
    </div>
  );
}