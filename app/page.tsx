"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import HeroContent from "@/components/HeroContent";
import HealthConditions from "@/components/HealthConditions";
import FeaturedMealPlans from "@/components/FeaturedMealPlans";
//import DashboardPreview from "@/components/DashboardPreview";
import HowItWorks from "@/components/HowItWorks";
//import HealthTips from "@/components/HealthTips";
import WhyChoose from "@/components/WhyChoose";
//import Testimonials from "@/components/Testimonials";
//import MobileApp from "@/components/MobileApp";
//import BlogSection from "@/components/BlogSection";
import Newsletter from "@/components/Newsletter";
import PortalDashboard from "@/components/PortalDashboard";
import HealthProfileForm, { HealthProfile } from "@/components/HealthProfileForm";
import Footer from "@/components/Footer";

export default function Home() {
  const [showDashboard, setShowDashboard] = useState<boolean>(false);
  const [healthProfile, setHealthProfile] = useState<HealthProfile | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const totalFrames = 300;
  // Load saved profile from localStorage on first load
  useEffect(() => {
    const saved = localStorage.getItem("dietary_health_profile");
    if (saved) {
      try {
        setHealthProfile(JSON.parse(saved));
      } catch {
        // ignore corrupted data
      }
    }
  }, []);

  // Preload frames
  useEffect(() => {
    let loadedCount = 0;
    const tempImages: HTMLImageElement[] = [];

    const handleLoad = () => {
      loadedCount++;
      setProgress(Math.round((loadedCount / totalFrames) * 100));
      if (loadedCount === totalFrames) {
        setLoaded(true);
      }
    };

    const handleError = (e: Event | string) => {
      console.error("Failed to load frame image", e);
      // Count towards progress so loading screen resolves anyway
      loadedCount++;
      setProgress(Math.round((loadedCount / totalFrames) * 100));
      if (loadedCount === totalFrames) {
        setLoaded(true);
      }
    };

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.onload = handleLoad;
      img.onerror = handleError;
      const frameStr = String(i).padStart(3, "0");
      img.src = `/frames/ezgif-frame-${frameStr}.jpg`;
      tempImages.push(img);
    }

    imagesRef.current = tempImages;
  }, []);

  // Animation and Scroll handler
  useEffect(() => {
    if (!loaded || showDashboard) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const drawFrame = (frameIndex: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const imgIndex = Math.min(totalFrames - 1, Math.max(0, Math.round(frameIndex)));
      const img = imagesRef.current[imgIndex];

      if (!img || !img.complete) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Clear the canvas before redrawing
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Perform cover scaling: fit the food plate image to cover the screen
      const imgWidth = img.width;
      const imgHeight = img.height;
      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth = 0;
      let drawHeight = 0;
      let drawX = 0;
      let drawY = 0;

      if (canvasRatio > imgRatio) {
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / imgRatio;
        drawX = 0;
        drawY = (canvasHeight - drawHeight) / 2;
      } else {
        drawWidth = canvasHeight * imgRatio;
        drawHeight = canvasHeight;
        drawX = (canvasWidth - drawWidth) / 2;
        drawY = 0;
      }

      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      drawFrame(currentFrameRef.current);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Scroll listener updates TARGET frame based on actual page scroll progress
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
      targetFrameRef.current = scrollProgress * (totalFrames - 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Tick loop for smooth lerping
    let animationFrameId: number;
    let lastDrawnFrame = -1;

    const tick = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      // Easing / Interpolation factor (0.08 offers extra smooth damping)
      const lerpFactor = 0.08;

      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current = current + diff * lerpFactor;
      } else {
        currentFrameRef.current = target;
      }

      const roundedFrame = Math.round(currentFrameRef.current);
      if (roundedFrame !== lastDrawnFrame) {
        drawFrame(currentFrameRef.current);
        lastDrawnFrame = roundedFrame;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [loaded, showDashboard]);

  return (
    <main className="relative bg-[#F8FAF8] text-[#1A1A1A] min-h-screen">
      {/* Fixed background canvas animation (active when landing page is shown) */}
      {!showDashboard && loaded && (
        <div className="fixed inset-0 w-full h-screen bg-[#F8FAF8] z-0 pointer-events-none">
          <canvas
            ref={canvasRef}
            className="w-full h-full block opacity-35 transition-opacity duration-500"
          />
        </div>
      )}

      {/* Main layout container */}
      <div className={`${!showDashboard ? "landing-page" : "portal-page"} relative z-10 min-h-screen flex flex-col`}>

        {/* Navigation Header with state switch controls */}
        <Header
          isDashboardMode={showDashboard}
          onToggleDashboard={() => setShowDashboard(!showDashboard)}
        />

        {/* Switched Content layout */}
        {showDashboard ? (
          healthProfile ? (
            <PortalDashboard profile={healthProfile} />
          ) : (
            <HealthProfileForm onComplete={(profile) => {
              setHealthProfile(profile);
              localStorage.setItem("dietary_health_profile", JSON.stringify(profile));
            }} />
          )
        ) : (
          <>
            {/* Centered Hero Content */}
            <div className="relative py-16 md:py-24 px-6 md:px-12 xl:px-16 max-w-7xl mx-auto w-full">
              <HeroContent
                onStartJourney={() => setShowDashboard(true)}
                onTalkToAI={() => setShowDashboard(true)}
              />
            </div>

            {/* Health Conditions Section */}
            <HealthConditions />

            {/* Featured Meal Plans Section */}
            <FeaturedMealPlans />

            {/* Daily Nutrition Dashboard Preview Section - removed for v1, see note above */}
            {/* <DashboardPreview /> */}

            {/* How It Works Section */}
            <HowItWorks onStartJourney={() => setShowDashboard(true)} />

            {/* Weekly Clinical Health Tips Section - disabled for v1, revisit once real content exists */}
            {/* <HealthTips /> */}

            {/* Why Choose Dietary section with interactive graphics */}
            <WhyChoose />

            {/* Real Customer Testimonial Slider - disabled for v1, revisit once real testimonials exist */}
            {/* <Testimonials /> */}

            {/* Premium Mobile App showcase - disabled for v1, no app store presence yet */}
            {/* <MobileApp /> */}

            {/* Vetted Clinical Health Articles & Blog - disabled for v1, revisit once real articles exist */}
            {/* <BlogSection /> */}

            {/* Large custom Newsletter Input */}
            <Newsletter />
          </>
        )}

        {/* Custom Clinical Footer */}
        <Footer />
      </div>

      {/* Premium Minimalist Loading Overlay */}
      {!loaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F8FAF8]">
          <div className="w-48 h-[2px] bg-zinc-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#4CAF50] transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </main>
  );
}
