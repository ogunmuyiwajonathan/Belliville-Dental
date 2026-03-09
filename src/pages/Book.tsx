// src/pages/BookAppointment.tsx
import { useState } from 'react';
import { Send, CheckCircle, X, BookOpenText } from 'lucide-react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xreawvbq';

const treatments = [
  { name: 'Veneers', image: '/treatments/venner.png', desc: 'Porcelain veneers' },
  { name: 'Scaling & Polishing', image: '/treatments/scaling.png', desc: 'Deep cleaning' },
  { name: 'Crowns', image: '/treatments/crowns.png', desc: 'Tooth restoration' },
  { name: 'Braces', image: '/treatments/brace.png', desc: 'Orthodontic treatment' },
  { name: 'Denture', image: '/treatments/denture.png', desc: 'Full/partial dentures' },
  { name: 'Teeth Whitening', image: '/treatments/white.png', desc: 'Brighten your smile' },
  { name: 'Root Canal Treatment', image: '/treatments/root.png', desc: 'Save your tooth' },
  { name: 'Dental Filling', image: '/treatments/filling.png', desc: 'Cavity restoration' },
  { name: 'Invisalign', image: '/treatments/invisalign.png', desc: 'Clear aligners' },
  { name: 'Bonding Composite', image: '/treatments/bonding.png', desc: 'Tooth reshaping' },
  { name: 'Habit Breaker', image: '/treatments/habit.png', desc: 'For kids & adults' },
  { name: 'Digital Scan / X-rays', image: '/treatments/x-ray.png', desc: 'Advanced imaging' },
  { name: 'Implant', image: '/treatments/implant.png', desc: 'Tooth replacement' },
  { name: 'Extraction', image: '/treatments/extraction.png', desc: 'Safe removal' },
  { name: 'General Consultation', image: '/treatments/consultation.png', desc: 'Routine check-up' },
];

export default function BookAppointment() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    treatment: [] as string[],
    date: '',
    time: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const toggleTreatment = (treatmentName: string) => {
    setFormData(prev => {
      const current = prev.treatment;
      const newTreatments = current.includes(treatmentName)
        ? current.filter(t => t !== treatmentName)
        : [...current, treatmentName];

      return { ...prev, treatment: newTreatments };
    });
  };

  const removeTreatment = (treatmentName: string) => {
    setFormData(prev => ({
      ...prev,
      treatment: prev.treatment.filter(t => t !== treatmentName),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName) {
      setError('First and Last name are required');
      return;
    }
    if (!formData.email && !formData.phone) {
      setError('Please provide either Email or Phone number');
      return;
    }
    if (!formData.date || !formData.time) {
      setError('Please select Date & Time');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            treatment: [],
            date: '',
            time: '',
            message: '',
          });
        }, 6000);
      }
    } catch {
      setError('Something went wrong. Please try again or call us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-30 bg-[#F6FAFC]">
      <div className="text-center px-2 1 mb-10 sm:mb-14 lg:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3E9BFF]/10 rounded-full mb-5">
          <BookOpenText className="w-5 h-5 text-[#3E9BFF]" />
          <span className="text-sm font-medium text-[#3E9BFF]">Schedule your Appointment</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1C2D] mb-4">
          Book <span className='text-gray-600'>Your</span> <span className="text-[#3E9BFF]">Appointment</span>
        </h2>
        <p className="text-base sm:text-lg text-[#3D4F61] max-w-2xl mx-auto">
          Your smile deserves the best care. Let's schedule your visit today.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-2xl p-8 md:p-14">
            {isSuccess ? (
              <div className="text-center py-20">
                <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
                <h2 className="text-4xl font-bold text-[#0B1C2D] mb-4">Appointment Requested!</h2>
                <p className="text-xl text-gray-600">We'll call or email you shortly to confirm.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Names */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#0B1C2D] mb-2">First Name *</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-[#3E9BFF] outline-none transition-all" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0B1C2D] mb-2">Last Name *</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-[#3E9BFF] outline-none transition-all" placeholder="Stones" />
                  </div>
                </div>

                {/* Contact */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#0B1C2D] mb-2">Email Address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-[#3E9BFF] outline-none transition-all" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0B1C2D] mb-2">Phone Number *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-[#3E9BFF] outline-none transition-all" placeholder="(+1) 973-751-6600" />
                  </div>
                </div>

                {/* Treatment Selection */}
                <div>
                  <label className="block text-sm font-semibold text-[#0B1C2D] mb-4">Click the card below to Select Treatment/Treatments</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {treatments.map((t) => {
                      const isSelected = formData.treatment.includes(t.name);
                      return (
                        <button
                          key={t.name}
                          type="button"
                          onClick={() => toggleTreatment(t.name)}
                          className={`group relative h-44 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-end text-left p-5 ${isSelected ? 'border-[#3E9BFF] border-2 shadow-2xl scale-[1.03]' : ''}`}
                          style={{
                            backgroundImage: `url(${t.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        >
                          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
                          <div className="relative z-10">
                            <p className={`font-semibold text-base sm:text-lg text-white ${isSelected ? 'text-[#3E9BFF]' : ''}`}>
                              {t.name}
                            </p>
                            <p className="text-white/80 text-xs sm:text-sm">{t.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Treatments Box */}
                {formData.treatment.length > 0 && (
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                    <p className="text-sm font-medium text-[#0B1C2D] mb-3">Selected Treatments:</p>
                    <div className="flex flex-wrap gap-3">
                      {formData.treatment.map((treatment) => (
                        <div
                          key={treatment}
                          className="flex items-center gap-2 bg-white border border-[#3E9BFF]/30 px-4 py-2 rounded-full text-sm"
                        >
                          {treatment}
                          <button
                            type="button"
                            onClick={() => removeTreatment(treatment)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Date & Time */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#0B1C2D] mb-2">Date *</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} min={today} required className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-[#3E9BFF] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0B1C2D] mb-2">Time *</label>
                    <input type="time" name="time" value={formData.time} onChange={handleChange} required className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-[#3E9BFF] outline-none transition-all" />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-[#0B1C2D] mb-2">Message / Notes (optional)</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-[#3E9BFF] outline-none transition-all resize-none" placeholder="Any special requests or concerns..." />
                </div>

                {error && <p className="text-red-600 font-medium text-center">{error}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-[#3E9BFF] hover:bg-[#2563eb] text-white font-semibold rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl disabled:bg-gray-400"
                >
                  {isSubmitting ? 'Sending...' : 'Confirm Appointment'}
                  <Send className="w-5 h-5" />
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h3 className="font-bold text-2xl text-[#0B1C2D] mb-6">Why Choose Us?</h3>
              <ul className="space-y-5 text-[#3D4F61]">
                <li>• Experienced team with 15+ years</li>
                <li>• State-of-the-art equipment</li>
                <li>• 25+ Expert Dentists</li>
                <li>• Pain-free & gentle care</li>
                <li>• Flexible payment options</li>
                <li>• 24/7 Customer Support</li>
                <li>• 99% Patient Satisfaction</li>
              </ul>
            </div>

            <div className="bg-[#3E9BFF] text-white rounded-3xl p-8">
              <p className="text-2xl font-semibold mb-3">Emergency?</p>
              <p className="mb-6">Call us directly for same-day appointments</p>
              <a href="tel:+19737516600" className="block text-center py-4 bg-white text-[#3E9BFF] font-bold rounded-2xl hover:bg-gray-100 transition">
                (+1) 973-751-6600
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}