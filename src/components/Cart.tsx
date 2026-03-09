// Cart.tsx
import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';
import { useCartStore } from '../hooks/cartStore';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

type ToastStage = 'idle' | 'loading' | 'success';

export default function Cart({ isOpen, onClose }: CartProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const confettiRef = useRef<HTMLCanvasElement>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const finalItemCountRef = useRef<number>(0);
  const finalTotalRef = useRef<number>(0);

  const [toastStage, setToastStage] = useState<ToastStage>('idle');

  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const subtotal = useCartStore((s) => s.subtotal());
  const itemCount = useCartStore((s) => s.itemCount());

  const TAX_RATE = 0.08;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  // Drawer animation – safe version
  useEffect(() => {
    const drawer = drawerRef.current;
    const overlay = overlayRef.current;

    if (!drawer || !overlay) return;

    let timeline: gsap.core.Timeline | null = null;

    if (isOpen) {
      document.body.style.overflow = 'hidden';

      gsap.set(drawer, { x: '100%' });
      gsap.set(overlay, { opacity: 0, pointerEvents: 'auto' });

      timeline = gsap.timeline()
        .to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' })
        .to(drawer, { x: '0%', duration: 0.45, ease: 'power3.out' }, '-=0.2');
    } else {
      document.body.style.overflow = '';

      timeline = gsap.timeline()
        .to(drawer, { x: '100%', duration: 0.35, ease: 'power3.in' })
        .to(overlay, {
          opacity: 0,
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => {
            if (overlayRef.current) {
              gsap.set(overlayRef.current, { pointerEvents: 'none' });
            }
          },
        }, '-=0.1');
    }

    return () => {
      if (timeline) timeline.kill();
      document.body.style.overflow = '';
      if (overlayRef.current) {
        gsap.set(overlayRef.current, { pointerEvents: 'none' });
      }
    };
  }, [isOpen]);

  // Animate items when cart changes
  useEffect(() => {
    if (!isOpen || !itemsRef.current) return;

    const cards = itemsRef.current.querySelectorAll('[data-cart-item]');
    gsap.fromTo(
      cards,
      { x: 20, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.05, duration: 0.3 }
    );
  }, [items.length, isOpen]);

  const handleRemove = (id: number) => {
    const el = document.querySelector(`[data-cart-item="${id}"]`);
    if (el) {
      gsap.to(el, {
        x: 60,
        opacity: 0,
        height: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => removeItem(id),
      });
    } else {
      removeItem(id);
    }
  };

  // Confetti
  const triggerConfetti = useCallback(() => {
    const canvas = confettiRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 360;
    canvas.height = 260;

    const particles: any[] = [];
    const colors = ['#3E9BFF', '#60B4FF', '#2563eb', '#A5F3FC', '#E0F2FE', '#ffffff'];

    for (let i = 0; i < 95; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * 80 - 50,
        r: Math.random() * 6.5 + 3.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: Math.random() * 5.2 - 2.6,
        vy: Math.random() * 5.8 + 4,
        alpha: 1,
        rotation: Math.random() * 360,
        spin: Math.random() * 0.28 - 0.14,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
      });
    }

    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.095;
        p.alpha -= 0.0085;
        p.rotation += p.spin;

        if (p.alpha > 0.04) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          if (p.shape === 'rect') {
            ctx.fillRect(-p.r / 1.8, -p.r / 1.8, p.r * 1.1, p.r * 1.8);
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.r, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      });

      if (alive && frame < 150) {
        frame++;
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animate();
  }, []);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Toast logic – with your requested timings (1.2s loading + 2s success)
  useEffect(() => {
    if (toastStage === 'idle') return;
    if (!toastRef.current) return;

    const toast = toastRef.current;

    if (toastStage === 'loading') {
      gsap.fromTo(
        toast,
        { y: 80, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)' }
      );

      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.85, ease: 'power1.inOut', transformOrigin: 'left center' }
        );
      }

      // Loading stage: 1.2 seconds
      toastTimerRef.current = setTimeout(() => setToastStage('success'), 1200);
    }

    if (toastStage === 'success') {
      gsap.fromTo(
        toast.querySelector('[data-toast-icon]'),
        { scale: 0, rotate: -30 },
        { scale: 1.25, rotate: 0, duration: 0.6, ease: 'back.out(2.5)' }
      );

      setTimeout(triggerConfetti, 140);

      // Delay clearCart so toast renders correct values first
      toastTimerRef.current = setTimeout(() => {
        clearCart();

        // Success visible for 2 seconds
        toastTimerRef.current = setTimeout(() => {
          gsap.to(toast, {
            y: 100,
            opacity: 0,
            scale: 0.88,
            duration: 0.45,
            ease: 'power2.in',
            onComplete: () => {
              setToastStage('idle');
              onClose();
            },
          });
        }, 2000);
      }, 400);
    }

    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
        toastTimerRef.current = null;
      }
    };
  }, [toastStage, triggerConfetti, clearCart, onClose]);

  const handleCheckout = () => {
    if (toastStage !== 'idle') return;

    finalItemCountRef.current = itemCount;
    finalTotalRef.current = total;

    setToastStage('loading');
  };

  const handleDismissToast = () => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    const toast = toastRef.current;
    if (toast) {
      gsap.to(toast, {
        y: 100,
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => setToastStage('idle'),
      });
    }
  };

  useEffect(() => {
    return () => {
      gsap.killTweensOf('*');
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0 z-200g-[#0B1C2D]/40 backdrop-blur-[2px]"
        style={{ opacity: 0, pointerEvents: 'none' }}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 z-210 h-full w-full max-w-105 flex flex-col"
        style={{ transform: 'translateX(100%)' }}
      >
        <div className="absolute inset-0 bg-white/97 backdrop-blur-xl shadow-2xl" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#3E9BFF] via-[#60B4FF] to-[#2563eb]" />

        <div className="relative flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-7 pb-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EBF5FF] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-[#3E9BFF]" />
              </div>
              <div>
                <h2 className="text-[#0B1C2D] font-bold text-lg leading-tight tracking-tight">
                  Your Cart
                </h2>
                <p className="text-xs text-[#8FA3B8] font-medium">
                  {itemCount === 0 ? 'Empty' : `${itemCount} item${itemCount !== 1 ? 's' : ''}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-[#8FA3B8] hover:text-red-400 transition-colors px-2 py-1 rounded-lg hover:bg-red-50 font-medium"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-[#3D4F61] transition-all hover:scale-105 active:scale-95"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Items list – scrollbar is now using native styles (no WebKit override) */}
          <div
            ref={itemsRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar scrollbar-thumb-slate-400 scrollbar-track-transparent"
          >
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-6 pt-12 pb-20">
                <div className="relative">
                  <div className="w-24 h-24 rounded-3xl bg-[#EBF5FF] flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-[#BDDEFF]" />
                  </div>
                  <div className="absolute bottom-1 right-1 w-8 h-8 rounded-xl flex items-center justify-center">
                    <span><img src="logo.png" alt="" /></span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-bold text-[#0B1C2D] text-lg">Nothing here yet</p>
                  <p className="text-sm text-[#8FA3B8] mt-1 max-w-55uto">
                    Browse our dental products and add items to your cart
                  </p>
                </div>
                <a
                  href="#products"
                  onClick={onClose}
                  className="flex items-center gap-2 px-7 py-3 bg-[#3E9BFF] text-white rounded-full text-sm font-semibold shadow-md hover:bg-[#2563eb] transition-all hover:shadow-lg active:scale-95"
                >
                  Shop Products <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  data-cart-item={item.id}
                  className="group flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-[#BDDEFF]/60 hover:shadow-md transition-all duration-200 overflow-hidden"
                >
                  <div className="w-18 h-18 rounded-xl overflow-hidden bg-[#F6FAFC] shrink-0 border border-gray-100">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">🦷</div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-[#0B1C2D] leading-snug line-clamp-2">
                        {item.name}
                      </p>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {item.category && (
                      <span className="inline-block mt-1 text-[10px] font-medium text-[#3E9BFF] uppercase tracking-wider bg-[#EBF5FF] px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1 border border-gray-100">
                        <button
                          onClick={() =>
                            item.quantity === 1
                              ? handleRemove(item.id)
                              : updateQuantity(item.id, -1)
                          }
                          className="w-6 h-6 rounded-lg flex items-center justify-center text-[#3D4F61] hover:bg-white hover:text-[#3E9BFF] hover:shadow-sm transition-all active:scale-90"
                        >
                          {item.quantity === 1 ? (
                            <Trash2 className="w-3 h-3 text-red-400" />
                          ) : (
                            <Minus className="w-3 h-3" />
                          )}
                        </button>
                        <span className="w-6 text-center text-sm font-bold text-[#0B1C2D]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-lg flex items-center justify-center text-[#3D4F61] hover:bg-white hover:text-[#3E9BFF] hover:shadow-sm transition-all active:scale-90"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <p className="text-sm font-bold text-[#0B1C2D]">
                        ${(item.price * item.quantity).toFixed(2)}
                        {item.quantity > 1 && (
                          <span className="ml-1 text-[10px] font-normal text-[#8FA3B8]">
                            (${item.price.toFixed(2)} ea)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary & Checkout */}
          {items.length > 0 && (
            <div className="px-4 pb-6 pt-3 border-t border-gray-100 bg-white/80 backdrop-blur-sm">
              <div className="space-y-2 mb-4 px-1">
                <div className="flex justify-between text-sm text-[#3D4F61]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#0B1C2D]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-[#3D4F61]">
                  <span>Tax (8%)</span>
                  <span className="font-medium text-[#0B1C2D]">${tax.toFixed(2)}</span>
                </div>
                <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent my-1" />
                <div className="flex justify-between">
                  <span className="font-bold text-[#0B1C2D]">Total</span>
                  <span className="font-bold text-[#0B1C2D] text-lg">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={toastStage !== 'idle'}
                className="w-full py-4 rounded-2xl font-semibold text-white text-sm tracking-wide 
             bg-linear-to-r from-[#3E9BFF] to-[#2563eb] 
             shadow-lg shadow-[#3E9BFF]/30 
             hover:shadow-xl hover:shadow-[#3E9BFF]/40 
             hover:-translate-y-0.5 
             active:translate-y-0 active:shadow-md 
             disabled:opacity-60 disabled:cursor-not-allowed 
             transition-all duration-200 
             flex items-center justify-center gap-2 group"
              >
                Checkout
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-center text-[10px] text-[#8FA3B8] mt-3">
                🔒 Secure checkout · Free returns · Satisfaction guaranteed
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Celebration Toast */}
      {toastStage !== 'idle' && (
        <div
          ref={toastRef}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-300 w-90 max-w-[calc(100vw-2rem)]"
          style={{ opacity: 0 }}
        >
          <div
            className={`relative overflow-hidden rounded-3xl shadow-2xl border transition-all duration-500 ${toastStage === 'success'
                ? 'bg-linear-to-br from-[#0B1C2D] via-[#132A4A] to-[#0B1C2D] border-[#3E9BFF]/60'
                : 'bg-[#0B1C2D] border-white/10'
              }`}
          >
            <canvas ref={confettiRef} className="absolute inset-0 pointer-events-none z-10 rounded-3xl" />

            {toastStage === 'success' && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#3E9BFF] to-transparent" />
            )}

            {toastStage === 'loading' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.75 bg-white/10 overflow-hidden">
                <div
                  ref={progressRef}
                  className="h-full w-full bg-linear-to-r from-[#3E9BFF] to-[#60B4FF]"
                  style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
                />
              </div>
            )}

            <div className="flex items-center gap-4 px-6 py-5 relative z-20">
              <div
                data-toast-icon
                className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${toastStage === 'success' ? 'bg-[#3E9BFF]/25' : 'bg-white/10'
                  }`}
              >
                {toastStage === 'loading' ? (
                  <RotateCcw className="w-6 h-6 text-[#3E9BFF] animate-spin" />
                ) : (
                  <CheckCircle2 className="w-6 h-6 text-[#3E9BFF]" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-[17px] leading-tight">
                  {toastStage === 'loading' ? 'Processing your order…' : 'Order Confirmed! 🎉'}
                </p>
                <p className="text-white/70 text-sm mt-0.5">
                  {toastStage === 'loading'
                    ? 'Securing payment • Preparing receipt'
                    : `${finalItemCountRef.current} item${finalItemCountRef.current !== 1 ? 's' : ''
                    } • $${finalTotalRef.current.toFixed(2)}`}
                </p>
              </div>

              {toastStage === 'success' && (
                <button
                  onClick={handleDismissToast}
                  className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {toastStage === 'success' && (
              <div className="px-6 pb-6 text-center border-t border-white/10 pt-3">
                <p className="text-emerald-400 text-sm font-medium tracking-wide">
                  Thank you for trusting us with your smile!
                </p>
                <p className="text-white/50 text-xs mt-1">Cart has been cleared</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}