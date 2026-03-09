import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowRight, Calendar, Shield, Sparkles } from 'lucide-react';

export default function Hero() {
  const navigate = useNavigate();

  const heroRef = useRef<HTMLElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const cardInnerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headlineRef.current) return;

    const headlines = headlineRef.current.querySelectorAll('h1');
    headlines.forEach((h1) => {
      if (h1.dataset.wordsSplit === 'true') return;

      const text = h1.textContent?.trim() || '';
      const words = text.split(/\s+/);
      h1.innerHTML = words
        .map((word) => `<span class="word inline-block">${word}</span>`)
        .join(' ');
      h1.dataset.wordsSplit = 'true';
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        cardWrapperRef.current,
        { x: '50vw', opacity: 0, rotateY: -12, rotateX: 8 },
        { x: 0, opacity: 1, rotateY: 0, rotateX: 0, duration: 1.4 }
      )
        .fromTo(
          headlineRef.current?.querySelectorAll('.word') || [],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.05 },
          '-=1.1'
        )
        .fromTo(
          subheadRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.6'
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7 },
          '-=0.5'
        );
    }, heroRef.current ?? undefined);

    return () => ctx.revert();
  }, []);

  // 3D card effect
  useEffect(() => {
    const card = cardInnerRef.current;
    const glare = glareRef.current;
    const wrapper = cardWrapperRef.current;
    if (!card || !wrapper) return;

    let currentRotateX = 0;
    let currentRotateY = 0;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let rafId: number | null = null;

    const lerp = (start: number, end: number, t: number) =>
      start + (end - start) * t;

    const update = () => {
      currentRotateX = lerp(currentRotateX, targetRotateX, 0.12);
      currentRotateY = lerp(currentRotateY, targetRotateY, 0.12);

      card.style.transform = `
        perspective(1200px)
        rotateX(${currentRotateX}deg)
        rotateY(${currentRotateY}deg)
        translateZ(40px)
        scale(1.03)
      `;

      if (glare) {
        const shineX = 50 + currentRotateY * 2;
        const shineY = 50 - currentRotateX * 2;
        glare.style.backgroundPosition = `${shineX}% ${shineY}%`;
        glare.style.opacity = Math.min(0.4, Math.abs(currentRotateY) / 10 + 0.15).toString();
      }

      rafId = requestAnimationFrame(update);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      targetRotateY = ((x - centerX) / centerX) * 14;
      targetRotateX = -((y - centerY) / centerY) * 14;
    };

    const onEnter = () => {
      if (rafId === null) rafId = requestAnimationFrame(update);
      card.style.transition = 'transform 0.18s ease-out';
    };

    const onLeave = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      targetRotateX = 0;
      targetRotateY = 0;
      card.style.transition = 'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)';
      if (glare) glare.style.opacity = '0';
      update();
    };

    wrapper.addEventListener('mouseenter', onEnter);
    wrapper.addEventListener('mousemove', onMouseMove);
    wrapper.addEventListener('mouseleave', onLeave);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      wrapper.removeEventListener('mouseenter', onEnter);
      wrapper.removeEventListener('mousemove', onMouseMove);
      wrapper.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen mt-8 w-full overflow-hidden bg-[#F6FAFC]"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/dental.png"
          alt="Modern dental care background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#F6FAFC] via-[#F6FAFC]/80 to-transparent" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-3 h-3 bg-[#3E9BFF] rounded-full animate-pulse" />
      <div className="absolute bottom-32 right-32 w-4 h-4 bg-[#3E9BFF]/40 rounded-full" />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-30">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text + CTA */}
            <div className="space-y-8">
              <div ref={headlineRef} className="space-y-2">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#0B1C2D] leading-[0.95] tracking-tight">
                  Belleville
                </h1>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight">
                  <span className="text-[#3E9BFF]">Dental Care</span>
                </h1>
              </div>

              <p
                ref={subheadRef}
                className="text-lg sm:text-xl text-[#3D4F61] max-w-md leading-relaxed"
              >
                Gentle dentistry, advanced technology, and a team that listens.
                Your smile deserves the best care.
              </p>

              <div ref={ctaRef} className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/book')}
                  className="group px-8 py-4 bg-[#3E9BFF] text-white rounded-full font-semibold text-base hover:bg-[#2980e6] transition-all duration-300 hover:shadow-xl hover:shadow-[#3E9BFF]/30 flex items-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Book a Visit
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate('/aboutus')}
                  className="group px-8 py-4 border-2 border-[#3E9BFF] text-[#3E9BFF] rounded-full font-semibold text-base hover:bg-[#3E9BFF] hover:text-white transition-all duration-300 flex items-center gap-2"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="flex items-center gap-6 pt-4 flex-wrap">
                <div className="flex items-center gap-2 text-sm text-[#3D4F61]">
                  <Shield className="w-5 h-5 text-[#3E9BFF]" />
                  <span>Certified Experts</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#3D4F61]">
                  <Sparkles className="w-5 h-5 text-[#3E9BFF]" />
                  <span>Advanced Technology</span>
                </div>
              </div>

              <p className="text-xs text-[#3D4F61]/70 pt-2">
                New patients get <span className="font-semibold text-[#3E9BFF]">25% off</span> for the first month of purchase
              </p>
            </div>

            {/* Right: 3D tilting card */}
            <div className="hidden lg:block relative" ref={cardWrapperRef}>
              <div
                ref={cardInnerRef}
                className="
                  relative bg-white/75 backdrop-blur-xl 
                  rounded-3xl p-8 shadow-2xl shadow-[#0B1C2D]/20 
                  border border-white/50 overflow-hidden
                  cursor-pointer will-change-transform
                "
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  ref={glareRef}
                  className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.45) 5%, transparent 60%)',
                    backgroundSize: '180% 180%',
                    transform: 'translateZ(60px)',
                  }}
                />

                <div className="relative z-10">
                  <div className="aspect-4/3 rounded-2xl overflow-hidden mb-6 shadow-md">
                    <img
                      src="hero.png"
                      alt="Dental team or clinic"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-[#3E9BFF]/15 rounded-2xl flex items-center justify-center shrink-0">
                        <Calendar className="w-7 h-7 text-[#3E9BFF]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0B1C2D] text-lg">Easy Scheduling</p>
                        <p className="text-[#3D4F61]">Book online — available 24/7</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-[#3E9BFF]/15 rounded-2xl flex items-center justify-center shrink-0">
                        <Shield className="w-7 h-7 text-[#3E9BFF]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0B1C2D] text-lg">Safe & Sterile</p>
                        <p className="text-[#3D4F61]">Highest sterilization standards</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}