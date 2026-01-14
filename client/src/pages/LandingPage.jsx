import "../components/landing/landing.css";
import { SimpleHeader } from "../components/ui/simple-header";
import { AuroraBackgroundDemo } from "../components/ui/aurora-background-demo";
import About from "../components/landing/About";
import Features from "../components/landing/Features";
import ContributorTestimonials from "../components/landing/ContributorTestimonials";
import { Cta4 } from "../components/ui/cta-4";
import { Footer } from "../components/ui/modem-animated-footer";
import LanguageToggle from "../components/LanguageToggle";
import ScrollToTop from "../components/ScrollToTop";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-linear-to-br from-emerald-50 to-green-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <SimpleHeader />
      <AuroraBackgroundDemo />
      <div id="about">
        <About />
      </div>
      <div id="features">
        <Features />
      </div>
      <div id="contributors">
        <ContributorTestimonials />
      </div>
      <Cta4
        title="Ready to Monitor Your Air Quality?"
        description="Join thousands of users who are already making informed decisions about their health and environment."
        buttonText="Launch BreatheEasy"
        buttonUrl="/dashboard"
        items={[
          "Real-Time AQI Monitoring",
          "Global Coverage",
          "Interactive Visualization",
          "Personalized Health Advice",
          "Detailed Analytics"
        ]}
      />
      <Footer />
      <LanguageToggle />
      <ScrollToTop />
    </div>
  );
};

export default LandingPage;
