'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';
import { Check, ArrowRight, ShoppingCart, Play, Minus, Plus, Star, Truck, Shield, RotateCcw } from 'lucide-react';

export default function ProductPage() {
  const { addItem, totalItems } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = {
    id: '300ml-tea-adrak-elaichi',
    name: '300ml Tea — Adrak & Elaichi',
    price: 250,
    originalPrice: 500,
    image: '',
    variant: 'Adrak & Elaichi',
  };

  const handleAdd = () => {
    addItem(product);
    for (let i = 1; i < quantity; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-page">
      <div className="section-inner">
        <div className="product-page__grid">
          <div className="product-page__images reveal">
            <div className="product-page__main-img">
              <img
                src="/images/300ml_tea_3d_box_1.png"
                alt="300ml Tea — Adrak & Elaichi packaging box"
                style={{
                  maxHeight: 400,
                  width: 'auto',
                  borderRadius: 16,
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 12px 40px rgba(0,0,0,0.15))',
                }}
              />
            </div>
          </div>

          <div className="product-page__info reveal reveal-delay-1">
            <span className="eyebrow">Premium Raw Chai Blend</span>
            <h1 className="product-page__title">300ml Tea — Adrak & Elaichi</h1>
            <div className="product-page__price">
              ₹{product.price}
              <span className="product-page__price-old">₹{product.originalPrice}</span>
            </div>
            <span className="product-page__offer">Buy 1 Get 1 Free</span>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <span style={{ color: 'var(--amber)', fontSize: 18 }}>★★★★★</span>
              <span style={{ fontSize: 14, color: 'var(--text-m)' }}>4.9 (500+ reviews)</span>
            </div>

            <p className="product-page__desc">
              Pre-measured raw chai blend with tea powder, sugar, and our signature Adrak & Elaichi masala. NOT instant — just pour 300ml milk, add sachet, stir for 5 minutes 30 seconds, strain, and enjoy maa ki chai.
            </p>

            <ul className="product-page__features">
              <li><Check size={18} /> Pre-measured — one packet = one cup</li>
              <li><Check size={18} /> Premium tea powder + natural sugar</li>
              <li><Check size={18} /> Authentic Adrak & Elaichi masala</li>
              <li><Check size={18} /> No preservatives, no artificial flavours</li>
              <li><Check size={18} /> 5 minute 30 second brew time</li>
            </ul>

            <div className="product-page__qty">
              <span style={{ fontSize: 14, fontWeight: 600 }}>Quantity:</span>
              <div className="qty-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={16} /></button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}><Plus size={16} /></button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-large" onClick={handleAdd} style={{ flex: 1, minWidth: 160 }}>
                {added ? <><Check size={18} /> Added</> : <><ShoppingCart size={18} /> Add to Cart</>}
              </button>
              <Link href="/cart" className="btn btn-outline-dark btn-large" style={{ display: 'inline-flex', flex: 1, minWidth: 160 }}>
                View Cart ({totalItems}) <ArrowRight size={18} />
              </Link>
            </div>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-m)' }}>
                <Truck size={16} /> Free delivery on online payment
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-m)' }}>
                <Shield size={16} /> 100% Natural
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-m)' }}>
                <RotateCcw size={16} /> Easy Returns
              </div>
            </div>

            <div style={{ background: 'var(--cream)', borderRadius: 'var(--radius)', padding: 20, marginBottom: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Available On:</div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ background: 'var(--orange)', color: 'var(--white)', padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>Blinkit</span>
                <span style={{ background: 'var(--orange)', color: 'var(--white)', padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>Zepto</span>
                <span style={{ background: 'var(--brown-deep)', color: 'var(--white)', padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>300mltea.in</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-l)', marginTop: 8 }}>Delhi NCR only</div>
            </div>

            <div style={{ background: 'var(--orange-pale)', borderRadius: 'var(--radius)', padding: 20, border: '1px solid rgba(210,84,45,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <Play size={18} style={{ color: 'var(--orange)' }} />
                <span style={{ fontSize: 14, fontWeight: 600 }}>Watch How to Brew</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-m)', marginBottom: 12 }}>
                See how easy it is to make the perfect cup of chai with 300ml Tea.
              </p>
              <button className="btn btn-primary btn-small" style={{ width: '100%' }}>
                <Play size={14} /> Watch Video (Coming Soon)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
