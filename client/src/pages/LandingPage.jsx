import "../components/landing/landing.css";
import Navigation from "../components/landing/Navigation";
import Hero from "../components/landing/Hero";
import About from "../components/landing/About";
import Features from "../components/landing/Features";
import Contributors from "../components/landing/Contributors";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";
import LanguageToggle from "../components/LanguageToggle";
import ScrollToTop from "../components/ScrollToTop";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-green-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Navigation />
      <Hero />
      <About />
      <Features />
      <Contributors />
      <CTA />
      <Footer />
      <LanguageToggle />
      <ScrollToTop />
    </div>
  );
};

export default LandingPage;
