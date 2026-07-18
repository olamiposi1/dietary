import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles, Activity } from "lucide-react";

interface HeaderProps {
  isDashboardMode?: boolean;
  onToggleDashboard?: () => void;
}

export default function Header({ 
  isDashboardMode = false,
  onToggleDashboard
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home", active: !isDashboardMode },
    { label: "Conditions", href: "#conditions" },
    { label: "Meal Plans", href: "#meals" },
    { label: "Clinical Tips", href: "#tips" },
  ];

  return (
    <div className={`w-full z-50 transition-all duration-300 ${
      isScrolled ? "fixed top-3 left-0 right-0 px-4 md:px-8" : "relative pt-6 px-4 md:px-8"
    }`}>
      {/* Floating Pill Container */}
      <div className="max-w-5xl mx-auto">
        <header className="relative w-full bg-white/95 backdrop-blur-md rounded-full border border-zinc-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.1)] transition-all duration-300 px-6 py-2.5 flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <span className="text-base font-extrabold tracking-widest text-[#4CAF50] font-sans uppercase">
              DIETARY
            </span>
            <span className="px-2 py-0.5 bg-[#4CAF50]/10 text-[#4CAF50] text-[9px] font-black tracking-wider rounded-md uppercase">
              AI Health
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-xs font-semibold tracking-wide transition-colors duration-200 relative py-1 text-black hover:text-[#4CAF50]`}
              >
                {item.label}
                {item.active && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#4CAF50] rounded-full" />
                )}
              </a>
            ))}
          </nav>

          {/* Action Button (AI Portal Switch) */}
          <div className="flex items-center gap-2.5">
            {/* Interactive client portal switch indicator */}
            <button
              onClick={onToggleDashboard}
              className="px-5 py-2.5 bg-[#4CAF50] hover:bg-[#2E7D32] text-white text-[11px] font-bold tracking-wider rounded-full shadow-sm hover:shadow transition-all duration-300 cursor-pointer flex items-center gap-1.5 uppercase"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isDashboardMode ? "Exit Portal" : "AI Portal"}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full text-black hover:bg-zinc-50 transition-all duration-200 border border-zinc-100 md:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </header>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 bg-white rounded-3xl border border-zinc-200/90 shadow-xl p-5 md:hidden z-50 animate-in fade-in slide-in-from-top-3 duration-200">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-semibold py-2 px-3 rounded-xl transition-colors ${
                  item.active 
                    ? "bg-[#4CAF50]/10 text-[#4CAF50]" 
                    : "text-black hover:bg-zinc-50"
                }`}
              >
                {item.label}
              </a>
            ))}
            
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (onToggleDashboard) onToggleDashboard();
              }}
              className="mt-2 w-full py-3 bg-[#4CAF50] hover:bg-[#2E7D32] text-white text-xs font-bold rounded-full uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isDashboardMode ? "Exit Portal" : "AI Portal"}</span>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
