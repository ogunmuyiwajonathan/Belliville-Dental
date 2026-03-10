// ProfessionalEducation.tsx
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Clock,
  FileText,
  Video,
  Layers,
  GraduationCap,
  ArrowRight,
} from 'lucide-react';
import educationData from '../data/education.json';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: 'all', label: 'All Resources' },
  { id: 'courses', label: 'Courses' },
  { id: 'resources', label: 'Resources' },
];

export default function ProfessionalEducation() {
  const [activeCategory, setActiveCategory] = useState('all');
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
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const filteredContent = () => {
    if (activeCategory === 'all') {
      return {
        courses: educationData.professional.courses,
        resources: educationData.professional.resources,
      };
    }
    return {
      courses: activeCategory === 'courses' ? educationData.professional.courses : [],
      resources: activeCategory === 'resources' ? educationData.professional.resources : [],
    };
  };

  const content = filteredContent();

  return (
    <section
      ref={sectionRef}
      id="professional-education"
      className="py-30 bg-[#F6FAFC] relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-10 left-5 w-3 h-3 bg-[#3E9BFF]/30 rounded-full animate-pulse hidden sm:block" />
      <div className="absolute bottom-16 right-8 w-4 h-4 bg-[#3E9BFF]/20 rounded-full animate-bounce hidden md:block" />

      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3E9BFF]/10 rounded-full mb-5">
            <GraduationCap className="w-5 h-5 text-[#3E9BFF]" />
            <span className="text-sm font-medium text-[#3E9BFF]">For Dental Professionals</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1C2D] mb-4">
            Professional <span className="text-[#3E9BFF]">Education</span>
          </h2>
          <p className="text-base sm:text-lg text-[#3D4F61] max-w-2xl mx-auto">
            Advanced courses, resources, and case studies for dental professionals
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-10 sm:mb-14">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-[#3E9BFF] text-white shadow-lg shadow-[#3E9BFF]/30 ring-2 ring-[#3E9BFF]/40'
                    : 'bg-white text-[#3D4F61] hover:bg-[#3E9BFF]/10 hover:text-[#3E9BFF] border border-[#3E9BFF]/20'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {(activeCategory === 'all' || activeCategory === 'courses') && (
            <div className="lg:col-span-2 space-y-10">
              <h3 className="text-2xl font-bold text-[#0B1C2D] flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-[#3E9BFF]" />
                Courses
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {content.courses.map((course) => (
                  <div
                    key={course.id}
                    className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#3E9BFF]/10 hover:border-[#3E9BFF]/30 flex flex-col h-full"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span
                        className={`px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wide ${
                          course.level === 'Beginner'
                            ? 'bg-green-100 text-green-700'
                            : course.level === 'Intermediate'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {course.level}
                      </span>
                      <span className="flex items-center gap-2 text-sm text-[#3D4F61]">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </span>
                    </div>

                    <h4 className="font-bold text-lg text-[#0B1C2D] mb-3 group-hover:text-[#3E9BFF] transition-colors line-clamp-2">
                      {course.title}
                    </h4>

                    <p className="text-[#3D4F61] mb-6 line-clamp-3 flex-1">
                      {course.description}
                    </p>

                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-[#3E9BFF]/10">
                      <img
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#3E9BFF]/20"
                        src={course.src}
                        alt={course.instructor}
                      />
                      <span className="font-medium text-[#0B1C2D]">{course.instructor}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources + Quick Links */}
          {(activeCategory === 'all' || activeCategory === 'resources') && (
            <div className="space-y-10">
              <h3 className="text-2xl font-bold text-[#0B1C2D] flex items-center gap-3">
                <Layers className="w-6 h-6 text-[#3E9BFF]" />
                Resources
              </h3>

              <div className="space-y-4">
                {content.resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#3E9BFF]/10 hover:border-[#3E9BFF]/30 flex items-center gap-5"
                  >
                    <div className="w-14 h-14 bg-[#3E9BFF]/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#3E9BFF] transition-colors">
                      {resource.type === 'PDF Collection' ? (
                        <FileText className="w-7 h-7 text-[#3E9BFF] group-hover:text-white transition-colors" />
                      ) : resource.type === 'Videos' ? (
                        <Video className="w-7 h-7 text-[#3E9BFF] group-hover:text-white transition-colors" />
                      ) : (
                        <Layers className="w-7 h-7 text-[#3E9BFF] group-hover:text-white transition-colors" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-[#0B1C2D] group-hover:text-[#3E9BFF] transition-colors text-lg truncate">
                        {resource.title}
                      </h4>
                      <p className="text-sm text-[#3D4F61] mt-1">
                        {resource.count} {resource.type}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Links – now properly linked to /research */}
              <div className="bg-[#3E9BFF]/5 rounded-2xl p-6 mt-8">
                <h4 className="font-semibold text-[#0B1C2D] mb-5 text-lg flex items-center gap-2">
                  <ArrowRight className="w-5 h-5 text-[#3E9BFF]" />
                  Quick Links to Research
                </h4>
                <ul className="space-y-4">
                  <li>
                    <Link
                      to="/research"
                      className="flex items-center gap-3 text-[#3D4F61] hover:text-[#3E9BFF] transition-colors group text-base"
                    >
                      <FileText className="w-5 h-5 text-[#3E9BFF]/70 group-hover:text-[#3E9BFF]" />
                      <span className="group-hover:underline">Help Documents & Guides</span>
                    </Link>
                  </li>
                  <li><a href=""></a>
                    <Link
                      to="/research"
                      className="flex items-center gap-3 text-[#3D4F61] hover:text-[#3E9BFF] transition-colors group text-base"
                    >
                      <Video className="w-5 h-5 text-[#3E9BFF]/70 group-hover:text-[#3E9BFF]" />
                      <span className="group-hover:underline">Video Tutorials & Lectures</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/research"
                      className="flex items-center gap-3 text-[#3D4F61] hover:text-[#3E9BFF] transition-colors group text-base"
                    >
                      <BookOpen className="w-5 h-5 text-[#3E9BFF]/70 group-hover:text-[#3E9BFF]" />
                      <span className="group-hover:underline">Case Studies & Research Papers</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}