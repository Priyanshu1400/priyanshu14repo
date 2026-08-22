'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Package, Truck, Home } from 'lucide-react';

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ORD-XXXXXXX';
  const total = searchParams.get('total') || '0';

  return (
    <div className="confirmation-page">
      <div className="confirmation-card reveal">
        <div className="confirmation-card__icon">
          <CheckCircle size={40} />
        </div>
        <h1 className="confirmation-card__title">Order Placed!</h1>
        <p className="confirmation-card__text">
          Thank you for ordering. Your chai is on its way!
        </p>

        <div className="confirmation-card__details">
          <div className="confirmation-card__detail-row">
            <span>Order ID</span>
            <span style={{ fontWeight: 700, fontFamily: 'var(--font-heading)' }}>{orderId}</span>
          </div>
          <div className="confirmation-card__detail-row">
            <span>Amount Paid</span>
            <span>₹{total}</span>
          </div>
          <div className="confirmation-card__detail-row">
            <span>Estimated Delivery</span>
            <span>2-3 days (Delhi NCR)</span>
          </div>
          <div className="confirmation-card__detail-row">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: 'var(--text-m)' }}>
            <Package size={18} /> Your order is being prepared
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: 'var(--text-m)' }}>
            <Truck size={18} /> Delivery partner will be assigned soon
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: 'var(--text-m)' }}>
            <Home size={18} /> Delivered to your doorstep
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/track-order" className="btn btn-primary" style={{ flex: 1, minWidth: 160 }}>
            Track Order <ArrowRight size={18} />
          </Link>
          <Link href="/product" className="btn btn-outline-dark" style={{ display: 'inline-flex', flex: 1, minWidth: 160 }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
