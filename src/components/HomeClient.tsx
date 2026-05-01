"use client";

import { useState } from "react";
import Header from "./Header";
import ScrollSections from "./ScrollSections";
import AuthModal from "./AuthModal";

interface HomeClientProps {
  userEmail: string | null;
}

export default function HomeClient({ userEmail }: HomeClientProps) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <>
      <Header 
        userEmail={userEmail} 
        onOpenAuth={() => setIsAuthOpen(true)} 
      />
      
      {/* Scrollable content container */}
      <div className="relative z-10 w-full">
        <ScrollSections 
          userEmail={userEmail} 
          onOpenAuth={() => setIsAuthOpen(true)} 
        />
      </div>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
