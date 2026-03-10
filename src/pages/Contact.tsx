// Contact.tsx
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  MessageSquare,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xgolqvjz';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // ✅ FIXED: Get today's date using local components (no timezone shift)
  const getTodayStr = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayStr = getTodayStr();

  // Automatically set today's date on mount
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      preferredDate: todayStr,
    }));
  }, [todayStr]);

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

  const validateDate = (dateString: string): string | null => {
    if (!dateString) return null;
    if (dateString !== todayStr) {
      return 'Please select today’s date only';
    }
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'preferredDate') {
      setDateError(validateDate(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const dateValidationError = validateDate(formData.preferredDate);
    if (dateValidationError) {
      setDateError(dateValidationError);
      const dateInput = document.querySelector('input[name="preferredDate"]') as HTMLInputElement;
      if (dateInput) dateInput.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            preferredDate: getTodayStr(),
            message: '',
          });
          setDateError(null);
          setSubmitError(null);
        }, 4000);
      } else {
        const errorData = await response.json();
        setSubmitError(
          errorData.error ||
            'Something went wrong. Please try again or email us directly.'
        );
      }
    } catch (err) {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-30 bg-[#F6FAFC] relative"
    >
      {/* Background Image & Decorative Elements */}
      <div className="absolute inset-0">
        <img
          src="/hero_bg.jpg"
          alt="Modern dental care"
          className="w-full h-full object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-[#F6FAFC]/80" />
        <div className="absolute top-20 left-20 w-3 h-3 bg-[#3E9BFF] rounded-full animate-pulse" />
        <div className="absolute top-40 right-40 w-2 h-2 bg-[#3E9BFF]/60 rounded-full" />
        <div className="absolute bottom-10 right-32 w-4 h-4 bg-[#3E9BFF]/40 rounded-full animate-bounce" />
        <div className="absolute top-28 left-[20%] text-[#3E9BFF]/30 text-2xl">+</div>
        <div className="absolute bottom-40 left-[35%] text-[#3E9BFF]/20 text-xl">+</div>
        <div className="absolute top-1/3 right-[15%] text-[#3E9BFF]/25 text-lg">+</div>
      </div>

      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3E9BFF]/10 rounded-full mb-4">
            <MessageSquare className="w-4 h-4 text-[#3E9BFF]" />
            <span className="text-sm font-medium text-[#3E9BFF]">Get in Touch</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0B1C2D] mb-4">
            Contact <span className="text-[#3E9BFF]">Us</span>
          </h2>
          <p className="text-lg text-[#3D4F61] max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#3E9BFF]/10">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B1C2D] mb-2">
                  Message Sent!
                </h3>
                <p className="text-[#3D4F61]">
                  Thank you for reaching out. We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-bold text-[#0B1C2D] mb-6">
                  Send us a Message
                </h3>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#0B1C2D] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#3E9BFF]/20 focus:border-[#3E9BFF] focus:ring-2 focus:ring-[#3E9BFF]/20 outline-none transition-all"
                      placeholder="My Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0B1C2D] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#3E9BFF]/20 focus:border-[#3E9BFF] focus:ring-2 focus:ring-[#3E9BFF]/20 outline-none transition-all"
                      placeholder="me@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#0B1C2D] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#3E9BFF]/20 focus:border-[#3E9BFF] focus:ring-2 focus:ring-[#3E9BFF]/20 outline-none transition-all"
                      placeholder="(+1) 234-567-8900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0B1C2D] mb-2">
                      Today's Date *
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      min={todayStr}
                      max={todayStr}
                      required
                      readOnly
                      className="date-locked w-full px-4 py-3 rounded-xl border border-[#3E9BFF]/20 bg-gray-50 text-gray-700"
                    />
                    {dateError && (
                      <p className="mt-1.5 text-sm text-red-600 font-medium">
                        {dateError}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0B1C2D] mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-[#3E9BFF]/20 focus:border-[#3E9BFF] focus:ring-2 focus:ring-[#3E9BFF]/20 outline-none transition-all resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                {submitError && (
                  <p className="text-center text-red-600 font-medium">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !!dateError}
                  className="w-full py-4 bg-[#3E9BFF] text-white rounded-xl font-semibold hover:bg-[#2980e6] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 bg-[#3E9BFF]/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#3E9BFF]" />
                </div>
                <div>
                  <p className="text-sm text-[#3D4F61]">Email Us</p>
                  <p className="font-semibold text-[#0B1C2D]">info@bellevilledental.com</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 bg-[#3E9BFF]/10 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#3E9BFF]" />
                </div>
                <div>
                  <p className="text-sm text-[#3D4F61]">Call Us</p>
                  <p className="font-semibold text-[#0B1C2D]">(+1) 973-751-6600</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 bg-[#3E9BFF]/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#3E9BFF]" />
                </div>
                <div>
                  <p className="text-sm text-[#3D4F61]">Visit Us</p>
                  <p className="font-semibold text-[#0B1C2D]">5 Franklin Ave #108, Belleville,</p>
                  <p className="text-sm text-[#3D4F61]">NJ 07109, United States</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 bg-[#3E9BFF]/10 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#3E9BFF]" />
                </div>
                <div>
                  <p className="text-sm text-[#3D4F61]">Office Hours</p>
                  <p className="font-semibold text-[#0B1C2D]">Mon - Thu: 8am - 6pm</p>
                  <p className="text-sm text-[#3D4F61]">Fri: 8am - 3pm</p>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-[#3E9BFF]/10">
              <div className="bg-[#EAF3F7] px-6 py-5 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-[#3E9BFF]" />
                <div>
                  <h4 className="font-semibold text-[#0B1C2D]">Find Us on Map</h4>
                  <p className="text-sm text-[#3D4F61]">5 Franklin Ave #108, Belleville, NJ 07109, United States</p>
                </div>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3020.8798567859276!2d-74.17826452473246!3d40.786655371382516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c255013123f9e9%3A0x45650837c0e8e34d!2sBelleville%20Dental%20Center%2C%20PC!5e0!3m2!1sen!2sng!4v1772015331027!5m2!1sen!2sng"
                width="100%"
                height="380"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
                title="Belleville Dental Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}