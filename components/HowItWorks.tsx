import React from "react";
import { motion } from "motion/react";
import { UserPlus, Sparkles, TrendingUp } from "lucide-react";

interface HowItWorksProps {
  onStartJourney?: () => void;
}

export default function HowItWorks({ onStartJourney }: HowItWorksProps) {
  const steps = [
    {
      number: "01",
      title: "Create Your Health Profile",
      desc: "Enter your age, weight, allergies, medical conditions, activity level and dietary preferences.",
      icon: <UserPlus className="w-6 h-6 text-[#1e5c3c]" />,
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80", // Yoga / health setup
      badge: "Fast & Private",
    },
    {
      number: "02",
      title: "Receive Personalized Meal Plans",
      desc: "Our system generates balanced meal recommendations tailored to your health needs.",
      icon: <Sparkles className="w-6 h-6 text-[#1e5c3c]" />,
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&auto=format&fit=crop&q=80", // Salad bowl / nutritionist meal
      badge: "AI Powered",
    },
    {
      number: "03",
      title: "Track Your Progress",
      desc: "Log meals, monitor habits, and improve your nutrition over time.",
      icon: <TrendingUp className="w-6 h-6 text-[#1e5c3c]" />,
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80", // Fitness tracker / fresh fruits
      badge: "Real-time Insights",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16">
        
        {/* Header Layout following the reference image styling */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            {/* Top tiny label with line accent matching the reference image */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-1 bg-[#1e5c3c] rounded-full" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                How It Works
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black leading-tight">
              Achieve Better Health in Three Steps
            </h2>
          </div>

          <div className="md:max-w-xs text-left md:text-right">
            <p className="text-sm md:text-base font-medium text-zinc-500 italic leading-relaxed">
              Fully customized plans, backed by certified dietary evidence.
            </p>
          </div>
        </div>

        {/* 3-Step Grid matching the style layout & massive background numbers from the reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              onClick={onStartJourney}
              className="group relative h-[360px] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-zinc-100 bg-zinc-950"
            >
              {/* Background Unsplash Image with beautiful dark mask */}
              <div className="absolute inset-0 z-0">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover opacity-30 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                {/* Gradient shade to ensure text remains perfectly readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
              </div>

              {/* Huge stylized background digits matching reference image layout */}
              <span className="absolute left-6 top-6 text-7xl md:text-8xl font-black text-white/10 select-none tracking-tighter font-sans group-hover:text-white/20 transition-all duration-500">
                {step.number}
              </span>

              {/* Floating micro-badge on top-right */}
              <div className="absolute top-6 right-6 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/15 text-[10px] font-bold text-white uppercase tracking-wider">
                {step.badge}
              </div>

              {/* Card content aligned nicely at the bottom */}
              <div className="absolute inset-x-0 bottom-0 p-8 z-10 flex flex-col justify-end">
                {/* Animated icon wrapper */}
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:bg-[#1e5c3c] transition-all duration-300">
                  <div className="group-hover:text-white transition-colors duration-300">
                    {React.cloneElement(step.icon, {
                      className: "w-5 h-5 text-[#1e5c3c] group-hover:text-white transition-colors",
                    })}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                  {step.title}
                </h3>
                
                <p className="text-zinc-300 text-sm leading-relaxed font-sans font-medium">
                  {step.desc}
                </p>
              </div>

              {/* Hover highlight bottom border */}
              <div className="absolute bottom-0 inset-x-0 h-1.5 bg-[#1e5c3c] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>

        {/* Ready to start panel matching the style in the bottom left/right of reference image */}
        <div className="mt-16 pt-10 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-md">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1e5c3c]">
              Ready to get started?
            </span>
            <p className="text-sm text-zinc-500 mt-1 leading-relaxed">
              Create a free health account in 2 minutes and explore custom-crafted meal suggestions suited perfectly for your needs.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStartJourney}
            className="px-8 py-3.5 bg-[#1e5c3c] hover:bg-[#15412a] text-white font-bold rounded-full shadow-lg shadow-[#1e5c3c]/10 cursor-pointer text-sm tracking-wide transition-all duration-300"
          >
            Create Free Account
          </motion.button>
        </div>

      </div>
    </section>
  );
}
