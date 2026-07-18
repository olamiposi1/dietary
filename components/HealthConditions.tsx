import React from "react";
import { motion } from "motion/react";
import { Activity, Heart, Shield, Sparkles, Scale, Apple } from "lucide-react";

export default function HealthConditions() {
  const conditions = [
    {
      id: "diabetes",
      title: "Diabetes",
      desc: "Healthy blood sugar meal plans.",
      badge: "Glycemic Control",
      icon: <Activity className="w-5 h-5 text-white" />,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80", // Salad / fresh ingredients
      color: "from-emerald-500 to-teal-600",
    },
    {
      id: "hypertension",
      title: "Hypertension",
      desc: "Low sodium recommendations.",
      badge: "Blood Pressure",
      icon: <Shield className="w-5 h-5 text-white" />,
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80", // Leafy greens, low sodium
      color: "from-[#4CAF50] to-emerald-600",
    },
    {
      id: "heart",
      title: "Heart Health",
      desc: "Heart-friendly nutrition.",
      badge: "Cardiovascular",
      icon: <Heart className="w-5 h-5 text-white" />,
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&auto=format&fit=crop&q=80", // Avocado and superfoods
      color: "from-red-500 to-pink-600",
    },
    {
      id: "kidney",
      title: "Kidney Disease",
      desc: "Balanced nutrient guidance.",
      badge: "Renal Care",
      icon: <Sparkles className="w-5 h-5 text-white" />,
      image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&auto=format&fit=crop&q=80", // Clean water, apple, light salad
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: "weight",
      title: "Weight Management",
      desc: "Healthy calorie plans.",
      badge: "Calorie Smart",
      icon: <Scale className="w-5 h-5 text-white" />,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80", // Nutrient dense grain bowl
      color: "from-amber-500 to-orange-600",
    },
    {
      id: "wellness",
      title: "General Wellness",
      desc: "Healthy eating for everyone.",
      badge: "Daily Vitality",
      icon: <Apple className="w-5 h-5 text-white" />,
      image: "https://images.unsplash.com/photo-1610970881699-44a5587caaec?w=600&auto=format&fit=crop&q=80", // Assorted premium berries and fruits
      color: "from-[#4CAF50] to-teal-600",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-zinc-50 border-t border-zinc-100" id="conditions">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16">
        
        {/* Section Header with Premium navigation details similar to reference */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4CAF50]/10 text-[#4CAF50] rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              Certified Dietetics
            </div>
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight text-black leading-tight">
              Browse by Health Condition
            </h2>
            <p className="text-zinc-500 mt-3 text-sm md:text-base leading-relaxed">
              Select your specific medical profile to instantly unlock professionally reviewed meal plan options customized perfectly for your health goals.
            </p>
          </div>

          {/* Clean custom pagination/arrows layout matching the reference top right feel */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button 
              aria-label="Previous conditions" 
              className="w-11 h-11 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-[#4CAF50] flex items-center justify-center text-zinc-600 hover:text-[#4CAF50] transition-all duration-300"
            >
              <svg className="w-5 h-5 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button 
              aria-label="Next conditions" 
              className="w-11 h-11 rounded-full bg-[#4CAF50] hover:bg-[#2E7D32] flex items-center justify-center text-white shadow-md shadow-[#4CAF50]/20 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Card Grid in high-fidelity layout matching the reference image's card border & design structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {conditions.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-white border-4 border-transparent hover:border-[#4CAF50]/80 transition-all duration-500 shadow-sm hover:shadow-2xl"
            >
              {/* Outer decorative soft green border layout element */}
              <div className="p-4">
                {/* Image Container with high quality Unsplash diet foods */}
                <div className="relative aspect-[4/3] rounded-[1.8rem] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Premium overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                  {/* Icon badge floating on top right of the card image */}
                  <div className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-[#4CAF50] flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}>
                    {item.icon}
                  </div>

                  {/* Badges on bottom-left of the card image */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm border border-zinc-100 rounded-full px-3 py-1 text-[11px] font-bold text-black uppercase tracking-wider shadow-sm">
                    {item.badge}
                  </div>
                </div>
              </div>

              {/* Text Information Container */}
              <div className="px-8 pb-8 pt-2 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-black group-hover:text-[#4CAF50] transition-colors duration-300 font-sans">
                    {item.title}
                  </h3>
                  
                  {/* Visual thin horizontal line divider matching reference card layout */}
                  <div className="w-12 h-0.5 bg-zinc-100 group-hover:bg-[#4CAF50] my-4 transition-all duration-300 group-hover:w-20" />
                  
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom interactive action */}
                <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-black group-hover:text-[#4CAF50] transition-colors">
                    Explore Diet
                  </span>
                  <div className="w-8 h-8 rounded-full bg-zinc-50 group-hover:bg-[#4CAF50]/10 flex items-center justify-center text-black group-hover:text-[#4CAF50] transition-colors">
                    <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Decorative green ambient glow on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#4CAF50] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
