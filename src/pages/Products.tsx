// Products.tsx
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ShoppingCart, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import productsData from '../data/products.json';
import { useCartStore, type CartItem } from '../hooks/cartStore';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'toothpaste', label: 'Toothpaste' },
  { id: 'kids', label: 'Kids' },
  { id: 'electric', label: 'Electric' },
];

const USER_RATINGS_KEY = 'bellevilleDentalUserRatings';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
}

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
  size?: 'sm' | 'md';
}

function StarRating({ rating, maxStars = 5, interactive = false, onRate, size = 'md' }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const starSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = interactive ? starValue <= (hoverRating || rating) : starValue <= rating;

        return (
          <button
            key={index}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onRate?.(starValue)}
            onMouseEnter={() => interactive && setHoverRating(starValue)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          >
            <Star
              className={`${starSize} ${isFilled ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'} transition-colors`}
            />
          </button>
        );
      })}
    </div>
  );
}

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>(productsData.products);
  const [userRatings, setUserRatings] = useState<Record<number, number>>({});
  const [showAll, setShowAll] = useState(false);
  const [addingProductId, setAddingProductId] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const cartItems = useCartStore((state) => state.items);

  const addItem = useCartStore((state) => state.addItem);


  useEffect(() => {
    const saved = localStorage.getItem(USER_RATINGS_KEY);
    if (saved) {
      try {
        setUserRatings(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to parse user ratings', err);
      }
    }
  }, []);

  useEffect(() => {
    setShowAll(false);
  }, [activeCategory]);

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

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  const MAX_INITIAL = 6;
  const displayedProducts = showAll ? filteredProducts : filteredProducts.slice(0, MAX_INITIAL);

  const handleRate = (productId: number, newRating: number) => {
    const prevUserRating = userRatings[productId];

    setProducts((prev) =>
      prev.map((product) => {
        if (product.id !== productId) return product;

        let newAverage = product.rating;
        let newReviewCount = product.reviews;

        if (prevUserRating === undefined) {
          newReviewCount = product.reviews + 1;
          newAverage = (product.rating * product.reviews + newRating) / newReviewCount;
        } else {
          newAverage = (product.rating * product.reviews - prevUserRating + newRating) / product.reviews;
        }

        return {
          ...product,
          rating: Math.round(newAverage * 10) / 10,
          reviews: newReviewCount,
        };
      })
    );

    const updatedRatings = { ...userRatings, [productId]: newRating };
    setUserRatings(updatedRatings);
    localStorage.setItem(USER_RATINGS_KEY, JSON.stringify(updatedRatings));
  };

  const handleToggleShowAll = () => {
    const wasExpanded = showAll;
    setShowAll((prev) => !prev);

    if (wasExpanded) {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 10);
    }
  };

  const handleAddToCart = (product: Product) => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      category: product.category,
    };

    setAddingProductId(product.id);
    addItem(cartItem);
    setTimeout(() => setAddingProductId(null), 1200);
  };

  return (
    <section ref={sectionRef} id="products" className="py-30 bg-[#EAF3F7]">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3E9BFF]/10 rounded-full mb-4">
          <ShoppingCart className="w-4 h-4 text-[#3E9BFF]" />
          <span className="text-sm font-medium text-[#3E9BFF]">Dental Products</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-[#0B1C2D] mb-4">
          Our <span className="text-[#3E9BFF]">Products</span>
        </h2>
        <p className="text-lg text-[#3D4F61] max-w-2xl mx-auto">
          Quality dental care products for you and your family
        </p>
      </div>

      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Filter className="w-5 h-5 text-[#3D4F61] sm:h- mr-2 self-center" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`
                px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                ${activeCategory === cat.id
                  ? 'bg-[#3E9BFF] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-[#F0F9FF] hover:text-[#3E9BFF] border border-gray-200'
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map((product) => {
            const inCart = cartItems.some((item) => item.id === product.id);

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#3E9BFF]/10 hover:border-[#3E9BFF]/30 flex flex-col"
              >
                <div className="aspect-4/3 relative overflow-hidden bg-[#F6FAFC]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#3E9BFF] rounded-full text-xs font-medium uppercase tracking-wide">
                      {product.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col grow">
                  <h3 className="font-bold text-[#0B1C2D] mb-2 group-hover:text-[#3E9BFF] transition-colors line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-sm text-[#3D4F61] mb-4 line-clamp-3 grow">
                    {product.description}
                  </p>

                  {/* Global Rating */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1">
                      <StarRating rating={Math.round(product.rating)} size="sm" />
                      <span className="text-sm font-medium text-[#0B1C2D]">
                        {product.rating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-xs text-[#3D4F61]">({product.reviews} reviews)</span>
                  </div>

                  {/* User Rating */}
                  <div className="mb-5 p-3 bg-[#F6FAFC] rounded-xl">
                    <p className="text-xs text-[#3D4F61] mb-2">
                      Your rating:{' '}
                      {userRatings[product.id] ? `★ ${userRatings[product.id]}` : 'Not rated yet'}
                    </p>
                    <StarRating
                      rating={userRatings[product.id] || 0}
                      interactive
                      onRate={(r) => handleRate(product.id, r)}
                    />
                  </div>

                  {/* Price & Cart Button */}
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold text-[#3E9BFF]">
                      ${product.price.toFixed(2)}
                    </span>

                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={addingProductId === product.id}
                      className={`
                        flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 min-w-35 justify-center
                        ${addingProductId === product.id
                          ? 'bg-green-600 text-white cursor-wait shadow-sm'
                          : inCart
                            ? 'bg-green-600 hover:bg-green-700 text-white shadow-md'
                            : 'bg-[#3E9BFF] hover:bg-[#2563eb] text-white active:scale-95 shadow-md'
                        }
                      `}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {addingProductId === product.id
                        ? 'Added!'
                        : inCart
                          ? 'In Cart'
                          : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show More / Show Less */}
        {filteredProducts.length > MAX_INITIAL && (
          <div className="text-center mt-16">
            <button
              onClick={handleToggleShowAll}
              className="group px-10 py-4 border-2 border-[#3E9BFF] text-[#3E9BFF] rounded-full font-medium hover:bg-[#3E9BFF] hover:text-white transition-all duration-300 flex items-center gap-3 mx-auto shadow-sm hover:shadow-md active:scale-95"
            >
              {showAll ? (
                <>
                  View Less <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                </>
              ) : (
                <>
                  View More ({filteredProducts.length - MAX_INITIAL} more)
                  <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}