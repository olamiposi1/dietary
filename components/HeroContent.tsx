import React from "react";
import { motion } from "motion/react";
import { Star, ArrowRight, Sparkles, Activity } from "lucide-react";

interface HeroContentProps {
  onStartJourney?: () => void;
  onTalkToAI?: () => void;
}

export default function HeroContent({ onStartJourney, onTalkToAI }: HeroContentProps) {
  const cards = [
    {
      icon: <span className="text-2xl">🍎</span>,
      title: "Personalized Diet Plans",
      desc: "Designed around your health condition.",
    },
    {
      icon: <span className="text-2xl">❤️</span>,
      title: "Doctor-Friendly Recommendations",
      desc: "Evidence-informed nutrition guidance.",
    },
    {
      icon: <span className="text-2xl">📈</span>,
      title: "Progress Monitoring",
      desc: "Track your meals and health goals.",
    },
    {
      icon: <span className="text-2xl">🔒</span>,
      title: "Private & Secure",
      desc: "Your health information stays protected.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto py-12 md:py-20 font-sans">
      
      {/* Centered Main Headline with inline logo matching the style of the reference image */}
      <motion.h1 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-black leading-[1.15] mb-6 max-w-4xl"
      >
        Your AI Nutrition Partner 
        <span className="inline-flex items-center justify-center bg-white border-2 border-[#4CAF50] shadow-[4px_4px_0px_0px_rgba(76,175,80,1)] rounded-xl p-2 mx-3 align-middle w-12 h-12 md:w-16 md:h-16 shrink-0 transform hover:rotate-6 transition-transform duration-300">
          <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-[#4CAF50]" />
        </span>
        for Healthier Living
      </motion.h1>

      {/* Subheading */}
      <motion.p 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-base sm:text-lg md:text-xl text-zinc-700 font-normal tracking-wide leading-relaxed max-w-3xl mb-10"
      >
        Manage diabetes, hypertension, heart disease, kidney conditions, weight goals, and more with personalized AI meal recommendations, intelligent nutrition guidance, and daily diet monitoring.
      </motion.p>

      {/* Main Call to Action Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="flex flex-wrap items-center justify-center gap-4 mb-10"
      >
        {/* Primary Action */}
        <button
          onClick={onStartJourney}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-[#4CAF50] hover:bg-[#2E7D32] text-white font-extrabold text-xs tracking-wider rounded-full shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 cursor-pointer uppercase"
        >
          <span>Start Your Health Journey</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Secondary Action */}
        <button
          onClick={onTalkToAI}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent hover:bg-zinc-50 text-black font-extrabold text-xs tracking-wider border-2 border-[#4CAF50] rounded-full hover:translate-y-[-2px] transition-all duration-300 cursor-pointer uppercase animate-pulse"
        >
          <Activity className="w-4 h-4 text-[#4CAF50]" />
          <span>Talk to AI Assistant</span>
        </button>
      </motion.div>

      {/* Trust Rating Block Below Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="flex flex-col items-center justify-center gap-2 mb-16"
      >
        {/* Five gold stars */}
        <div className="flex items-center gap-1 text-amber-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current" />
          ))}
        </div>
        <p className="text-xs sm:text-sm font-semibold tracking-wide text-zinc-800 max-w-md">
          Trusted by thousands of users improving their health every day.
        </p>
      </motion.div>

      {/* TRUST BAR: Four Premium Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45 }}
        className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-zinc-200/80"
      >
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center sm:items-start text-center sm:text-left p-6 bg-white border-2 border-[#4CAF50] shadow-[4px_4px_0px_0px_rgba(76,175,80,1)] rounded-2xl hover:translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(76,175,80,1)] transition-all duration-200 cursor-default"
          >
            {/* Premium Icon box */}
            <div className="w-12 h-12 bg-[#4CAF50]/5 border border-[#4CAF50]/15 rounded-xl flex items-center justify-center shrink-0 mb-4 shadow-sm">
              {card.icon}
            </div>

            {/* Title */}
            <h3 className="text-sm font-extrabold text-black uppercase tracking-wider mb-2">
              {card.title}
            </h3>

            {/* Description */}
            <p className="text-xs text-zinc-600 font-medium leading-relaxed">
              {card.desc}
            </p>
          </div>
        ))}
      </motion.div>

    </div>
  );
}
