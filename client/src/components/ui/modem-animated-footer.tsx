import React from "react";
import { cn } from "@/lib/utils";

interface FooterProps {
  brandName?: string;
  logoSrc?: string;
  licenseUrl?: string;
  licenseName?: string;
  className?: string;
}

export const Footer = ({
  brandName = "BreatheEasy",
  logoSrc = "/favicon.png",
  licenseUrl = "https://github.com/prasoonk1204/BreatheEasy/blob/main/License.md",
  licenseName = "MIT License",
  className,
}: FooterProps) => {
  return (
    <section className={cn("relative w-full mt-0 overflow-hidden bg-emerald-50 dark:bg-emerald-900/10", className)}>
      <footer className="bg-emerald-50 dark:bg-emerald-900/10 mt-20 relative">
        <div className="max-w-7xl flex flex-col justify-center mx-auto min-h-[20rem] sm:min-h-[22rem] md:min-h-[25rem] relative p-4 py-10">
          
        </div>

        {/* Large background text */}
        <div 
          className="bg-gradient-to-b from-emerald-700/30 via-emerald-600/20 to-transparent dark:from-emerald-400/30 dark:via-emerald-500/20 dark:to-transparent bg-clip-text text-transparent leading-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 font-extrabold tracking-tighter pointer-events-none select-none text-center px-4"
          style={{
            fontSize: 'clamp(3rem, 12vw, 10rem)',
            maxWidth: '95vw'
          }}
        >
          {brandName.toUpperCase()}
        </div>

        {/* Bottom logo - without outer card wrapper */}
        <div className="absolute bottom-24 md:bottom-20 left-1/2 -translate-x-1/2 z-10">
          <div className="w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 bg-gradient-to-br from-green-500 to-green-600 dark:from-green-400 dark:to-green-500 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden hover:scale-110 transition-transform duration-400 drop-shadow-[0_0px_20px_rgba(0,0,0,0.5)] dark:drop-shadow-[0_0px_20px_rgba(255,255,255,0.3)]">
            <img 
              src={logoSrc} 
              alt={`${brandName} logo`}
              className="w-8 sm:w-10 md:w-16 h-8 sm:h-10 md:h-16 object-contain"
            />
          </div>
        </div>

        {/* Bottom shadow */}
        <div className="bg-gradient-to-t from-emerald-50 via-emerald-100/80 dark:from-emerald-900/10 dark:via-emerald-800/40 blur-[1em] to-emerald-50/40 dark:to-emerald-900/20 absolute bottom-28 w-full h-24"></div>

        {/* Copyright and License info at the bottom */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full flex flex-col gap-2 items-center justify-center px-4">
          <p className="text-base text-gray-700 dark:text-gray-300 text-center">
            © {new Date().getFullYear()} {brandName}. Open source under{" "}
            <a
              href={licenseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 dark:text-green-400 hover:underline transition-all duration-300"
            >
              {licenseName}
            </a>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Built with ❤️ by the open source community.
          </p>
        </div>
      </footer>
    </section>
  );
};
