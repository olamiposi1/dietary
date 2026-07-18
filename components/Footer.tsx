import React from "react";
import { Heart, Globe, Linkedin, Twitter, MessageSquare, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white border-t border-zinc-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16">
        
        {/* Upper Column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-zinc-900">
          
          {/* Brand & Mission column */}
          <div className="lg:col-span-5 text-left space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#4CAF50] flex items-center justify-center shadow-md">
                <span className="text-white text-sm font-bold font-sans">D</span>
              </div>
              <span className="text-lg font-black tracking-tight font-sans">Dietary</span>
            </div>

            <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-sm">
              Our clinical mission is to empower individuals living with complex chronic medical conditions to navigate their metabolic and nutrient thresholds naturally, safely, and beautifully through personalized diet monitoring.
            </p>

            <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-bold uppercase tracking-wider bg-zinc-900 w-fit px-3 py-1.5 rounded-full border border-zinc-800">
              <ShieldCheck className="w-4 h-4 text-[#4CAF50]" />
              <span>Vetted by Clinical Advisory Council</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 text-left space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li><a href="#home" className="hover:text-white hover:underline transition-colors">Home</a></li>
              <li><a href="#meals" className="hover:text-white hover:underline transition-colors">Meal Plans</a></li>
              <li><a href="#recipes" className="hover:text-white hover:underline transition-colors">Recipes</a></li>
              <li><a href="#about" className="hover:text-white hover:underline transition-colors">About Portal</a></li>
            </ul>
          </div>

          {/* Resources & Compliance Column */}
          <div className="lg:col-span-2 text-left space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li><a href="#privacy" className="hover:text-white hover:underline transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white hover:underline transition-colors">Terms of Service</a></li>
              <li><a href="#support" className="hover:text-white hover:underline transition-colors">Client Support</a></li>
              <li><a href="#contact" className="hover:text-white hover:underline transition-colors">Contact Clinical</a></li>
            </ul>
          </div>

          {/* Contacts & Social Media column */}
          <div className="lg:col-span-3 text-left space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Medical Connect
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Questions about clinical studies, diagnostic thresholds or API partnerships? Get in touch.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-xl text-zinc-400 hover:text-[#4CAF50] transition-colors border border-zinc-800">
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-xl text-zinc-400 hover:text-[#4CAF50] transition-colors border border-zinc-800">
                <Twitter className="w-4.5 h-4.5" />
              </a>
              <a href="https://globe.com" target="_blank" rel="noopener noreferrer" aria-label="Website" className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-xl text-zinc-400 hover:text-[#4CAF50] transition-colors border border-zinc-800">
                <Globe className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Lower copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 text-center">
          <span>
            © 2026 Dietary, Inc. All rights reserved. Vetted under FDA digital health framework.
          </span>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
            <span>for clinical wellness.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
