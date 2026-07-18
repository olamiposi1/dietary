import React from "react";
import { motion } from "motion/react";

export default function FeaturesRow() {
  const features = [
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
    <div className="w-full mt-12 lg:mt-16 pt-10 border-t border-zinc-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feat, idx) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.12 }}
            whileHover={{ y: -4, shadow: "0 10px 25px -5px rgba(0,0,0,0.05)" }}
            className="flex items-center gap-4 p-5 bg-white border border-zinc-100 rounded-2xl shadow-sm hover:border-[#74C02A]/30 hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            {/* Icon Wrapper */}
            <div className="w-12 h-12 bg-[#74C02A]/10 rounded-xl flex items-center justify-center shrink-0">
              {feat.icon}
            </div>

            {/* Content */}
            <div className="flex flex-col">
              <span className="text-sm font-bold text-black font-sans tracking-tight">
                {feat.title}
              </span>
              <span className="text-xs text-zinc-500 font-medium mt-0.5">
                {feat.desc}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
