import React from "react";
import { motion } from "motion/react";
import { Check, Star, Sparkles, ShieldCheck, HeartPulse } from "lucide-react";

export default function WhyChoose() {
  const pillars = [
    { value: "AI-Powered", label: "Meal Recommendations", desc: "Personalized plans generated around your specific health conditions and goals." },
    { value: "Condition-Aware", label: "Guidance", desc: "Tailored nutrition support for diabetes, hypertension, kidney health, and more." },
    { value: "24/7", label: "Nutrition Assistant", desc: "Ask questions anytime and get grounded, food-focused answers." },
    { value: "Private", label: "By Design", desc: "Your health information stays yours — encrypted and never sold." },
  ];

  return (
    <section className="py-20 md:py-28 bg-zinc-50 border-t border-zinc-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Side: AI Assistant illustration */}
          <div className="relative">
            {/* Background design accents */}
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#4CAF50]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Main illustration container styled as an AI nutrition assistant preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative bg-white border border-zinc-200/60 rounded-[2.5rem] p-6 md:p-8 shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6 border-b border-zinc-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#4CAF50]/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#4CAF50]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-black uppercase tracking-wider">AI Nutrition Assistant</h3>
                    <p className="text-[10px] text-zinc-400">Example conversation preview</p>
                  </div>
                </div>

                <span className="text-[10px] bg-[#4CAF50]/10 text-[#4CAF50] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Illustrative
                </span>
              </div>

              {/* Sample food imagery */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="relative aspect-[4/3] rounded-2xl bg-zinc-100 overflow-hidden border border-zinc-200/30 shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=80"
                    alt="Healthy balanced meal"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="relative aspect-[4/3] rounded-2xl bg-zinc-100 overflow-hidden border border-zinc-200/30 shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=80"
                    alt="Fresh nutritious ingredients"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

              </div>

              {/* Floating example AI response overlay */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute bottom-6 md:bottom-12 right-2 md:-right-6 bg-zinc-900 text-white rounded-3xl p-5 shadow-2xl max-w-[240px] border border-zinc-800"
              >
                <div className="flex items-center gap-2 mb-3">
                  <HeartPulse className="w-4.5 h-4.5 text-[#4CAF50]" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-300">
                    Example AI Response
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans font-medium">
                  "Let's focus on legumes and healthy omega-3 fats to support your cardiovascular health."
                </p>
                <div className="mt-3 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]" />
                  <span className="text-[9px] text-[#4CAF50] uppercase font-bold tracking-widest">Sample Output</span>
                </div>
              </motion.div>

              {/* Secondary floating check overlay */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-6 p-4 bg-zinc-50 border border-zinc-100 rounded-2xl flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-[#4CAF50] text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-extrabold text-black uppercase tracking-wide">Private & Secure</h4>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Your health information is encrypted and never sold.</p>
                </div>
              </motion.div>

            </motion.div>
          </div>

          {/* Right Side: Copy & Pillars */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-1 bg-[#4CAF50] rounded-full" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                A Better Method
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black leading-tight">
              Why Choose Dietary?
            </h2>
            <p className="text-zinc-500 mt-4 mb-12 text-sm md:text-base leading-relaxed">
              We bridge the gap between general nutrition advice and your actual health condition. No generic meal plans — just AI-assisted guidance personalized to what you're actually managing.
            </p>

            {/* Grid of pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pillars.map((pillar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col text-left"
                >
                  <span className="text-2xl md:text-3xl font-extrabold text-black font-sans tracking-tight">
                    {pillar.value}
                  </span>
                  <span className="text-xs font-bold text-[#4CAF50] uppercase tracking-wider mt-1.5">
                    {pillar.label}
                  </span>
                  <p className="text-zinc-400 text-xs leading-relaxed mt-1">
                    {pillar.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}