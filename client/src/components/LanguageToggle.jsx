import React, { useEffect, useState } from "react";
import { Globe, X } from "lucide-react";

const LanguageToggle = () => {
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const EXCLUDE_WORDS = [
    "μg/m³",
    "BreatheEasy"
  ];

  useEffect(() => {
    // Fetch language from localStorage on component mount
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    
    // Hide Google Translate UI and banner
    const style = document.createElement("style");
    style.innerHTML = `
      .goog-te-banner-frame.skiptranslate { display: none !important; }
      body { top: 0px !important; position: static !important; }
      .goog-te-gadget { display: none !important; }
      .goog-logo-link { display: none !important; }
      .goog-te-gadget-simple { display: none !important; }
      .skiptranslate { display: none !important; }
      .notranslate { translate: no; }
    `;
    document.head.appendChild(style);

    // Auto-wrap excluded words with notranslate class
    const applyNotranslate = () => {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );

      const nodesToProcess = [];
      let node;
      while ((node = walker.nextNode())) {
        nodesToProcess.push(node);
      }

      nodesToProcess.forEach((textNode) => {
        let text = textNode.nodeValue;
        let modified = false;

        EXCLUDE_WORDS.forEach((word) => {
          if (text.includes(word)) modified = true;
        });

        if (modified) {
          const span = document.createElement("span");
          let html = text;
          EXCLUDE_WORDS.forEach((word) => {
            const regex = new RegExp(`\\b(${word})\\b`, "g");
            html = html.replace(regex, `<span class="notranslate">$1</span>`);
          });
          span.innerHTML = html;
          textNode.parentNode.replaceChild(span, textNode);
        }
      });
    };

    setTimeout(applyNotranslate, 500);

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) {
        console.log("Google Translate not loaded yet");
        return;
      }

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,es,hi,bn,ta,te,mr,gu,ml,kn,pa,ur,zh-CN,fr,de,pt,ja,ar,ru,ko,id",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    // Load Google Translate script only once
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Safe language change using Google Translate dropdown
  const changeLanguage = (lang) => {
    setLoading(true);
    // Save language to localStorage
    localStorage.setItem("selectedLanguage", lang);
    
    let attempts = 0;
    const interval = setInterval(() => {
      const selectEl = document.querySelector(".goog-te-combo");
      if (selectEl) {
        selectEl.value = lang;
        selectEl.dispatchEvent(new Event("change"));
        clearInterval(interval);
        setLoading(false);
        setIsOpen(false);
      }
      attempts++;
      if (attempts > 20) {
        clearInterval(interval);
        setLoading(false);
      }
    }, 100);
  };

  const languages = {
    en: { name: "English", flag: "🇬🇧" },
    es: { name: "Spanish (Español)", flag: "🇪🇸" },
    hi: { name: "Hindi (हिंदी)", flag: "🇮🇳" },
    bn: { name: "Bengali (বাংলা)", flag: "🇧🇩" },
    ta: { name: "Tamil (தமிழ்)", flag: "🇮🇳" },
    te: { name: "Telugu (తెలుగు)", flag: "🇮🇳" },
    mr: { name: "Marathi (मराठी)", flag: "🇮🇳" },
    gu: { name: "Gujarati (ગુજરાતી)", flag: "🇮🇳" },
    ml: { name: "Malayalam (മലയാളം)", flag: "🇮🇳" },
    kn: { name: "Kannada (ಕನ್ನಡ)", flag: "🇮🇳" },
    pa: { name: "Punjabi (ਪੰਜਾਬੀ)", flag: "🇮🇳" },
    ur: { name: "Urdu (اردو)", flag: "🇮🇳" },
    "zh-CN": { name: "Chinese (中文)", flag: "🇨🇳" },
    fr: { name: "French (Français)", flag: "🇫🇷" },
    de: { name: "German (Deutsch)", flag: "🇩🇪" },
    pt: { name: "Portuguese (Português)", flag: "🇵🇹" },
    ja: { name: "Japanese (日本語)", flag: "🇯🇵" },
    ar: { name: "Arabic (العربية)", flag: "🇸🇦" },
    ru: { name: "Russian (Русский)", flag: "🇷🇺" },
    ko: { name: "Korean (한국어)", flag: "🇰🇷" },
    id: { name: "Indonesian (Bahasa Indonesia)", flag: "🇮🇩" },
  };


  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className="fixed bottom-10 md:bottom-20 right-10 md:right-20 z-[9999] p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg text-2xl flex items-center justify-center transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        aria-label="Change Language"
        title="Change Language"
      >
        <Globe size={26} />
      </button>

      {/* Floating Language Menu */}
      {isOpen && (
        <div className="fixed bottom-16 md:bottom-26 right-20 md:right-34 bg-white dark:bg-gray-800 rounded-xl shadow-2xl dark:shadow-black/50 z-[998] w-1/6 min-w-56 max-h-[400px] overflow-y-auto animate-in slide-in-from-bottom-2">
          {/* Header */}
          <div className="flex justify-between items-center p-3 border-b border-gray-200 sticky top-0 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-t-xl">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Select Language
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-none border-none cursor-pointer p-0 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Language List */}
          <div>
            {Object.entries(languages).map(([code, { name, flag }]) => (
              <button
                key={code}
                onClick={() => {
                  setLanguage(code);
                  changeLanguage(code);
                }}
                disabled={loading}
                className={`notranslate w-full text-left px-4 py-3 
                  border-b border-gray-100 dark:border-gray-700
                  hover:bg-gray-50 dark:hover:bg-gray-700
                  transition-colors duration-200 text-sm
                  text-gray-700 dark:text-gray-200
                  ${code === language ? "bg-emerald-50 dark:bg-emerald-900/30" : ""}
                  ${loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
                `}

              >
                <span className="text-lg mr-2">{flag}</span>
                {name}
                {loading && code === language && (
                  <span className="ml-2">⏳</span>
                )}
                {code === language && !loading && (
                  <span className="ml-2 text-emerald-600">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default LanguageToggle;