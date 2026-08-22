'use client';

import { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, Lock } from 'lucide-react';
import { useCart, TEA_PRODUCT } from './CartContext';
import { useToast } from './ToastContext';

declare global {
  interface Window {
    HeadlessCheckout: {
      addToCart: (event: Event, token: string, options: { fallbackUrl: string }) => void;
    };
  }
}

export default function CartDrawer() {
  const { isDrawerOpen, closeDrawer, items, updateQuantity, totalItems, subtotal } = useCart();
  const { showToast } = useToast();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const teaItem = items.find((i) => i.id === TEA_PRODUCT.id);
  const qty = teaItem?.quantity || 0;

  const handleCheckout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (items.length === 0) {
      showToast('Your cart is empty.');
      return;
    }
    setCheckoutLoading(true);
    try {
      const totalQty = items.reduce((sum, i) => sum + i.quantity, 0);
      const res = await fetch('/api/get-checkout-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: totalQty }),
      });
      const data = await res.json();
      if (!res.ok || !data.token) {
        throw new Error(data.error || 'Checkout unavailable. Please try again.');
      }

      if (!window.HeadlessCheckout) {
        throw new Error('Checkout SDK not loaded. Please refresh and try again.');
      }

      window.HeadlessCheckout.addToCart(e.nativeEvent, data.token, {
        fallbackUrl: 'https://300mltea.com/product',
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      console.error('[checkout]', err);
      showToast(msg);
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <>
      <div
        className={`cart-drawer-overlay ${isDrawerOpen ? 'cart-drawer-overlay--visible' : ''}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      <div
        className={`cart-drawer ${isDrawerOpen ? 'cart-drawer--open' : ''}`}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
      >
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">Your Cart</h2>
          <button className="cart-drawer__close" onClick={closeDrawer} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>
        <div className="cart-drawer__divider" />

        {items.length === 0 ? (
          <div className="cart-drawer__empty">
            <ShoppingBag size={48} />
            <p>Your cart is empty</p>
            <button className="cart-drawer__empty-cta" onClick={closeDrawer}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-drawer__body">
            {items.map((item) => (
              <div key={item.id} className="cart-drawer__product">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-drawer__product-img"
                />
                <div className="cart-drawer__product-info">
                  <div className="cart-drawer__product-name">{item.name}</div>
                  <div className="cart-drawer__product-sub">Pre-measured chai blend</div>
                  <div className="cart-drawer__product-price">&#8377;{item.price}</div>
                </div>
              </div>
            ))}

            {teaItem && (
              <div className="cart-drawer__qty-row">
                <span className="cart-drawer__qty-label">Qty</span>
                <div className="cart-drawer__qty">
                  <button
                    className="cart-drawer__qty-btn"
                    onClick={() => updateQuantity(TEA_PRODUCT.id, qty - 1)}
                    disabled={qty <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={13} />
                  </button>
                  <span id="cartQty" className="cart-drawer__qty-num">{qty}</span>
                  <button
                    className="cart-drawer__qty-btn"
                    onClick={() => updateQuantity(TEA_PRODUCT.id, Math.min(10, qty + 1))}
                    disabled={qty >= 10}
                    aria-label="Increase quantity"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>
            )}

            <div className="cart-drawer__divider" />

            <div className="cart-drawer__subtotal">
              <span className="cart-drawer__subtotal-label">SUBTOTAL</span>
              <span className="cart-drawer__subtotal-amount">&#8377;{subtotal}</span>
            </div>

            <button
              id="proceedToCheckout"
              className="cart-drawer__checkout-btn"
              onClick={handleCheckout}
              disabled={checkoutLoading}
            >
              {checkoutLoading ? (
                <span className="cart-drawer__checkout-loading">
                  <span className="cart-drawer__spinner" /> Opening Checkout...
                </span>
              ) : (
                'Proceed to Checkout \u2192'
              )}
            </button>

            <div className="cart-drawer__secured">
              <Lock size={11} />
              Secured by Shiprocket Checkout
            </div>
          </div>
        )}
      </div>
    </>
  );
}
