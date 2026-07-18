import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle, Sparkles, Mail } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid clinical email address.");
      return;
    }
    setErrorMsg("");
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="py-16 md:py-24 bg-white border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[3rem] bg-gradient-to-tr from-zinc-900 to-zinc-950 p-8 md:p-16 text-center overflow-hidden border border-zinc-800 shadow-2xl"
        >

          {/* Back glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#4CAF50]/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">

            <div className="inline-flex items-center gap-2 bg-[#4CAF50]/10 border border-[#4CAF50]/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#4CAF50] uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5" />
              <span>Newsletter Subscription</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Stay Updated with Healthy Living Tips
            </h2>

            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              Receive expert medical nutrition advice, customizable low-glycemic/low-sodium recipes, and wellness updates written by our certified medical dietitians directly in your inbox.
            </p>

            {/* Newsletter input form */}
            <AnimatePresence mode="wait">
              {!subscribed ? (
                <motion.form
                  key="subscribe-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubscribe}
                  className="pt-4"
                  suppressHydrationWarning
                >
                  <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3 max-w-md mx-auto">
                    <div className="relative flex-grow">
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errorMsg) setErrorMsg("");
                        }}
                        placeholder="Enter your email address"
                        className="w-full px-5 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-[#4CAF50] text-sm transition-colors"
                        aria-label="Email address for subscription"
                        suppressHydrationWarning
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3.5 bg-[#4CAF50] hover:bg-[#2E7D32] text-black font-bold rounded-2xl text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                    >
                      <span>Subscribe</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {errorMsg && (
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-xs font-bold mt-2"
                    >
                      {errorMsg}
                    </motion.p>
                  )}
                </motion.form>
              ) : (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#4CAF50]/10 border border-[#4CAF50]/30 rounded-2xl p-6 max-w-md mx-auto mt-4"
                >
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle className="w-8 h-8 text-[#4CAF50] animate-bounce" />
                    <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Subscription Confirmed!</h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Check your inbox soon for your clinical meal-prep guide booklet and dietitian guide!
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Micro details indicator */}
            <p className="text-[10px] text-zinc-500 font-medium">
              We care about your privacy. Unsubscribe at any time. No spam, guaranteed.
            </p>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
