"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

function useIntersectionObserver() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10", "translate-y-16", "scale-95");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    const currentRef = ref.current;
    if (currentRef) {
      // Find all elements with the 'animate-on-scroll' class inside this ref
      const elements = currentRef.querySelectorAll(".animate-on-scroll");
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (currentRef) {
        const elements = currentRef.querySelectorAll(".animate-on-scroll");
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return ref;
}

interface ScrollSectionsProps {
  userEmail: string | null;
  onOpenAuth: () => void;
}

export default function ScrollSections({ userEmail, onOpenAuth }: ScrollSectionsProps) {
  const containerRef = useIntersectionObserver();
  const router = useRouter();

  const handleOrderClick = () => {
    if (userEmail) {
      router.push("/order");
    } else {
      onOpenAuth();
    }
  };

  return (
    <div ref={containerRef} className="w-full flex flex-col pointer-events-none">
      {/* 1. HERO SECTION */}
      <section className="h-screen w-full flex items-end justify-center pb-32">
        <div className="flex space-x-4 text-5xl md:text-7xl lg:text-8xl font-black text-white drop-shadow-[0_0_25px_rgba(255,23,68,0.6)] tracking-tight">
          <span className="animate-on-scroll opacity-0 translate-y-16 scale-95 transition-all duration-[1500ms] ease-out delay-100">Pure.</span>
          <span className="animate-on-scroll opacity-0 translate-y-16 scale-95 transition-all duration-[1500ms] ease-out delay-500">Fresh.</span>
          <span className="animate-on-scroll opacity-0 translate-y-16 scale-95 transition-all duration-[1500ms] ease-out delay-[900ms] text-primary">Premium.</span>
        </div>
      </section>

      {/* Spacer to allow canvas to animate before next section */}
      <div className="h-screen" />

      {/* 2. STORY SECTION */}
      <section className="min-h-screen w-full flex items-center justify-center py-20 px-6">
        <div className="max-w-3xl text-center relative pointer-events-auto">
          {/* Subtle glowing orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10" />
          
          <h2 className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out text-5xl md:text-7xl font-bold mb-8">
            Crafted with <span className="text-primary">Love</span>
          </h2>
          <p className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-200 text-xl md:text-2xl text-white/80 leading-relaxed font-light">
            Every bottle is cold-pressed from the freshest strawberries, delivering pure nutrition without compromise.
          </p>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-[50vh]" />

      {/* 3. INGREDIENTS SECTION */}
      <section className="min-h-screen w-full flex items-center justify-center py-20 px-6 pointer-events-auto">
        <div className="max-w-6xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-100 glass-card rounded-2xl p-8 flex flex-col items-center text-center group hover:border-primary/50 hover:shadow-[0_0_30px_rgba(255,23,68,0.2)] transition-all">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500">🍓</div>
              <h3 className="text-2xl font-medium mb-4">Fresh Strawberries</h3>
              <p className="text-white/70 font-light">Hand-picked at peak ripeness for maximum flavor and nutrition.</p>
            </div>

            {/* Card 2 */}
            <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-300 glass-card rounded-2xl p-8 flex flex-col items-center text-center group hover:border-primary/50 hover:shadow-[0_0_30px_rgba(255,23,68,0.2)] transition-all">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500">💧</div>
              <h3 className="text-2xl font-medium mb-4">Pure Spring Water</h3>
              <p className="text-white/70 font-light">Sourced from pristine mountain springs for absolute clarity.</p>
            </div>

            {/* Card 3 */}
            <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-500 glass-card rounded-2xl p-8 flex flex-col items-center text-center group hover:border-primary/50 hover:shadow-[0_0_30px_rgba(255,23,68,0.2)] transition-all">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500">🍃</div>
              <h3 className="text-2xl font-medium mb-4">Natural Sweetness</h3>
              <p className="text-white/70 font-light">No added sugars. Just the authentic taste of nature&apos;s bounty.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-[50vh]" />

      {/* 4. CALL TO ACTION SECTION */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center py-20 px-6 pointer-events-auto relative">
        {/* Radial background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,23,68,0.15)_0%,transparent_50%)] -z-10" />
        
        <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out text-center">
          <button 
            onClick={handleOrderClick}
            className="group relative inline-flex items-center justify-center px-12 py-5 text-lg font-medium text-white transition-all duration-300 ease-in-out bg-gradient-to-r from-primary to-secondary rounded-full hover:scale-105 hover:shadow-[0_0_40px_rgba(255,23,68,0.6)] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            <span className="relative z-10 tracking-wider uppercase">Order Now</span>
          </button>
          <p className="mt-6 text-sm text-white/60 tracking-wide font-light">
            Free delivery on your first order
          </p>
        </div>
      </section>
      
      {/* Final Spacer for scroll padding */}
      <div className="h-[20vh]" />
    </div>
  );
}
