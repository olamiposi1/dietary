import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flame, Star, Activity, Heart, Shield, Plus, X, Check, Clock } from "lucide-react";

interface Meal {
  id: string;
  name: string;
  image: string;
  category: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  suitableFor: string;
  badge: string;
  prepTime: string;
  ingredients: string[];
  instructions: string[];
}

export default function FeaturedMealPlans() {
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  const meals: Meal[] = [
    {
      id: "meal-1",
      name: "Avocado & Quinoa Breakfast Bowl",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
      category: "Breakfast",
      calories: "320 kcal",
      protein: "12g Protein",
      carbs: "38g Carbs",
      fat: "14g Fat",
      suitableFor: "Diabetes Management",
      badge: "High Fiber",
      prepTime: "15 mins",
      ingredients: [
        "1/2 ripe avocado, sliced",
        "1/2 cup cooked organic quinoa",
        "1 cup organic baby spinach",
        "1 soft boiled organic egg",
        "1 tbsp pumpkin seeds",
        "Drizzle of extra virgin olive oil",
      ],
      instructions: [
        "Warm the cooked quinoa slightly if desired, or serve chilled.",
        "Arrange the baby spinach at the base of your serving bowl.",
        "Add quinoa, sliced avocado, and the halved soft-boiled egg.",
        "Sprinkle with pumpkin seeds and drizzle with extra virgin olive oil.",
      ],
    },
    {
      id: "meal-2",
      name: "Crispy Herb-Crusted Baked Salmon",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop&q=80",
      category: "Lunch / Dinner",
      calories: "450 kcal",
      protein: "34g Protein",
      carbs: "8g Carbs",
      fat: "22g Fat",
      suitableFor: "Heart Health",
      badge: "Omega-3 Rich",
      prepTime: "25 mins",
      ingredients: [
        "6 oz wild-caught salmon fillet",
        "1 tbsp finely chopped fresh parsley",
        "1 tbsp finely chopped fresh dill",
        "1/2 tbsp whole wheat breadcrumbs",
        "1 tsp lemon zest",
        "Asparagus spears for side",
      ],
      instructions: [
        "Preheat oven to 400°F (200°C) and line a baking sheet with parchment paper.",
        "Mix the herbs, breadcrumbs, lemon zest, and a tiny pinch of black pepper.",
        "Press the herb mixture gently onto the top of the salmon fillet.",
        "Bake for 12-15 minutes alongside asparagus until the salmon flakes easily.",
      ],
    },
    {
      id: "meal-3",
      name: "Low-Sodium Garden Lentil Soup",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
      category: "Lunch",
      calories: "280 kcal",
      protein: "18g Protein",
      carbs: "42g Carbs",
      fat: "4g Fat",
      suitableFor: "Hypertension",
      badge: "Low Sodium",
      prepTime: "35 mins",
      ingredients: [
        "3/4 cup brown or green lentils, rinsed",
        "1 diced carrot & 1 diced celery stalk",
        "1/2 chopped yellow onion",
        "2 cloves garlic, minced",
        "3 cups low-sodium vegetable broth",
        "1/2 tsp dried oregano & thyme",
      ],
      instructions: [
        "Sauté the onion, garlic, carrot, and celery in a pot with a splash of water.",
        "Add lentils, broth, oregano, and thyme. Bring to a boil.",
        "Reduce heat, cover, and simmer for 25-30 minutes until lentils are tender.",
        "Blend a small portion of the soup to create a creamy texture if desired.",
      ],
    },
    {
      id: "meal-4",
      name: "Wild Berry Greek Yogurt Parfait",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80",
      category: "Snack / Breakfast",
      calories: "240 kcal",
      protein: "22g Protein",
      carbs: "26g Carbs",
      fat: "3g Fat",
      suitableFor: "Weight Management",
      badge: "High Protein",
      prepTime: "5 mins",
      ingredients: [
        "1 cup plain non-fat Greek yogurt",
        "1/2 cup fresh mixed berries (strawberries, blueberries)",
        "2 tbsp gluten-free rolled oats",
        "1 tsp chia seeds",
        "Tiny drizzle of raw organic honey",
      ],
      instructions: [
        "Spoon half of the Greek yogurt into a glass or bowl.",
        "Add a layer of mixed berries and chia seeds.",
        "Top with the remaining yogurt and garnish with oats and remaining berries.",
        "Drizzle raw honey on top right before serving.",
      ],
    },
    {
      id: "meal-5",
      name: "Low-Potassium Veggie Stir-Fry",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
      category: "Dinner",
      calories: "310 kcal",
      protein: "8g Protein",
      carbs: "45g Carbs",
      fat: "9g Fat",
      suitableFor: "Kidney Disease",
      badge: "Renal Friendly",
      prepTime: "20 mins",
      ingredients: [
        "1 cup cooked white jasmine rice",
        "1/2 cup bell peppers, sliced",
        "1/2 cup zucchini, sliced",
        "1/2 cup onions, sliced",
        "1 tbsp sesame oil",
        "1 tsp low-sodium soy sauce",
      ],
      instructions: [
        "Heat sesame oil in a wok or large pan over medium-high heat.",
        "Add zucchini, bell peppers, and onions, cooking for 5-7 minutes.",
        "Stir in the low-sodium soy sauce and toss until well combined.",
        "Serve hot over a bed of warm jasmine rice.",
      ],
    },
    {
      id: "meal-6",
      name: "Mediterranean Chickpea & Salad",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
      category: "Lunch / Dinner",
      calories: "390 kcal",
      protein: "14g Protein",
      carbs: "48g Carbs",
      fat: "12g Fat",
      suitableFor: "General Wellness",
      badge: "High Fiber",
      prepTime: "10 mins",
      ingredients: [
        "1 cup canned organic chickpeas, rinsed",
        "1/2 cup diced English cucumber",
        "1/2 cup cherry tomatoes, halved",
        "2 tbsp crumbled feta cheese",
        "1 tbsp fresh lemon juice",
        "1 tbsp chopped fresh mint",
      ],
      instructions: [
        "In a medium bowl, combine the chickpeas, cucumber, and cherry tomatoes.",
        "Toss with fresh lemon juice and chopped fresh mint.",
        "Gently fold in the crumbled feta cheese.",
        "Serve immediately or let sit for 15 minutes to allow flavors to meld.",
      ],
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white" id="meals">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16">
        
        {/* Header Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-1 bg-[#4CAF50] rounded-full" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Weekly Selections
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black leading-tight">
              Featured Meal Plans
            </h2>
            <p className="text-zinc-500 mt-3 text-sm md:text-base leading-relaxed">
              Discover nutrition-packed menus curated by certified clinical dietitians. Tailored nutrient thresholds for precise diet monitoring.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4CAF50] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-black">
              Updated Daily
            </span>
          </div>
        </div>

        {/* Grid of 6 Meal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {meals.map((meal, idx) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="group flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-zinc-100 bg-white hover:border-[#4CAF50]/30 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Image & Badges Container */}
              <div className="relative aspect-[16/11] overflow-hidden bg-zinc-100">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Suitable For - Tag Floating */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-zinc-100 rounded-full px-3.5 py-1.5 text-xs font-extrabold text-black uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]" />
                  {meal.suitableFor}
                </div>

                {/* Nutrition Badge - Top Right */}
                <div className="absolute top-4 right-4 bg-[#4CAF50] text-white rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest shadow-sm">
                  {meal.badge}
                </div>

                {/* Bottom elegant category indicator */}
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-[11px] font-medium text-white tracking-wide">
                  {meal.category}
                </div>
              </div>

              {/* Meal description & content */}
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-black group-hover:text-[#4CAF50] transition-colors duration-300 leading-snug">
                    {meal.name}
                  </h3>
                  
                  {/* Grid of Micro Nutrition metrics */}
                  <div className="grid grid-cols-4 gap-2.5 my-6">
                    <div className="bg-zinc-50 group-hover:bg-zinc-100/50 rounded-xl p-2.5 text-center transition-colors">
                      <Flame className="w-4 h-4 text-orange-500 mx-auto mb-1" />
                      <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Cal</span>
                      <span className="block text-xs font-extrabold text-black mt-0.5">{meal.calories.split(" ")[0]}</span>
                    </div>

                    <div className="bg-zinc-50 group-hover:bg-zinc-100/50 rounded-xl p-2.5 text-center transition-colors">
                      <span className="block text-[10px] font-bold text-[#4CAF50] uppercase tracking-wider">Prot</span>
                      <span className="block text-xs font-extrabold text-black mt-2">{meal.protein.split(" ")[0]}</span>
                    </div>

                    <div className="bg-zinc-50 group-hover:bg-zinc-100/50 rounded-xl p-2.5 text-center transition-colors">
                      <span className="block text-[10px] font-bold text-blue-500 uppercase tracking-wider">Carb</span>
                      <span className="block text-xs font-extrabold text-black mt-2">{meal.carbs.split(" ")[0]}</span>
                    </div>

                    <div className="bg-zinc-50 group-hover:bg-zinc-100/50 rounded-xl p-2.5 text-center transition-colors">
                      <span className="block text-[10px] font-bold text-pink-500 uppercase tracking-wider">Fat</span>
                      <span className="block text-xs font-extrabold text-black mt-2">{meal.fat.split(" ")[0]}</span>
                    </div>
                  </div>
                </div>

                {/* View Details CTA Button */}
                <div className="pt-4 border-t border-zinc-50 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="text-[11px] text-zinc-500 font-medium font-sans">{meal.prepTime} Prep</span>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSelectedMeal(meal)}
                    className="px-5 py-2.5 bg-black hover:bg-zinc-800 text-white hover:text-white text-xs font-bold rounded-full transition-all duration-300 cursor-pointer flex items-center gap-1.5"
                  >
                    <span>View Details</span>
                    <Plus className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Elegant Details Overlay Modal */}
        <AnimatePresence>
          {selectedMeal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Blur backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedMeal(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col border border-zinc-100"
              >
                {/* Modal Header */}
                <div className="relative aspect-[16/9] w-full shrink-0">
                  <img
                    src={selectedMeal.image}
                    alt={selectedMeal.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedMeal(null)}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 text-white flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-6 left-8 right-8">
                    <span className="inline-flex items-center gap-1 bg-[#4CAF50] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                      {selectedMeal.suitableFor}
                    </span>
                    <h3 className="text-2xl font-bold text-white leading-tight">
                      {selectedMeal.name}
                    </h3>
                  </div>
                </div>

                {/* Modal Body (Scrollable) */}
                <div className="p-8 overflow-y-auto flex-grow space-y-6">
                  {/* Micro nutrition grids */}
                  <div className="grid grid-cols-4 gap-3 bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
                    <div className="text-center">
                      <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Calories</span>
                      <span className="block text-sm font-extrabold text-black mt-1">{selectedMeal.calories}</span>
                    </div>
                    <div className="text-center border-l border-zinc-200">
                      <span className="block text-[10px] font-bold text-[#4CAF50] uppercase tracking-wider">Protein</span>
                      <span className="block text-sm font-extrabold text-black mt-1">{selectedMeal.protein}</span>
                    </div>
                    <div className="text-center border-l border-zinc-200">
                      <span className="block text-[10px] font-bold text-blue-500 uppercase tracking-wider">Carbs</span>
                      <span className="block text-sm font-extrabold text-black mt-1">{selectedMeal.carbs}</span>
                    </div>
                    <div className="text-center border-l border-zinc-200">
                      <span className="block text-[10px] font-bold text-pink-500 uppercase tracking-wider">Fat</span>
                      <span className="block text-sm font-extrabold text-black mt-1">{selectedMeal.fat}</span>
                    </div>
                  </div>

                  {/* Two Columns for Ingredients & Directions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                    {/* Ingredients */}
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-black border-b border-zinc-100 pb-2 mb-3 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]" />
                        Ingredients List
                      </h4>
                      <ul className="space-y-2.5">
                        {selectedMeal.ingredients.map((ing, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-600">
                            <Check className="w-3.5 h-3.5 text-[#4CAF50] shrink-0 mt-0.5" />
                            <span>{ing}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Preparation instructions */}
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-black border-b border-zinc-100 pb-2 mb-3 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]" />
                        Directions
                      </h4>
                      <ol className="space-y-3">
                        {selectedMeal.instructions.map((step, i) => (
                          <li key={i} className="flex items-start gap-3 text-xs text-zinc-600">
                            <span className="font-bold text-black bg-zinc-100 w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                              {i + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-xs text-zinc-400">
                    Prep Time: {selectedMeal.prepTime}
                  </span>
                  <button
                    onClick={() => setSelectedMeal(null)}
                    className="px-6 py-2.5 bg-[#4CAF50] hover:bg-[#2E7D32] text-white font-bold rounded-full text-xs shadow-md shadow-[#4CAF50]/20 cursor-pointer"
                  >
                    Got It, Close
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
