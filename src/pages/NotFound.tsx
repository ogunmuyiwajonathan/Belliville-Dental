// src/pages/NotFound.tsx
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, Smile } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F6FAFC] to-white flex items-center justify-center px-5 py-16">
      <div className="max-w-2xl w-full text-center space-y-10">
        {/* Large 404 with subtle gradient + tooth icon overlay */}
        <div className="relative">
          <div className="text-[12rem] sm:text-[16rem] md:text-[20rem] font-black text-[#3E9BFF]/10 leading-none select-none pointer-events-none">
            404
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <Smile 
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 text-[#3E9BFF]/40 animate-pulse-slow" 
              strokeWidth={1.2}
            />
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl font-bold text-[#0B1C2D] tracking-tight">
          Oops! Page Not Found
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-[#3D4F61] max-w-xl mx-auto leading-relaxed">
          The page you're looking for might have been moved, renamed, 
          or is temporarily unavailable. Don't worry — your perfect smile is still our priority!
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">
          <Link
            to="/"
            className="
              group flex items-center gap-3 px-8 py-4 
              bg-[#3E9BFF] hover:bg-[#2563eb] 
              text-white font-semibold rounded-full 
              shadow-lg hover:shadow-xl transition-all duration-300
              transform hover:-translate-y-1 active:translate-y-0
            "
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>

          <Link
            to="/contact"
            className="
              group flex items-center gap-3 px-8 py-4 
              border-2 border-[#3E9BFF] text-[#3E9BFF] 
              hover:bg-[#3E9BFF] hover:text-white 
              font-semibold rounded-full transition-all duration-300
            "
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Contact Us
          </Link>
        </div>

        {/* Helpful links / suggestions */}
        <div className="pt-8 border-t border-[#3E9BFF]/10">
          <p className="text-[#3D4F61] mb-5">Looking for something else? Try these:</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { to: "/services", label: "Our Services" },
              { to: "/patient-education", label: "Patient Education" },
              { to: "/products", label: "Shop Products" },
              { to: "/gallery", label: "Gallery" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="
                  px-5 py-2.5 text-sm font-medium 
                  bg-white border border-[#3E9BFF]/30 
                  hover:border-[#3E9BFF] hover:text-[#2563eb]
                  rounded-full transition-colors
                "
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Small fun/branding footer element */}
        <div className="pt-12 text-sm text-[#3D4F61]/70">
          <Smile className="inline w-5 h-5 mr-1.5" />
          Your smile is still our top priority — even on 404 pages
        </div>
      </div>
    </div>
  );
}