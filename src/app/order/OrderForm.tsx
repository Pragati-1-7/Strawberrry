"use client";

import { useState } from "react";
import Image from "next/image";

export default function OrderForm({ userEmail }: { userEmail: string | null }) {
  const [quantity, setQuantity] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const pricePerBottle = 999;
  const total = (quantity * pricePerBottle).toLocaleString('en-IN');

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate network request
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in zoom-in duration-700">
        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-8 relative">
          <div className="absolute inset-0 bg-primary/30 rounded-full animate-pulseGlow" />
          <span className="text-4xl">✨</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,23,68,0.5)]">
          Order Confirmed
        </h2>
        <p className="text-xl text-white/60 font-light max-w-lg text-center leading-relaxed">
          Thank you, {userEmail}! Your premium cold-pressed strawberry juice is being prepared and will be shipped shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
      {/* LEFT: Visual Showcase */}
      <div className="relative w-full h-[50vh] lg:h-[80vh] flex items-center justify-center order-2 lg:order-1">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-96 h-64 md:h-96 bg-primary/30 rounded-full blur-[120px] animate-pulseGlow mix-blend-screen" />
        <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-secondary/20 rounded-full blur-[80px] animate-pulseGlow delay-1000" />
        
        {/* Main Bottle Image */}
        <div className="relative w-full h-full animate-float flex items-center justify-center z-10 drop-shadow-[0_0_50px_rgba(255,23,68,0.2)]">
          <img 
            src="/sequence/00150.png" 
            alt="Premium Strawberry Juice Bottle"
            className="object-contain max-h-[120%] lg:max-h-[140%] scale-125 lg:scale-150 transform transition-transform duration-1000 ease-out"
          />
        </div>

        {/* Floating background elements */}
        <div className="absolute top-1/4 left-1/4 text-4xl animate-float opacity-50 blur-sm" style={{ animationDelay: '0.5s' }}>🍓</div>
        <div className="absolute bottom-1/4 right-1/4 text-3xl animate-float opacity-30 blur-sm" style={{ animationDelay: '1.5s' }}>💧</div>
        <div className="absolute top-1/2 right-1/4 text-2xl animate-float opacity-40 blur-[2px]" style={{ animationDelay: '2.5s' }}>🍃</div>
      </div>

      {/* RIGHT: Order Form */}
      <div className="flex flex-col justify-center order-1 lg:order-2 z-20">
        <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl relative overflow-hidden">
          {/* Subtle inner top glow */}
          <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">Checkout</h1>
          <p className="text-white/50 mb-8 font-light">Complete your order for the ultimate refreshment.</p>

          <form onSubmit={handleOrder} className="space-y-8">
            {/* Quantity Selector */}
            <div className="space-y-4">
              <label className="block text-xs uppercase tracking-wider text-white/50 font-medium">Select Package</label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: 1, label: "1 Bottle", save: "" },
                  { value: 6, label: "6 Pack", save: "Save 10%" },
                  { value: 12, label: "12 Pack", save: "Save 20%" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setQuantity(option.value)}
                    className={`relative p-4 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 ${
                      quantity === option.value
                        ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(255,23,68,0.2)]"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <span className={`text-lg font-bold ${quantity === option.value ? "text-primary" : "text-white"}`}>
                      {option.label}
                    </span>
                    {option.save && (
                      <span className="text-[10px] uppercase tracking-wider text-secondary mt-1 font-medium">
                        {option.save}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Shipping Info (Visual only for mockup) */}
            <div className="space-y-4">
              <label className="block text-xs uppercase tracking-wider text-white/50 font-medium">Shipping to</label>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{userEmail}</div>
                    <div className="text-xs text-white/50">Standard Delivery (2-3 days)</div>
                  </div>
                </div>
                <button type="button" className="text-xs text-primary hover:text-white transition-colors uppercase tracking-wider">Edit</button>
              </div>
            </div>

            <hr className="border-white/10" />

            {/* Total Calculation */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-white/60 font-light text-lg">Total</span>
              <span className="text-3xl font-black tracking-tight">₹{total}</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full relative group overflow-hidden bg-gradient-to-r from-primary to-secondary text-white font-medium py-4 rounded-xl transition-all duration-300 disabled:opacity-70"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 flex items-center justify-center text-lg tracking-wide uppercase">
                {isProcessing ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Confirm Purchase"
                )}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
