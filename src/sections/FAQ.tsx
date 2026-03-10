// src/sections/FAQ.tsx
import { useRef, useEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { LucideIcon } from 'lucide-react';
import {
  HelpCircle,
  ChevronDown,
  Calendar,
  Clock,
  CreditCard,
  Smile,
  Stethoscope,
  Phone,
  AlertCircle,
  DollarSign,
  Baby,
  Search,
  X,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─── FAQ data ───────────────────────────────────────────────── */
interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
}

const categories: Category[] = [
  { id: 'all',          label: 'All Questions', icon: HelpCircle   },
  { id: 'appointments', label: 'Appointments',  icon: Calendar     },
  { id: 'treatments',   label: 'Treatments',    icon: Stethoscope  },
  { id: 'insurance',    label: 'Insurance',     icon: CreditCard   },
  { id: 'general',      label: 'General',       icon: Smile        },
  { id: 'emergency',    label: 'Emergencies',   icon: AlertCircle  },
  { id: 'payment',      label: 'Payment',       icon: DollarSign   },
  { id: 'pediatric',    label: 'Pediatric',     icon: Baby         },
];

interface FAQ {
  category: string;
  q: string;
  a: string;
}

const faqs: FAQ[] = [
  /* Appointments */
  { category: 'appointments', q: 'How do I book an appointment?', a: 'You can book an appointment online through our Booking page, call us at (+1) 973-751-6600, or email us at info@bellevilledental.com. We offer same-day appointments for dental emergencies. Online booking is available 24/7 and you can choose your preferred dentist and time slot.' },
  { category: 'appointments', q: 'What are your office hours?', a: 'We are open Monday through Thursday from 8:00 AM to 6:00 PM, and Friday from 8:00 AM to 3:00 PM. We are closed on weekends, but emergency contacts are available. We also offer early morning appointments on Tuesdays and Thursdays starting at 7:00 AM for patients with busy schedules.' },
  { category: 'appointments', q: 'How early should I arrive for my first visit?', a: 'Please arrive 15 minutes before your scheduled appointment to complete any necessary intake forms. You can also download and fill out our new patient forms from our website in advance to save time. This allows us to verify your insurance and medical history thoroughly.' },
  { category: 'appointments', q: 'What is your cancellation policy?', a: 'We ask that you give at least 24 hours notice if you need to cancel or reschedule. This helps us accommodate other patients who may need urgent care. Late cancellations may incur a small fee of $50. We understand emergencies happen, so just give us a call as soon as possible.' },
  { category: 'appointments', q: 'Can I request a specific dentist?', a: "Absolutely! When booking your appointment, you can request your preferred dentist. We have several experienced dentists on staff, and we'll do our best to accommodate your preference based on availability and your specific treatment needs." },
  { category: 'appointments', q: 'How long is a typical cleaning appointment?', a: "A routine cleaning and check-up typically takes 45-60 minutes. If you're a new patient or require additional treatments like X-rays or fluoride treatment, please allow up to 90 minutes for your first visit." },
  { category: 'appointments', q: 'Do you offer weekend appointments?', a: "While we're primarily closed on weekends, we do offer limited Saturday appointments once a month for emergency cases and patients with special circumstances. Please call our office to check availability for weekend appointments." },
  { category: 'appointments', q: 'Can I book appointments for my whole family on the same day?', a: "Yes! We love seeing entire families. We can schedule back-to-back appointments for family members to make your visit convenient. Just let us know your family's needs when booking, and we'll coordinate the schedule accordingly." },

  /* Treatments */
  { category: 'treatments', q: 'Do you offer teeth whitening?', a: 'Yes! We offer professional in-office teeth whitening that delivers results up to 8 shades brighter in a single session. We also provide take-home whitening kits customised to your teeth for gradual brightening. Our in-office Zoom! whitening treatment takes about 90 minutes and includes sensitivity-reducing gel.' },
  { category: 'treatments', q: 'Is Invisalign available at your practice?', a: 'Absolutely. We are a certified Invisalign provider. During your consultation, our orthodontic specialist will assess your teeth and create a custom 3D treatment plan, showing you your expected results before you begin. Treatment typically takes 6-18 months depending on your case.' },
  { category: 'treatments', q: 'How long does a dental implant procedure take?', a: 'The full implant process typically spans 3 to 6 months. The titanium post is placed first and given time to fuse with the jawbone (osseointegration), after which the crown is fitted. Each visit is carefully planned to minimise discomfort. Some patients may qualify for same-day implants in certain cases.' },
  { category: 'treatments', q: 'Do you treat children?', a: "Yes, we welcome patients of all ages starting from age 2. Our pediatric-friendly team creates a calm, fun environment so children feel safe. Early dental visits help build healthy habits for life. Dr. Martinez is specially trained in pediatric dentistry and loves working with children." },
  { category: 'treatments', q: 'What cosmetic dentistry services do you offer?', a: "We offer a comprehensive range of cosmetic services including veneers, bonding, gum contouring, and full smile makeovers. Our cosmetic dentist can address discolored, chipped, misshapen, or gapped teeth to give you the smile you've always wanted." },
  { category: 'treatments', q: 'Do you offer root canal therapy?', a: 'Yes, we perform root canal therapy right here in our office. We use modern techniques and anesthesia to ensure your comfort. Most patients report that the procedure is no more uncomfortable than getting a filling, and it saves your natural tooth from extraction.' },
  { category: 'treatments', q: 'What are dental crowns and when are they needed?', a: "Dental crowns are tooth-shaped caps placed over damaged or decayed teeth to restore their strength, size, and appearance. They're commonly needed after root canals, for large fillings, cracked teeth, or for cosmetic improvements. We offer same-day crowns using our CEREC technology." },
  { category: 'treatments', q: 'Do you offer gum disease treatment?', a: 'Yes, we provide both non-surgical and surgical periodontal treatments. This includes scaling and root planing (deep cleaning), antibiotic therapy, and laser gum treatment for advanced cases. Early intervention is key to preventing tooth loss from gum disease.' },
  { category: 'treatments', q: 'What is the difference between a bridge and an implant?', a: "A bridge uses adjacent teeth for support to replace missing teeth, while an implant is a titanium post surgically placed in the jawbone that acts as an artificial tooth root. Implants are typically longer-lasting and don't affect neighboring teeth, but bridges can be a good option for some patients." },
  { category: 'treatments', q: 'Do you treat sleep apnea?', a: "Yes, we offer oral appliance therapy for mild to moderate sleep apnea. These custom-fitted devices reposition your jaw to keep your airway open during sleep. They're comfortable, portable, and an excellent alternative to CPAP machines for many patients." },

  /* Insurance */
  { category: 'insurance', q: 'Which insurance plans do you accept?', a: 'We accept most major dental insurance plans including Delta Dental, Cigna, Aetna, MetLife, United Healthcare, Guardian, Humana, and Blue Cross Blue Shield. Please call our office to confirm your specific plan is accepted before your visit. We also accept Medicaid for eligible patients.' },
  { category: 'insurance', q: "What if I don't have dental insurance?", a: 'No problem. We offer flexible payment plans and work with CareCredit financing, which allows you to spread payments over time with low or no interest. We also have an in-house wellness plan for uninsured patients that includes preventive care at a discounted rate.' },
  { category: 'insurance', q: 'Do you offer free consultations?', a: 'We offer complimentary consultations for Invisalign, dental implants, and cosmetic procedures. Routine check-up consultations are billed through insurance or at our standard rates. Call us to schedule your free consultation today.' },
  { category: 'insurance', q: 'How do I verify my insurance coverage before my visit?', a: "Our friendly front desk team can verify your insurance benefits before your appointment. Just provide your insurance information when booking, and we'll contact your provider to determine your coverage, deductibles, and out-of-pocket costs." },
  { category: 'insurance', q: 'What is your in-house wellness plan?', a: "Our wellness plan is a membership program for uninsured patients. For a low annual or monthly fee, you receive two cleanings, exams, fluoride treatments, and X-rays, plus discounts on other procedures. It's like having dental insurance without the waiting periods or annual maximums." },
  { category: 'insurance', q: 'Do you accept Medicare or Medicaid?', a: "We accept Medicare for covered dental services and participate in certain Medicaid programs. Coverage varies by state and plan, so please contact our office with your specific information, and we'll help you understand your benefits." },
  { category: 'insurance', q: 'How often does dental insurance cover cleanings?', a: 'Most dental insurance plans cover two preventive cleanings and exams per year (every 6 months). Some plans may cover additional cleanings for patients with periodontal disease. Our team will help you maximize your benefits.' },

  /* General */
  { category: 'general', q: 'How often should I visit the dentist?', a: 'We recommend a routine check-up and professional cleaning every 6 months. Patients with certain conditions such as gum disease, dry mouth, or those undergoing orthodontic treatment may need more frequent visits every 3-4 months.' },
  { category: 'general', q: 'Is dental X-ray radiation safe?', a: 'Modern digital X-rays use up to 80% less radiation than traditional film X-rays. The exposure is extremely minimal — comparable to a short airplane flight. We follow strict guidelines and only take X-rays when clinically necessary. We also provide lead aprons and thyroid collars for maximum protection.' },
  { category: 'general', q: 'What should I do in a dental emergency?', a: "Call our office immediately at (+1) 973-751-6600. We reserve appointment slots for dental emergencies every day. If you have a knocked-out tooth, keep it moist (in milk or saliva) and see us within 30 minutes for the best chance of saving it. For severe pain, bleeding, or swelling, don't wait - call us right away." },
  { category: 'general', q: 'Are you accepting new patients?', a: 'Yes, we are always happy to welcome new patients! We have several experienced dentists accepting new patients of all ages. New patients receive a comprehensive exam including oral cancer screening and a personalized treatment plan.' },
  { category: 'general', q: 'Do you offer sedation dentistry?', a: 'Yes, we offer various sedation options for anxious patients including nitrous oxide (laughing gas), oral sedation, and IV sedation. This allows you to relax comfortably during your treatment. Many patients who previously avoided the dentist now receive care comfortably with sedation.' },
  { category: 'general', q: 'How do I care for my teeth between visits?', a: "Brush twice daily with fluoride toothpaste, floss once daily, and use an antibacterial mouthwash. Limit sugary snacks and drinks, and don't use tobacco products. Replace your toothbrush every 3-4 months. Our team provides personalized home care instructions at each visit." },
  { category: 'general', q: 'What causes bad breath and how can I prevent it?', a: 'Bad breath (halitosis) can be caused by poor oral hygiene, gum disease, dry mouth, certain foods, or medical conditions. Regular brushing, flossing, tongue cleaning, and professional cleanings help. Drink plenty of water and avoid tobacco. If persistent, we can help identify underlying causes.' },
  { category: 'general', q: 'Do you use latex in your practice?', a: 'We are a latex-free practice to accommodate patients with latex allergies. All our gloves, dental dams, and other materials are latex-free. Please inform us of any allergies before your appointment.' },
  { category: 'general', q: 'Is your office wheelchair accessible?', a: 'Yes, our office is fully wheelchair accessible with wide doorways, accessible restrooms, and designated parking spaces. Please let us know if you have any special accessibility needs when booking your appointment.' },

  /* Emergency */
  { category: 'emergency', q: 'What constitutes a dental emergency?', a: "Dental emergencies include severe toothaches, knocked-out teeth, cracked or broken teeth, loose teeth, abscesses or infections, severe gum bleeding, and injuries to soft tissues (lips, tongue, cheeks). If you're unsure, call us - we're here to help 24/7." },
  { category: 'emergency', q: 'What should I do for a severe toothache at night?', a: "Rinse with warm salt water, gently floss to remove any trapped food, and take over-the-counter pain relievers. Apply a cold compress to reduce swelling. Call our emergency line immediately - we have a dentist on call 24/7 for emergencies." },
  { category: 'emergency', q: 'How do I handle a knocked-out tooth?', a: "Hold the tooth by the crown (not the root), gently rinse if dirty but don't scrub. Try to reinsert it into the socket, or keep it moist in milk or saliva. See us within 30 minutes for the best chance of saving the tooth. Time is critical!" },
  { category: 'emergency', q: 'What if I have a broken crown or filling?', a: "Save any pieces if possible. Rinse your mouth with warm salt water. If you're in pain, apply clove oil to the area. Call our office immediately - we'll get you in as soon as possible, usually the same day, to prevent further damage." },
  { category: 'emergency', q: 'Do you have an after-hours emergency number?', a: 'Yes, we have a dentist on call 24 hours a day, 7 days a week. Call our main number (+1) 973-751-6600 and follow the prompts to reach our emergency line. For life-threatening emergencies, always call 911 first.' },

  /* Payment */
  { category: 'payment', q: 'What payment methods do you accept?', a: 'We accept cash, all major credit cards (Visa, MasterCard, American Express, Discover), debit cards, and CareCredit. We also offer flexible payment plans for major treatments. Payment is due at the time of service unless prior arrangements have been made.' },
  { category: 'payment', q: 'Do you offer payment plans for major treatments?', a: 'Yes, we offer interest-free payment plans for treatments over $500. We also work with CareCredit and other healthcare financing companies that offer low or no-interest payment options. Our treatment coordinators can help you find a plan that fits your budget.' },
  { category: 'payment', q: 'What is CareCredit and how does it work?', a: 'CareCredit is a healthcare credit card designed for dental and medical expenses. It offers promotional financing options including interest-free periods if paid in full within 6, 12, 18, or 24 months. Application is quick and you get an instant decision.' },
  { category: 'payment', q: 'Do you offer discounts for seniors or veterans?', a: 'Yes, we offer a 10% discount for seniors (65+) and veterans on most dental services. We also participate in the VA Community Care Network for eligible veterans. Please mention your status when booking so we can ensure you receive your discount.' },
  { category: 'payment', q: "What if I can't afford my dental treatment?", a: "We never want cost to prevent you from getting necessary dental care. We offer multiple solutions: payment plans, CareCredit financing, our in-house wellness plan, and we can help prioritize treatment to address urgent needs first. Talk to us - we're here to help." },

  /* Pediatric */
  { category: 'pediatric', q: 'When should my child first see a dentist?', a: 'The American Dental Association recommends children visit the dentist by their first birthday or within 6 months of their first tooth erupting. Early visits help prevent cavities and establish good oral hygiene habits from the start.' },
  { category: 'pediatric', q: 'How can I prepare my child for their first dental visit?', a: 'Talk positively about the dentist - avoid using words like "pain" or "hurt". Read children\'s books about visiting the dentist. Bring them along to your own appointments to familiarize them with the environment. Our pediatric-friendly team makes visits fun and educational!' },
  { category: 'pediatric', q: 'Do you offer fluoride treatments for children?', a: 'Yes, we recommend fluoride varnish treatments for children at every cleaning appointment. Fluoride strengthens enamel and prevents cavities. We also discuss fluoride in drinking water and recommend supplements if needed.' },
  { category: 'pediatric', q: 'What about dental sealants for kids?', a: "Dental sealants are thin protective coatings applied to the chewing surfaces of back teeth (molars). They're highly effective at preventing cavities and can last for years. We recommend sealants for most children once their permanent molars come in." },
  { category: 'pediatric', q: 'My child sucks their thumb. Should I be concerned?', a: 'Thumb sucking is normal in young children, but prolonged habits can affect tooth alignment and jaw development. Most children stop naturally between ages 2-4. If it continues beyond age 4, we can discuss gentle ways to help your child stop.' },
  { category: 'pediatric', q: 'What happens if my child gets a cavity in a baby tooth?', a: 'Baby teeth are important for chewing, speaking, and holding space for permanent teeth. We treat cavities in baby teeth with fillings or, if necessary, stainless steel crowns. Early treatment prevents pain, infection, and orthodontic problems later.' },
];

/* ─── Highlight matching text ─────────────────────────────────── */
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-[#3E9BFF]/20 text-[#1E5FA8] rounded px-0.5 font-semibold not-italic">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/* ─── Single FAQ item ─────────────────────────────────────────── */
function FaqItem({
  item, index, isOpen, onToggle, searchQuery,
}: {
  item: FAQ; index: number; isOpen: boolean; onToggle: () => void; searchQuery: string;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    if (isOpen) {
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.35, ease: 'power2.out' });
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.28, ease: 'power2.in' });
    }
  }, [isOpen]);

  return (
    <div className={`group border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-[#3E9BFF]/40 shadow-lg shadow-[#3E9BFF]/10 bg-white' : 'border-gray-100 bg-white hover:border-[#3E9BFF]/25 hover:shadow-md'}`}>
      <button onClick={onToggle} className="w-full flex items-center gap-4 p-5 sm:p-6 text-left" aria-expanded={isOpen}>
        <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300 ${isOpen ? 'bg-[#3E9BFF] text-white' : 'bg-[#3E9BFF]/10 text-[#3E9BFF]'}`}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className={`flex-1 font-semibold text-base sm:text-lg leading-snug transition-colors duration-300 ${isOpen ? 'text-[#3E9BFF]' : 'text-[#0B1C2D] group-hover:text-[#3E9BFF]'}`}>
          <Highlight text={item.q} query={searchQuery} />
        </span>
        <ChevronDown className={`shrink-0 w-5 h-5 text-[#3E9BFF] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div ref={bodyRef} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
          <div className="ml-12 border-l-2 border-[#3E9BFF]/20 pl-5">
            <p className="text-[#3D4F61] leading-relaxed text-sm sm:text-base">
              <Highlight text={item.a} query={searchQuery} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main FAQ section ────────────────────────────────────────── */
export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIndex,      setOpenIndex]      = useState<number | null>(0);
  const [searchQuery,    setSearchQuery]    = useState('');

  /* GSAP scroll entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      });
      gsap.fromTo('.faq-card', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power2.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* Re-animate when filter or search changes */
  useEffect(() => {
    gsap.fromTo('.faq-card', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out' });
    setOpenIndex(0);
  }, [activeCategory, searchQuery]);

  /* Filter + search logic */
  const filtered = useMemo(() => {
    let list = activeCategory === 'all' ? faqs : faqs.filter(f => f.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
    }
    return list;
  }, [activeCategory, searchQuery]);

  const handleClearSearch = () => {
    setSearchQuery('');
    inputRef.current?.focus();
  };

  return (
    <section ref={sectionRef} id="faq" className="py-24 sm:py-32 bg-gradient-to-b from-[#EAF3F7] to-white">
      <div ref={contentRef} className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#3E9BFF]/10 rounded-full mb-4 text-sm">
            <HelpCircle className="w-4 h-4 text-[#3E9BFF]" />
            <span className="font-medium text-[#3E9BFF]">Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B1C2D] mb-4 leading-tight">
            Frequently Asked <span className="text-[#3E9BFF]">Questions</span>
          </h2>
          <p className="text-base md:text-lg text-[#3D4F61] max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about visiting Belleville Dental. Can't find your answer?{' '}
            <a href="/contact" className="text-[#3E9BFF] font-medium hover:underline underline-offset-2">Contact our team</a>.
          </p>
        </div>

        {/* ── Search bar ── */}
        <div className="relative mb-8 group">
          <div className={`flex items-center gap-3 bg-white border-2 rounded-2xl px-5 py-4 shadow-sm transition-all duration-300 ${searchQuery ? 'border-[#3E9BFF] shadow-lg shadow-[#3E9BFF]/10' : 'border-gray-200 group-focus-within:border-[#3E9BFF] group-focus-within:shadow-lg group-focus-within:shadow-[#3E9BFF]/10'}`}>
            <Search className={`w-5 h-5 shrink-0 transition-colors duration-300 ${searchQuery ? 'text-[#3E9BFF]' : 'text-gray-400 group-focus-within:text-[#3E9BFF]'}`} />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search questions… e.g. insurance, whitening, children"
              className="flex-1 text-sm sm:text-base text-[#0B1C2D] placeholder-gray-400 bg-transparent outline-none focus:outline-none focus:ring-0 border-none"
            />
            {/* Result count badge */}
            {searchQuery && (
              <span className="shrink-0 px-2.5 py-1 bg-[#3E9BFF]/10 text-[#3E9BFF] text-xs font-semibold rounded-full">
                {filtered.length} result{filtered.length !== 1 ? 's' : ''}
              </span>
            )}
            {/* Clear button */}
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="shrink-0 w-7 h-7 rounded-full bg-gray-100 hover:bg-[#3E9BFF]/15 flex items-center justify-center transition-colors duration-200"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5 text-gray-500 hover:text-[#3E9BFF]" />
              </button>
            )}
          </div>

          {/* Search hint when active and no results */}
          {searchQuery && filtered.length === 0 && (
            <div className="mt-3 flex items-center gap-2 px-2 text-sm text-[#3D4F61]">
              <HelpCircle className="w-4 h-4 text-[#3E9BFF] shrink-0" />
              No questions match <span className="font-semibold text-[#0B1C2D]">"{searchQuery}"</span>. Try a different keyword or{' '}
              <button onClick={handleClearSearch} className="text-[#3E9BFF] font-medium hover:underline underline-offset-2">clear search</button>.
            </div>
          )}
        </div>

        {/* ── Category filter pills ── */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setActiveCategory(id); setSearchQuery(''); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === id && !searchQuery
                  ? 'bg-[#3E9BFF] text-white shadow-lg shadow-[#3E9BFF]/30 scale-105'
                  : 'bg-white border border-gray-200 text-[#3D4F61] hover:border-[#3E9BFF]/40 hover:text-[#3E9BFF] hover:bg-[#3E9BFF]/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* ── FAQ accordion list ── */}
        <div ref={cardsRef} className="space-y-3">
          {filtered.map((item, i) => (
            <div key={`${activeCategory}-${searchQuery}-${i}`} className="faq-card">
              <FaqItem
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                searchQuery={searchQuery}
              />
            </div>
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <div className="mt-14 rounded-2xl bg-white border border-[#3E9BFF]/15 shadow-md p-7 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#3E9BFF]/10 rounded-xl flex items-center justify-center shrink-0">
              <Phone className="w-7 h-7 text-[#3E9BFF]" />
            </div>
            <div>
              <p className="font-bold text-[#0B1C2D] text-lg">Still have questions?</p>
              <p className="text-[#3D4F61] text-sm mt-0.5">Our friendly team is happy to help.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a href="tel:+19737516600" className="flex items-center justify-center gap-2 px-6 py-3 bg-[#3E9BFF] hover:bg-[#2563eb] text-white font-semibold rounded-full shadow-lg shadow-[#3E9BFF]/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 text-sm">
              <Phone className="w-4 h-4" />
              Call Us Now
            </a>
            <a href="/book" className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-[#3E9BFF]/25 hover:border-[#3E9BFF] text-[#3E9BFF] hover:bg-[#3E9BFF]/5 font-semibold rounded-full transition-all duration-300 hover:-translate-y-0.5 text-sm">
              <Clock className="w-4 h-4" />
              Book Appointment
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}