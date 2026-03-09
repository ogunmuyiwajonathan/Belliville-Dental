// src/pages/Services.tsx
import { Link } from 'react-router-dom';
import {ArrowRight,AlbumIcon } from 'lucide-react';

const treatments = [
  {
    name: 'Veneers',
    image: '/treatments/venner.png',
    desc: 'Transform your smile with custom-made porcelain veneers. Perfect for fixing chips, gaps, discoloration, and minor misalignments.'
  },
  {
    name: 'Scaling & Polishing',
    image: '/treatments/scaling.png',
    desc: 'Professional deep cleaning to remove plaque, tartar, and stains. Leaves your teeth feeling fresh and looking brighter.'
  },
  {
    name: 'Crowns',
    image: '/treatments/crowns.png',
    desc: 'Strong, natural-looking tooth restorations that protect damaged teeth and restore full function and appearance.'
  },
  {
    name: 'Braces',
    image: '/treatments/brace.png',
    desc: 'Traditional and modern orthodontic solutions to straighten teeth and correct bite issues for both children and adults.'
  },
  {
    name: 'Denture',
    image: '/treatments/denture.png',
    desc: 'Custom full or partial dentures designed for comfort, stability, and a natural-looking smile.'
  },
  {
    name: 'Teeth Whitening',
    image: '/treatments/white.png',
    desc: 'Safe, professional-grade whitening treatment that removes years of stains for a noticeably brighter smile.'
  },
  {
    name: 'Root Canal Treatment',
    image: '/treatments/root.png',
    desc: 'Painless procedure to save infected or severely damaged teeth and prevent extraction.'
  },
  {
    name: 'Dental Filling',
    image: '/treatments/filling.png',
    desc: 'Tooth-colored composite fillings that restore cavities while blending seamlessly with your natural teeth.'
  },
  {
    name: 'Invisalign',
    image: '/treatments/invisalign.png',
    desc: 'Clear, removable aligners that straighten teeth discreetly without traditional metal braces.'
  },
  {
    name: 'Bonding Composite',
    image: '/treatments/bonding.png',
    desc: 'Quick cosmetic repair for chipped, cracked, or discolored teeth using tooth-colored resin.'
  },
  {
    name: 'Habit Breaker',
    image: '/treatments/habit.png',
    desc: 'Special appliances and guidance to help children and adults stop thumb sucking, tongue thrusting, and other habits.'
  },
  {
    name: 'Digital Scan / X-rays',
    image: '/treatments/x-ray.png',
    desc: 'Advanced digital imaging for precise diagnosis, treatment planning, and monitoring oral health.'
  },
  {
    name: 'Implant',
    image: '/treatments/implant.png',
    desc: 'Permanent tooth replacement solution that looks, feels, and functions like a natural tooth.'
  },
  {
    name: 'Extraction',
    image: '/treatments/extraction.png',
    desc: 'Safe and comfortable tooth removal when necessary, with options for immediate replacement.'
  },
  {
    name: 'General Consultation',
    image: '/treatments/consultation.png',
    desc: 'Comprehensive oral examination, cleaning advice, and personalized treatment planning.'
  },
];

export default function Services() {
  return (
    <div id="services" className="min-h-screen py-15 bg-[#F6FAFC]">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3E9BFF]/10 rounded-full mb-4">
          <AlbumIcon className="w-4 h-4 text-[#3E9BFF]" />
          <span className="text-sm font-medium text-[#3E9BFF]">What We Offer</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-[#0B1C2D] mb-4">
          Our <span className="text-[#3E9BFF]">Services</span>
        </h2>
        <p className="text-lg text-[#3D4F61] max-w-2xl mx-auto">
          Comprehensive dental care with advanced technology and a gentle touch
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {treatments.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div
                className="h-64 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${service.image})` }}
              >
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-2xl font-bold">{service.name}</h3>
                </div>
              </div>

              <div className="p-8">
                <p className="text-[#3D4F61] leading-relaxed mb-8">
                  {service.desc}
                </p>

                <Link
                  to="/book"
                  className="inline-flex items-center gap-3 text-[#3E9BFF] font-semibold hover:text-[#2563eb] transition-colors group-hover:gap-4"
                >
                  Book This Service
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="mt-20 bg-white rounded-3xl p-12 text-center shadow-xl">
          <h2 className="text-4xl font-bold text-[#0B1C2D] mb-4">
            Ready to transform your smile?
          </h2>
          <p className="text-lg text-[#3D4F61] mb-8 max-w-lg mx-auto">
            Schedule your appointment today and experience exceptional dental care.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center px-10 py-5 bg-[#3E9BFF] hover:bg-[#2563eb] text-white text-lg font-semibold rounded-2xl transition-all shadow-lg hover:shadow-xl"
          >
            Book Your Appointment Now
          </Link>
        </div>
      </div>
    </div>
  );
}