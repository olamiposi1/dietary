import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, Eye, X, BookOpen, ChevronRight, Check } from "lucide-react";

interface Article {
  id: string;
  title: string;
  image: string;
  category: string;
  readTime: string;
  author: string;
  summary: string;
  content: string[];
}

export default function BlogSection() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const articles: Article[] = [
    {
      id: "art-1",
      title: "10 Foods That Help Control Blood Sugar",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
      category: "Endocrinology",
      readTime: "5 min read",
      author: "Dr. Melissa Vance, RD",
      summary: "Understand the biochemical properties of leafy greens, nuts, apple cider vinegar, and whole grains on modulating insulin responses.",
      content: [
        "Leafy Greens: Spinach and kale are rich in antioxidants and magnesium, which improve cellular insulin uptake.",
        "Chia Seeds: High in soluble fiber, which delays gastric emptying and slows down glucose absorption.",
        "Extra Virgin Olive Oil: Contains oleic acid, shown to improve fasting blood sugar and insulin sensitivity.",
        "Cinnamon: Mimics insulin and increases glucose transport into cells, reducing overall insulin demand.",
      ],
    },
    {
      id: "art-2",
      title: "Healthy Low-Sodium Recipes",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop&q=80",
      category: "Cardiology",
      readTime: "7 min read",
      author: "Chef Alan Dupree, Medical Chef",
      summary: "Learn how to replace standard sodium-packed culinary salt with healthy clinical herbs, spices, and acid adjustments.",
      content: [
        "Herb Lemon Salmon: Season wild salmon with lemon zest, rosemary, and cracked black pepper before baking.",
        "Spiced Lentil Broth: Use low-sodium vegetable stock infused with cumin, turmeric, garlic, and fresh mint.",
        "Zesty Avocado Salsa: Combine fresh diced avocados with cilantro, raw onions, and lime juice for maximum organic flavor without any added sodium.",
      ],
    },
    {
      id: "art-3",
      title: "Building Better Eating Habits",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
      category: "Behavioral Health",
      readTime: "4 min read",
      author: "Sarah Jenkins, Health Coach",
      summary: "Actionable routines to prevent nervous binge snacking, handle grocery aisles, and establish stable mindful eating habits.",
      content: [
        "The 20-Minute Rule: Sit down and take 20 minutes to finish your meal. This is the exact time required for leptin signals to reach your brain.",
        "Ditch the Screens: Avoid eating while watching television or checking your phone, as distraction leads to mindless calories.",
        "Structured Meal Timing: Consume meals at similar intervals daily to train healthy hormonal release patterns.",
      ],
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-1 bg-[#4CAF50] rounded-full" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Latest Publications
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black leading-tight">
              Clinical Health Articles
            </h2>
            <p className="text-zinc-500 mt-3 text-sm md:text-base leading-relaxed">
              Read our latest scientifically vetted articles written by certified endocrinologists, registered dietitians, and behavior coaches.
            </p>
          </div>

          <span className="text-xs font-bold text-zinc-400">
            Updated weekly
          </span>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((art, idx) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="group flex flex-col justify-between bg-zinc-50 border border-zinc-100/80 hover:border-[#4CAF50]/30 rounded-[2rem] overflow-hidden transition-all duration-300"
            >
              {/* Cover Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 shrink-0">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-zinc-100 rounded-full px-3.5 py-1 text-[10px] font-bold text-black uppercase tracking-wider">
                  {art.category}
                </span>
              </div>

              {/* Content Body */}
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-zinc-300" />
                      {art.readTime}
                    </span>
                    <span>•</span>
                    <span>By {art.author.split(",")[0]}</span>
                  </div>

                  <h3 className="text-lg font-bold text-black group-hover:text-[#4CAF50] transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-zinc-500 leading-relaxed mt-3">
                    {art.summary}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedArticle(art)}
                    className="text-xs font-bold text-[#4CAF50] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Read Full Article</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <span className="text-[10px] font-mono text-zinc-300">
                    Medical Vetted
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Modal Overlay */}
        <AnimatePresence>
          {selectedArticle && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedArticle(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden z-10 border border-zinc-100 flex flex-col max-h-[90vh]"
              >
                {/* Header Image */}
                <div className="relative aspect-[16/9] w-full shrink-0">
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
                  
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="absolute top-6 right-6 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>

                  <div className="absolute bottom-6 left-8 right-8">
                    <span className="inline-block bg-[#4CAF50] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                      {selectedArticle.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white leading-tight">
                      {selectedArticle.title}
                    </h3>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-8 overflow-y-auto flex-grow space-y-6">
                  
                  <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-zinc-100 pb-4">
                    <span>Written by: <strong>{selectedArticle.author}</strong></span>
                    <span>Read Time: <strong>{selectedArticle.readTime}</strong></span>
                  </div>

                  <p className="text-sm text-zinc-600 leading-relaxed italic">
                    "{selectedArticle.summary}"
                  </p>

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-[#4CAF50]" />
                      <span>Key Clinical Insights & Guidelines</span>
                    </h4>

                    <div className="space-y-3">
                      {selectedArticle.content.map((point, index) => (
                        <div key={index} className="p-4 bg-zinc-50 border border-zinc-100 rounded-2xl flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#4CAF50]/10 text-[#4CAF50] flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                            {index + 1}
                          </div>
                          <p className="text-xs text-zinc-500 leading-relaxed">
                            {point}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Footer */}
                <div className="p-6 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-[#4CAF50] uppercase tracking-wider">
                    ✓ Verified by Clinical Council
                  </span>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-6 py-2.5 bg-black hover:bg-zinc-800 text-white font-bold rounded-full text-xs cursor-pointer"
                  >
                    Close Article
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
