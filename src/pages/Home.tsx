// src/pages/Home.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from "@/sections/Hero";
import Services from "@/sections/Services"; 

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);

      if (element) {
        // Small delay so the full page (including Services) has rendered
        setTimeout(() => {
          const yOffset = -110; 
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 180);
      }
    } else {
      // Normal page load or non-hash navigation
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location]); 
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
    </div>
  );
}