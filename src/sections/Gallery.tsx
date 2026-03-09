// Gallery.tsx
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, Filter, ChevronRight, Camera, Building2, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    id: 1,
    src: '/gallery/reception.png',
    category: 'clinic',
    title: 'Modern Reception Area',
  },
  {
    id: 2,
    src: '/gallery/tech.png',
    category: 'equipment',
    title: 'Advanced Imaging Technology',
  },
  {
    id: 3,
    src: '/gallery/expert.png',
    category: 'staff',
    title: 'Our Expert Team',
  },
  {
    id: 4,
    src: '/gallery/digital.png',
    category: 'equipment',
    title: 'Digital Diagnostics',
  },
  {
    src: '/team_medical.jpg',
    id: 5,
    category: 'staff',
    title: 'Administrative Team',
  },
  {
    id: 6,
    src: '/gallery/treat1.png',
    category: 'clinic',
    title: 'Treatment Room 1',
  },
  {
    id: 7,
    src: '/gallery/treat2.png',
    category: 'clinic',
    title: 'Treatment Room 2',
  },
  {
    id: 8,
    src: '/gallery/treat3.png',
    category: 'clinic',
    title: 'Treatment Room 3',
  },
  {
    id: 9,
    src: '/gallery/treat4.png',
    category: 'clinic',
    title: 'Treatment Room 4',
  },

];

const categories = [
  { id: 'all', label: 'All', icon: Camera },
  { id: 'clinic', label: 'Clinic', icon: Building2 },
  { id: 'equipment', label: 'Equipment', icon: Camera },
  { id: 'staff', label: 'Staff', icon: Users },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
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

  const filteredImages = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const currentIndex = selectedImage
    ? filteredImages.findIndex(img => img.id === selectedImage.id)
    : -1;

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setSelectedImage(filteredImages[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    if (currentIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentIndex + 1]);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="py-15 bg-[#F6FAFC]"
    >

      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3E9BFF]/10 rounded-full mb-4">
            <Camera className="w-4 h-4 text-[#3E9BFF]" />
            <span className="text-sm font-medium text-[#3E9BFF]">Our Gallery</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0B1C2D] mb-4">
            Clinic <span className="text-[#3E9BFF]">Gallery</span>
          </h2>
          <p className="text-lg text-[#3D4F61] max-w-2xl mx-auto">
            Take a tour of our modern facilities and meet our team
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Filter className="w-5 h-5 text-[#3D4F61] mr-2 self-center" />
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category.id
                  ? 'bg-[#3E9BFF] text-white shadow-lg shadow-[#3E9BFF]/30'
                  : 'bg-white text-[#3D4F61] hover:bg-[#3E9BFF]/10 hover:text-[#3E9BFF] border border-[#3E9BFF]/20'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className="group relative aspect-4/3 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0B1C2D]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="px-3 py-1 bg-[#3E9BFF] text-white rounded-full text-xs font-medium uppercase mb-2 inline-block">
                  {image.category}
                </span>
                <h3 className="text-white font-semibold">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            disabled={currentIndex === filteredImages.length - 1}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-5xl max-h-[80vh] px-20">
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-center">
              <span className="px-3 py-1 bg-[#3E9BFF] text-white rounded-full text-xs font-medium uppercase">
                {selectedImage.category}
              </span>
              <h3 className="text-white font-semibold mt-2">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
