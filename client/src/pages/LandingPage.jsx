import React from "react";
import { Link } from "react-router-dom";
import { 
  Globe, 
  TrendingUp, 
  Shield, 
  Map, 
  Sun, 
  Moon, 
  Users, 
  Github,
  ExternalLink,
  ArrowRight,
  Activity,
  Wind,
  Eye,
  Calendar
} from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const LandingPage = () => {
  const { theme, toggleTheme } = useTheme();

  const features = [
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Live AQI Dashboard",
      description: "Real-time Air Quality Index monitoring with instant updates and current pollutant levels."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global City Search",
      description: "Search and explore air quality data from any city around the world with detailed insights."
    },
    {
      icon: <Map className="w-8 h-8" />,
      title: "Interactive Maps",
      description: "Visualize AQI data on interactive maps with location-based air quality visualization."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Health Suggestions",
      description: "Get personalized health advice and precautions based on current air quality levels."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "7-Day Forecast",
      description: "Predict future air quality trends with interactive charts and forecasting data."
    },
    {
      icon: <Wind className="w-8 h-8" />,
      title: "Pollutant Breakdown",
      description: "Detailed analysis of PM2.5, PM10, O₃, NO₂, SO₂, and CO concentrations."
    }
  ];

  const contributors = [
    {
      name: "NirvikD",
      avatar: "https://avatars.githubusercontent.com/u/118150046?s=60&v=4",
      github: "https://github.com/NirvikD",
      commits: 9,
      linesAdded: 770,
    },
    {
      name: "deepanshu-prajapati01",
      avatar: "https://avatars.githubusercontent.com/u/98377377?s=60&v=4",
      github: "https://github.com/deepanshu-prajapati01",
      commits: 5,
      linesAdded: 312,
    },
    {
      name: "Kashish23092004",
      avatar: "https://avatars.githubusercontent.com/u/139871425?v=4",
      github: "https://github.com/Kashish23092004",
      commits: 4,
      linesAdded: 295,
    },
    {
      name: "gaurav123-4",
      avatar: "https://avatars.githubusercontent.com/u/204588730?s=60&v=4",
      github: "https://github.com/gaurav123-4",
      commits: 3,
      linesAdded: 723,
    },
    {
      name: "Tanyasharma71",
      avatar: "https://avatars.githubusercontent.com/u/208266043?s=60&v=4",
      github: "https://github.com/Tanyasharma71",
      commits: 1,
      linesAdded: 21,
    },
    {
      name: "riya751885",
      avatar: "https://avatars.githubusercontent.com/u/122119293?s=60&v=4",
      github: "https://github.com/riya751885",
      commits: 1,
      linesAdded: 3,
    },
  ];

  const maintainer = {
    name: "prasoonk1204",
    avatar: "https://avatars.githubusercontent.com/u/171074534?s=60&v=4",
    github: "https://github.com/prasoonk1204",
    commits: 6,
    linesAdded: 2035
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 py-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <img src="/favicon.png" alt="Logo" className="w-8 h-8" />
              <h1 className="text-2xl font-bold text-emerald-600 dark:text-green-400">
                BreatheEasy
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full border border-green-400 dark:border-green-600 bg-white dark:bg-green-800 text-green-800 dark:text-white hover:bg-green-100 dark:hover:bg-green-700 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-blue-600" />
                )}
              </button>

              <Link
                to="/dashboard"
                className="hidden sm:flex bg-emerald-600 hover:bg-emerald-700 dark:bg-green-600 dark:hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 items-center gap-2"
              >
                Launch App
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-green-800 text-emerald-800 dark:text-green-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Globe className="w-4 h-4" />
                Open Source Air Quality Monitor
              </div>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Monitor Air Quality
              <span className="block text-emerald-600 dark:text-green-400">
                Anywhere, Anytime
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Get real-time air quality data, health suggestions, and detailed
              pollutant analysis for any city around the world. Make informed
              decisions for better health.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/dashboard"
                className="bg-emerald-600 hover:bg-emerald-700 dark:bg-green-600 dark:hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Start Monitoring
                <ArrowRight className="w-5 h-5" />
              </Link>

              <a
                href="https://github.com/prasoonk1204/BreatheEasy"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-emerald-600 dark:hover:border-green-400 hover:bg-emerald-50 dark:hover:bg-green-900/20 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 dark:bg-green-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-green-200 dark:bg-green-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About BreatheEasy
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              BreatheEasy is an open-source project that helps you monitor air
              quality in your area, understand pollutant levels, and take
              informed actions for better health. With real-time data from
              cities worldwide, interactive maps, and personalized health
              guidance, we make understanding air quality simple, informative,
              and accessible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 dark:bg-green-800 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-emerald-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Real-Time Monitoring
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Get live updates on air quality index and pollutant
                    concentrations for any location worldwide.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 dark:bg-green-800 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-emerald-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Health-Focused
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Receive personalized health suggestions and precautions
                    based on current air quality levels.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 dark:bg-green-800 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-emerald-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Future Planning
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Access 7-day air quality forecasts to plan outdoor
                    activities and protect your health.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Why Air Quality Matters
                </h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    Respiratory health protection
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    Informed outdoor activity planning
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    Community awareness and action
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    Long-term health benefits
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to monitor and understand air quality in your
              area and around the world.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200 dark:border-gray-700"
              >
                <div className="w-12 h-12 bg-emerald-100 dark:bg-green-800 rounded-lg flex items-center justify-center mb-4 text-emerald-600 dark:text-green-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contributors Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Contributors
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Meet the amazing developers who have contributed to making
              BreatheEasy a reality.
            </p>
          </div>

          {/* Maintainer */}
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
              Project Maintainer
            </h3>
            <div className="inline-block">
              <a
                href={maintainer.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl p-8 text-white transform transition-all duration-300 hover:scale-102">
                  <img
                    src={maintainer.avatar}
                    alt={maintainer.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white/20"
                  />
                  <h4 className="text-xl font-bold mb-2">{maintainer.name}</h4>
                  <div className="flex justify-center gap-6 text-sm">
                    <span>{maintainer.commits} commits</span>
                    <span>{maintainer.linesAdded} lines added</span>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Contributors */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
              Contributors
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contributors.map((contributor, index) => (
                <a
                  key={index}
                  href={contributor.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102 border border-gray-200 dark:border-gray-700 text-center">
                    <img
                      src={contributor.avatar}
                      alt={contributor.name}
                      className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-emerald-200 dark:border-green-700"
                    />
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-green-400 transition-colors">
                      {contributor.name}
                    </h4>
                    <div className="flex justify-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                      <span>{contributor.commits} commits</span>
                      <span>{contributor.linesAdded} lines</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Monitor Your Air Quality?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join thousands of users who are already making informed decisions
            about their health and environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Launch BreatheEasy
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://github.com/prasoonk1204/BreatheEasy"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Github className="w-5 h-5" />
              Contribute
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src="/favicon.png" alt="Logo" className="w-8 h-8" />
                <h3 className="text-2xl font-bold text-green-500 dark:text-green-400">
                  BreatheEasy
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
                An open-source air quality monitoring platform that helps you
                understand and track air quality data for better health
                decisions.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/prasoonk1204/BreatheEasy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-green-500 dark:text-gray-300 dark:hover:text-green-400 transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>Live AQI Dashboard</li>
                <li>Global City Search</li>
                <li>Interactive Maps</li>
                <li>Health Suggestions</li>
                <li>7-Day Forecast</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>
                  <a
                    href="https://github.com/prasoonk1204/BreatheEasy"
                    className="hover:text-green-500 dark:hover:text-green-400 transition-colors flex items-center gap-2"
                  >
                    GitHub Repository
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/prasoonk1204/BreatheEasy/blob/main/README.md"
                    className="hover:text-green-500 dark:hover:text-green-400 transition-colors flex items-center gap-2"
                  >
                    Documentation
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/prasoonk1204/BreatheEasy/issues"
                    className="hover:text-green-500 dark:hover:text-green-400 transition-colors flex items-center gap-2"
                  >
                    Report Issues
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-8 text-center text-gray-500 dark:text-gray-400">
            <p>
              © 2024 BreatheEasy. Open source under{" "}
              <a
                href="https://github.com/prasoonk1204/BreatheEasy/blob/main/License.md"
                className="text-green-500 dark:text-green-400 hover:underline"
              >
                MIT License
              </a>
              . Built with ❤️ by the open source community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;