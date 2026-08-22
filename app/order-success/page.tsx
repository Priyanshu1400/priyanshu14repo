'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Package } from 'lucide-react';
import { Suspense } from 'react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id') || searchParams.get('orderId') || 'Pending';
  const paymentType = searchParams.get('payment_type') || 'Prepaid';
  const amount = searchParams.get('total_amount_payable') || searchParams.get('total') || '250';

  return (
    <div className="order-success-page">
      <div className="order-success-card reveal">
        <div className="order-success__icon">
          <CheckCircle2 size={40} strokeWidth={1.5} />
        </div>

        <h1 className="order-success__title">Your Chai Is On Its Way!</h1>
        <p className="order-success__subtitle">
          Maa would be proud. Your order has been confirmed and will reach you in 3–5 business days.
        </p>

        <div className="order-success__summary">
          <div className="order-success__summary-row">
            <span>Order ID</span>
            <span className="order-success__mono">{orderId}</span>
          </div>
          <div className="order-success__summary-row">
            <span>Product</span>
            <span>300ml Tea — Adrak & Elaichi</span>
          </div>
          <div className="order-success__summary-row">
            <span>Payment</span>
            <span>{paymentType}</span>
          </div>
          <div className="order-success__summary-row">
            <span>Amount</span>
            <span>&#8377;{amount}</span>
          </div>
          <div className="order-success__summary-row">
            <span>Status</span>
            <span className="order-success__status-badge">Confirmed</span>
          </div>
        </div>

        <div className="order-success__actions">
          <Link href="/track-order" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            <Package size={16} /> Track Your Order
          </Link>
          <Link href="/product" className="order-success__secondary-btn">
            Continue Shopping <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="order-success-page" />}>
      <OrderSuccessContent />
    </Suspense>
  );
}
