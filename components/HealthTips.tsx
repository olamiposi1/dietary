import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Apple, Ban, Droplet, Dumbbell, Activity, Heart, X, Check } from "lucide-react";

interface Tip {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  shortDesc: string;
  longDesc: string;
  details: string[];
}

export default function HealthTips() {
  const [activeTip, setActiveTip] = useState<Tip | null>(null);

  const tips: Tip[] = [
    {
      id: "tip-1",
      title: "Healthy Eating Habits",
      category: "Nutrition",
      icon: <Apple className="w-6 h-6 text-[#74C02A]" />,
      shortDesc: "Prioritize nutrient-dense foods, practice mindful eating, and balance your macro ratios.",
      longDesc: "Developing sound eating habits is the cornerstone of managing chronic conditions. Eating slowly allows your gut to signal fullness, preventing overeating. Focus on colorful organic plates consisting of healthy fats, complex carbs, and clean protein.",
      details: [
        "Include a raw vegetable serving in every main meal.",
        "Chew your food 20-30 times to aid initial digestive enzymes.",
        "Stop eating when you feel 80% full to prevent insulin spikes.",
      ],
    },
    {
      id: "tip-2",
      title: "Foods to Avoid",
      category: "Condition Management",
      icon: <Ban className="w-6 h-6 text-red-500" />,
      shortDesc: "Steer clear of ultra-processed grains, hidden sugars, and hydrogenated trans fats.",
      longDesc: "Many commercial packaged goods contain hidden sodium and high-fructose corn syrup that spike blood glucose levels and elevate blood pressure. Always read ingredients lists and aim for single-ingredient items.",
      details: [
        "Avoid white refined bread, sodas, and synthetic sweeteners.",
        "Check labels for dextrose, maltodextrin, and hydrogenated oils.",
        "Limit restaurant meals which are heavily cooked in pro-inflammatory seed oils.",
      ],
    },
    {
      id: "tip-3",
      title: "Hydration Tips",
      category: "Daily Habits",
      icon: <Droplet className="w-6 h-6 text-blue-500" />,
      shortDesc: "Maintain kidney function and improve metabolic waste clearance with correct fluid intake.",
      longDesc: "Hydration keeps blood viscosity within optimal ranges, helping maintain low blood pressure and easing the workload on your cardiovascular system. Drink pure water consistently throughout the day.",
      details: [
        "Drink a warm glass of water first thing in the morning to activate digestion.",
        "Keep a glass next to your desk and take small sips every 15-20 minutes.",
        "Substitute coffee with mineralizing herbal teas such as hibiscus or chamomile.",
      ],
    },
    {
      id: "tip-4",
      title: "Exercise Recommendations",
      category: "Activity",
      icon: <Dumbbell className="w-6 h-6 text-orange-500" />,
      shortDesc: "Implement moderate-intensity aerobic activities to increase insulin sensitivity.",
      longDesc: "Regular physical activity causes muscles to consume glucose for energy, lowering circulating blood sugar levels. Aim for at least 150 minutes of moderate activity weekly.",
      details: [
        "Commit to a brisk 20-minute walk after your largest meal of the day.",
        "Incorporate light resistance training twice a week to build glucose-storing muscle.",
        "Monitor your heart rate, staying in zone 2 for active recovery.",
      ],
    },
    {
      id: "tip-5",
      title: "Managing Blood Sugar",
      category: "Metabolic Health",
      icon: <Activity className="w-6 h-6 text-rose-500" />,
      shortDesc: "Keep your glucose levels within safe parameters by timing your carbohydrates.",
      longDesc: "Pair complex carbohydrates with healthy dietary fats or proteins to delay gastric emptying. This simple trick prevents extreme glucose peaks and matching insulin crashes.",
      details: [
        "Never consume 'naked' carbs on an empty stomach.",
        "Always eat leafy greens and protein first, leaving starch for the end of the meal.",
        "Utilize high-quality apple cider vinegar before carb-heavy lunches.",
      ],
    },
    {
      id: "tip-6",
      title: "Reducing Sodium Intake",
      category: "Cardiovascular",
      icon: <Heart className="w-6 h-6 text-pink-500" />,
      shortDesc: "Protect your arteries and kidney filtration by lowering chemical table salt.",
      longDesc: "Excess sodium pulls fluid into your bloodstream, increasing blood volume and placing extra pressure on vessel walls. Flavor meals organically with health-promoting spices instead.",
      details: [
        "Replace table salt with potassium-rich herbs like rosemary, oregano, and garlic.",
        "Rinse canned organic beans thoroughly to remove processing brine.",
        "Avoid cured meats and pre-packaged instant soups or instant noodles.",
      ],
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-1 bg-[#74C02A] rounded-full" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Weekly Insights
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black leading-tight">
              Essential Health Tips
            </h2>
            <p className="text-zinc-500 mt-3 text-sm md:text-base leading-relaxed">
              Actionable wellness guides and evidence-based nutrition tips to assist your therapeutic dietary habits.
            </p>
          </div>
          
          <span className="text-xs font-bold text-zinc-400">
            6 medical resources published
          </span>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip, idx) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="group flex flex-col justify-between p-8 rounded-[2rem] bg-zinc-50 border border-zinc-100/80 hover:border-[#74C02A]/30 hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              <div>
                {/* Category & Icon Row */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest bg-zinc-200/50 group-hover:bg-[#74C02A]/10 text-zinc-500 group-hover:text-[#74C02A] px-3 py-1 rounded-full transition-colors">
                    {tip.category}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                    {tip.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-black font-sans mb-3 group-hover:text-[#74C02A] transition-colors">
                  {tip.title}
                </h3>

                <p className="text-sm text-zinc-500 leading-relaxed">
                  {tip.shortDesc}
                </p>
              </div>

              {/* Read More button */}
              <div className="mt-8 pt-4 border-t border-zinc-200/40 flex items-center justify-between">
                <button
                  onClick={() => setActiveTip(tip)}
                  className="text-xs font-bold text-black group-hover:text-[#74C02A] transition-colors uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  <span>Read Full Guide</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for Reading Tips */}
        <AnimatePresence>
          {activeTip && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveTip(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-8 z-10 border border-zinc-100 overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveTip(null)}
                  className="absolute top-6 right-6 w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Modal Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[#74C02A]/10 rounded-2xl flex items-center justify-center shrink-0">
                    {activeTip.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#74C02A] bg-[#74C02A]/10 px-2.5 py-0.5 rounded-full">
                      {activeTip.category}
                    </span>
                    <h3 className="text-2xl font-bold text-black mt-1">
                      {activeTip.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {activeTip.longDesc}
                  </p>

                  <div className="pt-4 border-t border-zinc-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-3">
                      Actionable Recommendations
                    </h4>
                    <ul className="space-y-2.5">
                      {activeTip.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-500">
                          <Check className="w-4 h-4 text-[#74C02A] shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-4 border-t border-zinc-100 flex justify-end">
                  <button
                    onClick={() => setActiveTip(null)}
                    className="px-6 py-2.5 bg-[#74C02A] hover:bg-[#62aa21] text-black font-bold rounded-full text-xs shadow-md shadow-[#74C02A]/10 cursor-pointer"
                  >
                    Close Resource
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
