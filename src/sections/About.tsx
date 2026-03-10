//About.tsx
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Mail,
  Phone,
  MapPin,
  Award,
  Clock,
  Users,
  Heart,
  Shield,
  Sparkles,
  Mountain,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 15, suffix: '+', label: 'Years Experience', icon: Clock },
  { value: 10, suffix: 'K+', label: 'Happy Patients', icon: Users },
  { value: 25, suffix: '+', label: 'Expert Dentists', icon: Award },
  { value: 99, suffix: '%', label: 'Satisfaction Rate', icon: Heart },
];

const values = [
  {
    icon: Shield,
    title: 'Patient Safety',
    description: 'We maintain the highest standards of sterilization and safety protocols.',
  },
  {
    icon: Sparkles,
    title: 'Advanced Technology',
    description: 'State-of-the-art equipment for precise diagnostics and treatment.',
  },
  {
    icon: Heart,
    title: 'Compassionate Care',
    description: 'We treat every patient with empathy, respect, and understanding.',
  },
  {
    icon: Mountain,
    title: 'Reaching New Heights',
    description: 'Like a mountain climber, we help every patient scale toward their healthiest, brightest smile.',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const statNumbers = gsap.utils.toArray<HTMLElement>('.stat-number');

      statNumbers.forEach((num) => {
        const targetValue = parseInt(num.getAttribute('data-value') || '0', 10);

        gsap.fromTo(
          num,
          { innerText: 0 },
          {
            innerText: targetValue,
            duration: 2.5,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-30 bg-linear-to-b from-[#EAF3F7] to-white"
    >
      <div ref={contentRef} className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 md:py-2 bg-[#3E9BFF]/10 rounded-full mb-4 md:mb-5 text-sm md:text-base">
            <Award className="w-4 h-4 md:w-5 md:h-5 text-[#3E9BFF]" />
            <span className="font-medium text-[#3E9BFF]">About Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B1C2D] mb-4 md:mb-5 leading-tight">
            About <span className="text-[#3E9BFF]">Belleville</span> Dental
          </h2>
          <p className="text-base md:text-lg text-[#3D4F61] max-w-2xl mx-auto leading-relaxed">
            Providing exceptional dental care with a personal touch since 2009
          </p>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8 mb-14 md:mb-16 lg:mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-5 sm:p-6 lg:p-7 text-center shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#3E9BFF]/10 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors group-hover:bg-[#3E9BFF]/20">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#3E9BFF]" />
                </div>

                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1C2D] mb-1 flex items-baseline justify-center gap-1.5">
                  <span className="stat-number tabular-nums" data-value={stat.value}>
                    0
                  </span>
                  <span className="text-2xl sm:text-3xl font-semibold text-[#3E9BFF]">
                    {stat.suffix}
                  </span>
                </div>

                <div className="text-sm sm:text-base text-[#3D4F61] font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Main Content*/}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-center mb-16 lg:mb-20">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-4/3 sm:aspect-5/4 lg:aspect-4/3 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/team_medical.jpg"
                alt="Belleville Dental Team"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div className="absolute -bottom-5 sm:-bottom-6 -right-4 sm:-right-6 bg-[#3E9BFF] text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
              <div className="text-3xl sm:text-4xl font-bold">15+</div>
              <div className="text-xs sm:text-sm opacity-90 mt-0.5">Years of Excellence</div>
            </div>
          </div>

          {/* Text column*/}
          <div className="space-y-5 sm:space-y-6 lg:space-y-7 order-1 lg:order-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0B1C2D] leading-tight">
              Your Smile is Our Priority
            </h3>

            <p className="text-[#3D4F61] leading-relaxed text-[15px] sm:text-base lg:text-lg">
              At Belleville Dental, we believe everyone deserves a healthy, beautiful smile. Our team of
              experienced dentists and specialists are committed to providing the highest quality dental
              care in a comfortable, welcoming environment.
            </p>

            <p className="text-[#3D4F61] leading-relaxed text-[15px] sm:text-base lg:text-lg">
              From routine check-ups to advanced cosmetic procedures, we use the latest technology and
              techniques to ensure you receive the best possible care. Our patient-centered approach
              means we take the time to understand your needs and create personalized treatment plans.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 sm:space-y-5 pt-4 sm:pt-6">
              {[
                { Icon: Mail, label: 'Email Us', value: 'info@bellevilledental.com' },
                { Icon: Phone, label: 'Call Us', value: '(+1) 973-751-6600' },
                {
                  Icon: MapPin,
                  label: 'Visit Us',
                  value: '5 Franklin Ave #108, Belleville, NJ 07109, United States',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#3E9BFF]/10 rounded-xl flex items-center justify-center shrink-0">
                    <item.Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#3E9BFF]" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-[#3D4F61]">{item.label}</p>
                    <p className="font-semibold text-[#0B1C2D] text-sm sm:text-base">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 lg:p-7 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-start"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#3E9BFF]/10 rounded-xl flex items-center justify-center mb-5 transition-colors group-hover:bg-[#3E9BFF]/20">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#3E9BFF]" />
                </div>
                <h4 className="font-bold text-[#0B1C2D] mb-2.5 text-lg sm:text-xl">
                  {value.title}
                </h4>
                <p className="text-sm sm:text-base text-[#3D4F61] leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}