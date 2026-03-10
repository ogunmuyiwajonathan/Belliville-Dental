// Research.tsx
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Microscope,
  Calendar,
  User,
  Clock,
  ChevronRight,
  Play,
  Filter,
  X
} from 'lucide-react';
import researchData from '../data/research.json';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: 'all', label: 'All Research' },
  { id: 'technology', label: 'Technology' },
  { id: 'general', label: 'General' },
  { id: 'implants', label: 'Implants' },
  { id: 'pediatric', label: 'Pediatric' },
  { id: 'orthodontics', label: 'Orthodontics' },
];

export default function Research() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

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

  const filteredArticles = activeCategory === 'all'
    ? researchData.articles
    : researchData.articles.filter(article => article.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      id="research"
      className="py-30 bg-[#F6FAFC] relative"
    >
      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-3 h-3 bg-[#3E9BFF] rounded-full animate-pulse" />
      <div className="absolute top-40 right-40 w-2 h-2 bg-[#3E9BFF]/60 rounded-full" />
      <div className="absolute bottom-10 right-32 w-4 h-4 bg-[#3E9BFF]/40 rounded-full animate-bounce" />

      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3E9BFF]/10 rounded-full mb-4">
            <Microscope className="w-4 h-4 text-[#3E9BFF]" />
            <span className="text-sm font-medium text-[#3E9BFF]">Latest Discoveries</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0B1C2D] mb-4">
            Dental <span className="text-[#3E9BFF]">Research</span>
          </h2>
          <p className="text-lg text-[#3D4F61] max-w-2xl mx-auto">
            Stay updated with the latest advancements in dental science and technology
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Filter className="w-5 h-5 text-[#3D4F61] mr-2 self-center" />
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category.id
                ? 'bg-[#3E9BFF] text-white shadow-lg shadow-[#3E9BFF]/30'
                : 'bg-white text-[#3D4F61] hover:bg-[#3E9BFF]/10 hover:text-[#3E9BFF] border border-[#3E9BFF]/20'
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Articles Grid*/}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredArticles.map((article) => (
            <a
              key={article.id}
              href={article.link}
              className="block group"
            >
              <article className="h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#3E9BFF]/10 hover:border-[#3E9BFF]/30">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-[#3E9BFF]/10 text-[#3E9BFF] rounded-full text-xs font-medium uppercase">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#3D4F61]">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-bold text-[#0B1C2D] mb-3 group-hover:text-[#3E9BFF] transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-sm text-[#3D4F61] flex-1 line-clamp-3">
                    {article.summary}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-[#3E9BFF]/10 mt-auto">
                    <div className="flex items-center gap-2 text-sm text-[#3D4F61]">
                      <User className="w-4 h-4 text-[#3E9BFF]" />
                      {article.author}
                    </div>
                    <span className="flex items-center gap-1 text-xs text-[#3D4F61]">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                {/* CTA footer */}
                <div className="px-6 pb-6">
                  <div className="flex items-center gap-2 text-[#3E9BFF] font-medium text-sm group-hover:underline">
                    Read article
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </a>
          ))}
        </div>

        {/* Video Library */}
        <div id='video' className="bg-[#EAF3F7] rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Play className="w-7 h-7 text-[#3E9BFF]" />
            <h3 className="text-2xl font-bold text-[#0B1C2D]">Educational Video Library</h3>
          </div>
          <p className="text-[#3D4F61] mb-8 max-w-md">
            Watch expert dental guides on proper technique and preventative care.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchData.media.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedVideo(item)}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <svg className='w-20 h-fit rounded-2xl shadow-lg group-hover:scale-110transition-transform' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 180">
                      <path fill="#f00" d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134" />
                      <path fill="#fff" d="m102.421 128.06l66.328-38.418l-66.328-38.418z" />
                    </svg>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-0.5 rounded font-mono">
                    {item.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-[#0B1C2D] group-hover:text-[#3E9BFF] transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* YouTube Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-red-50 transition-colors z-20 group"
            >
              <X className="w-6 h-6 text-gray-700 group-hover:text-[#ff0000]" />
            </button>

            <div className="aspect-video bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-t-3xl"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-[#0B1C2D]">{selectedVideo.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}