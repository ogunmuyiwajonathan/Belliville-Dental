// src/pages/AboutUs.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import About from "../sections/About";
import Gallery from "../sections/Gallery";
import Testimonials from "@/sections/Testimonials";

export default function AboutUs() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);

      if (element) {
        setTimeout(() => {
          const yOffset = -110;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 180);
      }
    } else {
      // Normal page load
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <About />
      <Testimonials />
      <Gallery />
    </div>
  );
}