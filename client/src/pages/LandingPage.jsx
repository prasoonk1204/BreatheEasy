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
import Chatbot from "../components/Chatbot";
import FAQAccordion from "../components/FAQAccordion";

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
      <div id="help">
        <section className="py-20 bg-white/50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Help & Support
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Get answers to your air quality questions and chat with our AI assistant
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
                  Chat with Our Assistant
                </h3>
                <Chatbot />
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
                  Frequently Asked Questions
                </h3>
                <FAQAccordion />
              </div>
            </div>
          </div>
        </section>
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
