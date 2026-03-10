// Header,tsx
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, Phone, Users } from 'lucide-react';
import { useVisitorCounter } from '../hooks/useVisitorCounter';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Professional Education', path: '/professional-education' },
  { label: 'Patient Education', path: '/patient-education' },
  { label: 'Research', path: '/research' },
  { label: 'Products', path: '/products' },
  { label: 'About Us', path: '/aboutus' },
  { label: 'Contact Us', path: '/contact' },
  { label: '🗺️Sitemap', path: '/sitemap' },
];

export default function Header() {
  const visitorCount = useVisitorCounter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Info Bar – hides when scrolled */}
      <div
        className={`
          bg-linear-to-r from-[#3E9BFF] to-[#2563eb] text-white text-sm font-medium
          overflow-hidden transition-all duration-500 ease-in-out
          ${isScrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-9 py-0 opacity-100'}
        `}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-9">
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4" />
              <span className="xs:inline">(+1) 973-751-6600</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>
                Visitors: <strong>{visitorCount.toLocaleString()}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation – becomes sticky + compact when scrolled */}
      <div
        className={`
          backdrop-blur-md transition-all duration-300
          ${isScrolled ? 'shadow-md bg-white/95' : ' bg-white/80'}
        `}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('/')}
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#3E9BFF]/40 rounded-lg"
              aria-label="Go to home"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-[#3E9BFF]/20 to-[#2563eb]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <img
                  src="/logo.png"
                  alt="Belleville Dental Logo"
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                />
              </div>
              <div className="text-left">
                <div className="font-bold text-xl sm:text-2xl text-gray-900 tracking-tight leading-none">
                  Belleville
                </div>
                <div className="text-[#3E9BFF] text-xs sm:text-sm font-semibold tracking-wide -mt-0.5">
                  DENTAL
                </div>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1.5">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                    ${isActive
                      ? 'bg-[#3E9BFF]/10 text-[#2563eb] font-semibold shadow-sm ring-1 ring-[#3E9BFF]/30'
                      : 'text-gray-700 hover:bg-[#F0F9FF] hover:text-[#2563eb]'}
                  `}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Desktop CTA + Mobile Toggle */}
            <div className="flex items-center gap-4">
              <NavLink
                to="/book"
                className="hidden lg:block px-7 py-2.5 bg-[#3E9BFF] hover:bg-[#2563eb] text-white text-sm font-semibold rounded-full transition-all shadow-md hover:shadow-lg active:scale-95 duration-200"
              >
                Book Now
              </NavLink>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 text-gray-700 hover:text-[#3E9BFF] focus:outline-none focus:ring-2 focus:ring-[#3E9BFF]/40 rounded-lg"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu – Slide down */}
      <div
        className={`
          lg:hidden overflow-hidden transition-all duration-400 ease-in-out
          ${isMobileMenuOpen ? 'max-h-screen py-6' : 'max-h-0 py-0'}
          bg-white border-b border-gray-100 shadow-xl
        `}
      >
        <nav className="max-w-7xl mx-auto px-5 sm:px-6 flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`
                w-full text-left px-6 py-4 rounded-xl text-base font-medium transition-colors
                ${item.path === window.location.pathname
                  ? 'bg-[#E0F2FE] text-[#2563eb] font-semibold'
                  : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'}
              `}
            >
              {item.label}
            </NavLink>
          ))}

          <NavLink
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 mx-6 py-4 bg-[#3E9BFF] hover:bg-[#2563eb] text-white rounded-full font-semibold transition-colors shadow-md text-center"
          >
            Book Appointment
          </NavLink>
        </nav>
      </div>
    </header>
  );
}