// Footer.tsx
import { Link } from 'react-router-dom';
import { useTickerInfo } from '../hooks/useTickerInfo';
import { FaXTwitter } from "react-icons/fa6";
import {
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  HelpCircle,
} from 'lucide-react';

const quickLinks = [
  { path: '/', label: 'Home' },
  { path: '/#services', label: 'Services' },
  { path: '/aboutus', label: 'About Us' },
  { path: '/book', label: 'Book Now' },
  { path: '/contact', label: 'Contact Us' },
  { path: '/sitemap', label: 'Site Map' },
];

const exploreLinks = [
  { path: '/professional-education', label: 'Professional Education' },
  { path: '/patient-education', label: 'Patient Education' },
  { path: '/research', label: 'Research' },
  { path: '/products', label: 'Products' },
  { path: '/aboutus#testimonials', label: 'Testimonials' },
  { path: '/aboutus#gallery', label: 'Gallery' },
  { path: '/faq', label: 'FAQ' },
];

const hours = [
  { day: 'Mon – Thu', time: '8:00 am – 6:00 pm' },
  { day: 'Friday',    time: '8:00 am – 3:00 pm' },
  { day: 'Sat – Sun', time: 'Closed' },
];

const socials = [
  { Icon: Facebook,   href: '#' },
  { Icon: FaXTwitter, href: '#' },
  { Icon: Instagram,  href: '#' },
  { Icon: Linkedin,   href: '#' },
];

export default function Footer() {
  const tickerInfo = useTickerInfo();

  const marqueeText = `${tickerInfo.date} | Time: ${tickerInfo.time} | Call: (+1) 973-751-6600 | Email: info@bellevilledental.com | Address: 5 Franklin Ave #108, Belleville, NJ 07109, United States | Location: ${tickerInfo.location}`;

  return (
    <footer className="bg-[#0f172a] text-white overflow-hidden">

      {/* ── MARQUEE ── */}
      <div className="bg-[#1e88e5] py-3 text-sm font-medium overflow-hidden border-b border-blue-700 marquee-container">
        <div className="marquee-track marquee">
          {[0, 1].map((n) => (
            <div key={n} className="flex items-center gap-12 px-8 whitespace-nowrap">
              <span>{marqueeText}</span>
              <span className="text-blue-100">•••</span>
              <span>{marqueeText}</span>
              <span className="text-blue-100">•••</span>
              <span>{marqueeText}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN GRID ── */}
      <div className="max-w-7xl mx-auto px-8 pt-16 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* ── COL 1 · Brand ── */}
          <div className="md:col-span-4 flex flex-col gap-6">

            {/* Logo + name */}
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0">
                <img src="/logo.png" alt="Belleville Dental logo" />
              </div>
              <div className="font-bold text-3xl tracking-tighter leading-tight">
                Belleville <span className="text-[#60a5fa]">Dental</span>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed text-sm">
              Providing exceptional dental care with a personal touch.
              Your smile is our priority.
            </p>

            {/* Book CTA */}
            <Link
              to="/book"
              className="inline-flex items-center gap-2 self-start px-5 py-2.5 bg-[#1e88e5] hover:bg-[#1565c0] text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-900/30"
            >
              <Calendar className="w-4 h-4" />
              Book an Appointment
            </Link>
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 self-start px-5 py-2.5 bg-[#1e88e5] hover:bg-[#1565c0] text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-900/30"
            >
              <HelpCircle className="w-4 h-4" />
              Click here to see frequently asked questions
            </Link>

            {/* Socials */}
            <div className="flex gap-3 mt-2">
              {socials.map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-10 h-10 bg-[#1e2937] hover:bg-[#1e88e5] rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

          </div>

          {/* ── COL 2 · Navigation ── */}
          <div className="md:col-span-2">
            <h4 className="font-semibold text-base mb-5 text-white tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-[#60a5fa] transition-colors text-sm flex items-center gap-1.5"
                  >
                    <span className="text-[#60a5fa] text-xs">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── COL 3 · Explore ── */}
          <div className="md:col-span-2">
            <h4 className="font-semibold text-base mb-5 text-white tracking-wide">
              Explore
            </h4>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-[#60a5fa] transition-colors text-sm flex items-center gap-1.5"
                  >
                    <span className="text-[#60a5fa] text-xs">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── COL 4 · Hours + Contact ── */}
          <div className="md:col-span-4 flex flex-col gap-8">

            {/* Hours */}
            <div>
              <h4 className="font-semibold text-base mb-5 text-white tracking-wide flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#60a5fa]" />
                Opening Hours
              </h4>
              <ul className="space-y-2.5">
                {hours.map(({ day, time }) => (
                  <li key={day} className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">{day}</span>
                    <span className={`font-medium ${time === 'Closed' ? 'text-red-400' : 'text-[#60a5fa]'}`}>
                      {time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-700/50" />

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-base mb-5 text-white tracking-wide">
                Contact Us
              </h4>
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <MapPin className="w-4 h-4 text-[#60a5fa] mt-0.5 shrink-0" />
                  <span className="text-gray-400 text-sm leading-relaxed">
                    5 Franklin Ave #108, Belleville,<br />NJ 07109, United States
                  </span>
                </div>
                <div className="flex gap-3 items-center">
                  <Phone className="w-4 h-4 text-[#60a5fa] shrink-0" />
                  <a href="tel:9737516600" className="text-gray-400 hover:text-[#60a5fa] transition-colors text-sm">
                    (+1) 973-751-6600
                  </a>
                </div>
                <div className="flex gap-3 items-center">
                  <Mail className="w-4 h-4 text-[#60a5fa] shrink-0" />
                  <a href="mailto:info@bellevilledental.com" className="text-gray-400 hover:text-[#60a5fa] transition-colors text-sm">
                    info@bellevilledental.com
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="bg-[#0a1321] py-5 border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-3">
          <span>© {new Date().getFullYear()} Belleville Dental. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              Made with <span className="text-red-500">❤️</span> for healthier smiles
            </span>
          </div>
        </div>
      </div>

    </footer>
  );
}