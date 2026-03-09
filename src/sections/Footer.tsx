import { Link } from 'react-router-dom';
import { useTickerInfo } from '../hooks/useTickerInfo';
import { FaXTwitter } from "react-icons/fa6";
import {
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

const quickLinks = [
  { path: '/', label: 'Home' },
  { path: '/professional-education', label: 'Professional Education' },
  { path: '/patient-education', label: 'Patient Education' },
  { path: '/research', label: 'Research' },
  { path: '/products', label: 'Products' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/about', label: 'About Us' },
  { path: '/contact', label: 'Contact Us' },
];

const services = [
  'Preventive Care',
  'Restorative Dentistry',
  'Cosmetic Dentistry',
  'Orthodontics',
  'Dental Implants',
  'Emergency Care',
];

export default function Footer() {

  const tickerInfo = useTickerInfo();

  const marqueeText = `${tickerInfo.date} | Time: ${tickerInfo.time} | Call: (+1) 973-751-6600 | Email: info@bellevilledental.com | Address: 5 Franklin Ave #108, Belleville, NJ 07109, United States | Location: ${tickerInfo.location}`;

  return (
    <footer className="bg-[#0f172a] text-white overflow-hidden">

      {/* MARQUEE - FIXED & FULLY WORKING */}
      <div className="bg-[#1e88e5] py-3 text-sm font-medium overflow-hidden border-b border-blue-700 marquee-container">
        <div className="marquee-track marquee">
          {/* COPY 1 */}
          <div className="flex items-center gap-12 px-8 whitespace-nowrap">
            <span>{marqueeText}</span>
            <span className="text-blue-100">•••</span>
            <span>{marqueeText}</span>
            <span className="text-blue-100">•••</span>
            <span>{marqueeText}</span>
          </div>

          {/* COPY 2 - required for seamless infinite loop */}
          <div className="flex items-center gap-12 px-8 whitespace-nowrap">
            <span>{marqueeText}</span>
            <span className="text-blue-100">•••</span>
            <span>{marqueeText}</span>
            <span className="text-blue-100">•••</span>
            <span>{marqueeText}</span>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-8 pt-16 pb-20">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* LOGO */}
          <div className="md:col-span-4">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-14 h-14 rounded-full flex items-center justify-center">
                <img src="/logo.png" alt="logo" />
              </div>

              <div className="font-bold text-4xl tracking-tighter">
                Belleville <span className="text-[#60a5fa]">Dental</span>
              </div>

            </div>

            <p className="text-gray-300 leading-relaxed max-w-md">
              Providing exceptional dental care with a personal touch.
              Your smile is our priority.
            </p>

            <div className="flex gap-4 mt-10">

              {[Facebook, FaXTwitter, Instagram, Linkedin].map((Icon, i) => (

                <a
                  key={i}
                  href="#"
                  className="w-11 h-11 bg-[#1e2937] hover:bg-[#1e88e5] rounded-2xl flex items-center justify-center transition-all hover:scale-110"
                >
                  <Icon className="w-5 h-5" />
                </a>

              ))}

            </div>

          </div>


          {/* QUICK LINKS */}
          <div className="md:col-span-3">

            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>

            <ul className="space-y-3 text-gray-300">

              {quickLinks.map((link) => (

                <li key={link.path}>

                  <Link
                    to={link.path}
                    className="hover:text-[#60a5fa] transition-colors flex items-center gap-2"
                  >
                    › {link.label}
                  </Link>

                </li>

              ))}

            </ul>

          </div>


          {/* SERVICES */}
          <div className="md:col-span-2">

            <h4 className="font-semibold text-lg mb-6">Our Services</h4>

            <ul className="space-y-3 text-gray-300">

              {services.map((service, i) => (

                <li
                  key={i}
                  className="flex items-center gap-2 hover:text-[#60a5fa] transition-colors cursor-pointer"
                >
                  › {service}
                </li>

              ))}

            </ul>

          </div>


          {/* CONTACT */}
          <div className="md:col-span-3">

            <h4 className="font-semibold text-lg mb-6">Contact Us</h4>

            <div className="space-y-5 text-gray-300">

              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-[#60a5fa] mt-1 shrink-0" />
                <span>
                  5 Franklin Ave #108, Belleville <br />
                  NJ 07109, United States
                </span>
              </div>

              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-[#60a5fa] mt-1 shrink-0" />
                <a
                  href="tel:9737516600"
                  className="hover:text-[#60a5fa]"
                >
                  (+1) 973-751-6600
                </a>
              </div>

              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-[#60a5fa] mt-1 shrink-0" />
                <a
                  href="mailto:info@bellevilledental.com"
                  className="hover:text-[#60a5fa]"
                >
                  info@bellevilledental.com
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>


      {/* BOTTOM BAR */}
      <div className="bg-[#0a1321] py-6 border-t border-slate-800/60">

        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400 gap-4">

          <div>
            © {new Date().getFullYear()} Belleville Dental. All rights reserved.
          </div>

          <div className="flex items-center gap-2">
            Made with <span className="text-red-500">❤️</span> for healthier smiles
          </div>

        </div>

      </div>

    </footer>
  );
}