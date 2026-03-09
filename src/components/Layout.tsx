// Layout.tsx
import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from '../sections/Header';
import Footer from '../sections/Footer';
import Cart from './Cart';

import { useCartStore } from '../hooks/cartStore';
import { ShoppingCart } from 'lucide-react';

export default function Layout() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const itemCount = useCartStore((state) => state.itemCount());

  const location = useLocation();

  // Smooth scroll to top on every route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#F6FAFC] relative">
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />

      {/* Floating Cart Button – always visible, bottom-right */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="
          fixed bottom-6 right-6 z-100
          flex items-center justify-center
          w-14 h-14 bg-white shadow-2xl rounded-full
          border border-gray-200 hover:scale-110 active:scale-95
          transition-all duration-200
        "
        aria-label={`View shopping cart${itemCount > 0 ? ` with ${itemCount} items` : ''}`}
      >
        <ShoppingCart className="w-7 h-7 text-[#2563eb]" />
        {itemCount > 0 && (
          <span className="
            absolute -top-1.5 -right-1.5
            bg-red-500 text-white text-xs font-bold
            rounded-full min-w-5.5 h-6
            flex items-center justify-center px-1.5
            shadow border-2 border-white
          ">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </button>

      {/* Cart Drawer */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
}