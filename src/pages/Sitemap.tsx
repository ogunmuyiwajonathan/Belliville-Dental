// src/pages/Sitemap.tsx
import { useNavigate } from 'react-router-dom';
import {
  Home,
  GraduationCap,
  Heart,
  FlaskConical,
  ShoppingCart,
  BookOpenText,
  Users,
  Phone,
  Map,
  ArrowUpRight,
  Camera,
  Album,
  ClipboardEdit,
  MessageCircle,
} from 'lucide-react';

const sections = [
  {
    label: 'Home',
    items: [
      {
        label: 'Home',
        path: '/',
        icon: Home,
        description: 'Welcome page for our Belleville Dental customers.',
      },
      {
        label: 'Services',
        path: '/#services',                 
        icon: Album,
        description: 'Click to see the services we offer.',
      },
    ],
  },
  {
    label: 'Education',
    items: [
      {
        label: 'Professional Education',
        path: '/professional-education',
        icon: GraduationCap,
        description: 'Resources and courses for dental professionals.',
      },
      {
        label: 'Patient Education',
        path: '/patient-education',
        icon: Heart,
        description: 'Guides, tips, and FAQs for our patients.',
      },
      {
        label: 'Research',
        path: '/research',
        icon: FlaskConical,
        description: 'Latest dental research ,clinical studies and Educational videos.',
      },
    ],
  },
  {
    label: 'Products & Cart',
    items: [
      {
        label: 'Products',
        path: '/products',
        icon: ShoppingCart,
        description: 'Dental products and recommended tools.',
      },
    ],
  },
  {
    label: 'About Us',
    items: [
      {
        label: 'About Us',
        path: '/aboutus',
        icon: Users,
        description: 'Meet our team, our story, and our values.',
      },
      {
        label: 'Testimonials',
        path: '/aboutus#testimonials',
        icon: MessageCircle,
        description: 'Real experiences from real people who chose Belleville Dental for their smile care.',
      },
      {
        label: 'Gallery',
        path: '/aboutus#gallery',
        icon: Camera,
        description: 'Clinic tour, team photos, and facility showcase.',
      },
    ],
  },
  {
    label: 'More',
    items: [
      {
        label: 'Contact Us',
        path: '/contact',
        icon: Phone,
        description: 'Phone, location, hours, and send us a message.',
      },
      {
        label: 'Book Appointment',
        path: '/book',
        icon: BookOpenText,
        description: 'Book your appointment and we will get back to you shortly.',
      },
      {
        label: 'FAQ',
        path: '/faq',
        icon: ClipboardEdit,
        description: 'Frequently asked questions and answers.',
      },
    ],
  },
];

export default function Sitemap() {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);                         

    if (!path.includes('#')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-[#F6FAFC] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-14 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3E9BFF]/10 text-[#2563eb] text-sm font-semibold mb-5">
          <Map className="w-4 h-4" />
          Site Navigation
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B1C2D] tracking-tight leading-tight mb-4">
          Belleville <span className="text-[#3E9BFF]">Sitemap</span>
        </h1>
        <p className="text-[#3D4F61] text-lg max-w-xl mx-auto">
          Every page on our site, organized so you can get where you're going quickly.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto space-y-12">
        {sections.map((section) => (
          <div key={section.label}>
            {/* Section label */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#3E9BFF]">
                {section.label}
              </span>
              <div className="flex-1 h-px bg-[#3E9BFF]/20" />
            </div>

            {/* Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleClick(item.path)}
                    className="
                      group text-left bg-white border border-[#E2EDF6] rounded-2xl p-6
                      hover:border-[#3E9BFF]/50 hover:shadow-lg hover:shadow-[#3E9BFF]/10
                      transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#3E9BFF]/40
                    "
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-11 h-11 bg-[#3E9BFF]/10 rounded-xl flex items-center justify-center group-hover:bg-[#3E9BFF]/20 transition-colors duration-300">
                        <Icon className="w-5 h-5 text-[#3E9BFF]" />
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#3E9BFF]/40 group-hover:text-[#3E9BFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>
                    <p className="font-bold text-[#0B1C2D] text-base mb-1 group-hover:text-[#2563eb] transition-colors">
                      {item.label}
                    </p>
                    <p className="text-sm text-[#3D4F61] leading-snug">{item.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}