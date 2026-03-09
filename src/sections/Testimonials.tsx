// Testimonials.tsx
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star, MessageCircle, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Regular Patient',
    image: 'https://images.ctfassets.net/l7h59hfnlxjx/7giNVQxcgrmTscNF9MyLXb/0b09e988afc61dedb2a308972fd71731/Sarah_Johnson.JPEG?q=75&w=1014&fm=webp',
    rating: 5,
    text: "I've been coming to Belleville Dental for over 5 years now, and I couldn't be happier with the care I receive. Dr. Martinez and the entire team are incredibly professional.",
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'New Patient',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx4X_vze_iGZWqXZjkX8l43_2aF2aEAX3qSA&s',
    rating: 5,
    text: "After years of avoiding the dentist due to anxiety, I finally found a practice that puts me at ease. The staff at Belleville Dental are patient and understanding.",
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Cosmetic Patient',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1R559cfF9CItm2B-mlz1qG-bO8pjaaJzd8A&s',
    rating: 5,
    text: "I had my teeth whitened and the results exceeded my expectations! The team took the time to explain the process and made sure I was comfortable throughout.",
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'Family Patient',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2F-QAymjOiA0_VBaeegQcB0gAxs3MK-76OA&s',
    rating: 5,
    text: "Our whole family comes to Belleville Dental. The staff is wonderful with kids and makes every visit a positive experience. We wouldn't go anywhere else!",
  },
  {
    id: 5,
    name: 'Jennifer Williams',
    role: 'Emergency Patient',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6P8F58GMgJ8U8WZII-0QOMmNPB5Bs44a1lw&s',
    rating: 5,
    text: "When I had a dental emergency on a Saturday, Belleville Dental fit me in right away. Dr. Patel was compassionate and fixed my issue quickly.",
  },
  {
    id: 6,
    name: 'Robert Martinez',
    role: 'Implant Patient',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTITok9f5uO3Xw94i1WGGqr0eTLV-OJYj5jww&s',
    rating: 5,
    text: "I had a dental implant procedure done here and the experience was fantastic from start to finish. My new tooth looks and feels completely natural!",
  },
  {
    id: 7,
    name: 'Amanda Foster',
    role: 'Orthodontic Patient',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvnXs3BAePsEP4YyYGCbvnkBJs32hpP4fkw&s',
    rating: 5,
    text: "The Invisalign treatment I received was life-changing! The team monitored my progress closely and the results are amazing. My smile has never looked better.",
  },
  {
    id: 8,
    name: 'James Wilson',
    role: 'Regular Patient',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTINRZo37T2zYFc1Jb_4L7V38M2qE4iaEC0fw&s',
    rating: 5,
    text: "Best dental experience ever! The office is modern, the staff is friendly, and Dr. Martinez really takes time to explain everything. Highly recommend!",
  },
];

// Split for desktop marquee
const firstRow = testimonials.slice(0, 4);
const secondRow = testimonials.slice(4, 8);

// Trust badge avatars
const trustAvatars = testimonials.slice(0, 4).map((t) => t.image);

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Mobile Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = testimonials.length;

  const goToSlide = (index: number) => setCurrentSlide(index);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  const nextSlide = () => setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));

  // GSAP Animations (only for desktop marquee)
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

      gsap.fromTo(
        marqueeRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          delay: 0.3,
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
    <div className="testimonial-card group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full min-w-85 max-w-85 shrink-0">
      <div className="w-12 h-12 bg-[#3E9BFF]/10 rounded-xl flex items-center justify-center mb-4 transition-colors group-hover:bg-[#3E9BFF]/20">
        <Quote className="w-6 h-6 text-[#3E9BFF]" />
      </div>

      <div className="flex gap-1 mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        ))}
      </div>

      <p className="text-[#3D4F61] leading-relaxed text-[15px] grow mb-4">
        "{testimonial.text}"
      </p>

      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <div className="w-11 h-11 rounded-full bg-[#3E9BFF]/10 flex items-center justify-center overflow-hidden shrink-0">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>
        <div>
          <h4 className="font-bold text-[#0B1C2D] text-sm">{testimonial.name}</h4>
          <p className="text-xs text-[#3D4F61]">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-24 bg-linear-to-b from-white to-[#EAF3F7] overflow-hidden"
    >
      <div ref={contentRef} className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 md:py-2 bg-[#3E9BFF]/10 rounded-full mb-4 md:mb-5 text-sm md:text-base">
            <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-[#3E9BFF]" />
            <span className="font-medium text-[#3E9BFF]">Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B1C2D] mb-4 md:mb-5 leading-tight">
            What Our <span className="text-[#3E9BFF]">Patients</span> Say
          </h2>
          <p className="text-base md:text-lg text-[#3D4F61] max-w-2xl mx-auto leading-relaxed">
            Real stories from real patients about their experience at Belleville Dental
          </p>
        </div>
      </div>

      {/* ====================== DESKTOP MARQUEE ====================== */}
      <div className="hidden lg:block">
        <div ref={marqueeRef} className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-[#EAF3F7] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-[#EAF3F7] to-transparent z-10 pointer-events-none" />

          {/* First Row - Left to Right */}
          <div className="marquee-container mb-6">
            <div className="marquee-track marquee-left">
              <div className="flex gap-6 px-3">
                {firstRow.map((t) => <TestimonialCard key={`first-${t.id}`} testimonial={t} />)}
              </div>
              <div className="flex gap-6 px-3">
                {firstRow.map((t) => <TestimonialCard key={`first-dup-${t.id}`} testimonial={t} />)}
              </div>
            </div>
          </div>

          {/* Second Row - Right to Left */}
          <div className="marquee-container">
            <div className="marquee-track marquee-right">
              <div className="flex gap-6 px-3">
                {secondRow.map((t) => <TestimonialCard key={`second-${t.id}`} testimonial={t} />)}
              </div>
              <div className="flex gap-6 px-3">
                {secondRow.map((t) => <TestimonialCard key={`second-dup-${t.id}`} testimonial={t} />)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================== MOBILE NORMAL CAROUSEL (no animation) ====================== */}
      <div className="lg:hidden px-5">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full shrink-0 px-2">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <div className="flex justify-between items-center mt-6 px-4">
          <button
            onClick={prevSlide}
            className="w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#3E9BFF] hover:text-white transition-all active:scale-95"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#3E9BFF] hover:text-white transition-all active:scale-95"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-[#3E9BFF] scale-125' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ====================== TRUST BADGE ====================== */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 mt-14 md:mt-16">
        <div className="text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-6 md:gap-10 bg-white rounded-2xl px-8 py-5 shadow-md border border-gray-100">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {trustAvatars.map((src, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm"
                  >
                    <img src={src} alt="Happy patient" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <span className="text-sm text-[#3D4F61] ml-2">10K+ Happy Patients</span>
            </div>

            <div className="hidden sm:block w-px h-8 bg-gray-200" />

            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-[#3D4F61]">4.9 Average Rating</span>
            </div>

            <div className="hidden sm:block w-px h-8 bg-gray-200" />

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#3D4F61]" />
              <span className="text-sm text-[#3D4F61]">15 Years of Experience</span>
            </div>

            <div className="hidden sm:block w-px h-8 bg-gray-200" />

            <div className="flex items-center gap-2">
              <span className="text-sm text-[#3D4F61]">99% Satisfaction Rate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}