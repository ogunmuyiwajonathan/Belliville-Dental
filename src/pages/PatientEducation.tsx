//PatientEducation.tsx
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CircleDot, Shield, Brush, Baby, Check, ChevronRight, Heart } from 'lucide-react';
import educationData from '../data/education.json';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  tooth: CircleDot,
  shield: Shield,
  brush: Brush,
  baby: Baby,
};

export default function PatientEducation() {
  const [activeTopic, setActiveTopic] = useState(educationData.patient.topics[0]);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const ActiveIcon = iconMap[activeTopic.icon] || CircleDot;

  return (
    <section
      ref={sectionRef}
      id="patient-education"
      className="py-30 bg-[#EAF3F7]"
    >
      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3E9BFF]/10 rounded-full mb-4">
            <Heart className="w-4 h-4 text-[#3E9BFF]" />
            <span className="text-sm font-medium text-[#3E9BFF]">For Patients</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0B1C2D] mb-4">
            Patient <span className="text-[#3E9BFF]">Education</span>
          </h2>
          <p className="text-lg text-[#3D4F61] max-w-2xl mx-auto">
            Learn about oral health, preventive care, and best practices for a healthy smile
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Topic Selection */}
          <div className="space-y-4">
            {educationData.patient.topics.map((topic) => {
              const Icon = iconMap[topic.icon] || CircleDot;
              return (
                <button
                  key={topic.id}
                  onClick={() => setActiveTopic(topic)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 ${
                    activeTopic.id === topic.id
                      ? 'bg-[#3E9BFF] text-white shadow-lg shadow-[#3E9BFF]/30'
                      : 'bg-white text-[#0B1C2D] hover:bg-[#3E9BFF]/10 hover:text-[#3E9BFF]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        activeTopic.id === topic.id
                          ? 'bg-white/20'
                          : 'bg-[#3E9BFF]/10'
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          activeTopic.id === topic.id ? 'text-white' : 'text-[#3E9BFF]'
                        }`}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{topic.title}</h4>
                      <p
                        className={`text-sm ${
                          activeTopic.id === topic.id
                            ? 'text-white/80'
                            : 'text-[#3D4F61]'
                        }`}
                      >
                        Click to learn more
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Topic Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#3E9BFF]/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#3E9BFF]/10 rounded-2xl flex items-center justify-center">
                  <ActiveIcon className="w-8 h-8 text-[#3E9BFF]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0B1C2D]">
                    {activeTopic.title}
                  </h3>
                  <span className="text-sm text-[#3D4F61]">
                    Educational Resource
                  </span>
                </div>
              </div>

              <div className="prose prose-slate max-w-none mb-8">
                <p className="text-[#3D4F61] leading-relaxed text-lg">
                  {activeTopic.content}
                </p>
              </div>

              <div className="bg-[#F6FAFC] rounded-2xl p-6">
                <h4 className="font-semibold text-[#0B1C2D] mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#3E9BFF]" />
                  Key Tips
                </h4>
                <ul className="space-y-3">
                  {activeTopic.tips.map((tip, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-[#3D4F61]"
                    >
                      <span className="w-6 h-6 bg-[#3E9BFF] text-white rounded-full flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm text-[#3D4F61]">
                  Want to learn more?
                </span>
                <Link to="/faq" className="group flex items-center gap-2 text-[#3E9BFF] font-medium hover:underline">
                  View detailed guide in our FAQ
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
