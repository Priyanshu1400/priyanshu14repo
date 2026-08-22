'use client';

import { useState } from 'react';
import { Search, Package, AlertCircle } from 'lucide-react';

type StatusColor = 'amber' | 'blue' | 'green' | 'red' | 'gray';

function getStatusStyle(status: string): StatusColor {
  const s = status?.toLowerCase() || '';
  if (s.includes('confirmed') || s.includes('pending')) return 'amber';
  if (s.includes('shipped') || s.includes('transit') || s.includes('dispatch')) return 'blue';
  if (s.includes('delivered')) return 'green';
  if (s.includes('cancel') || s.includes('fail')) return 'red';
  return 'gray';
}

const STATUS_STYLES: Record<StatusColor, { bg: string; color: string }> = {
  amber: { bg: '#fef3c7', color: '#92400e' },
  blue: { bg: '#dbeafe', color: '#1e40af' },
  green: { bg: '#dcfce7', color: '#166534' },
  red: { bg: '#fee2e2', color: '#991b1b' },
  gray: { bg: '#f3f4f6', color: '#374151' },
};

interface OrderResult {
  order_id?: string;
  payment_type?: string;
  total_amount_payable?: number;
  status?: string;
  [key: string]: unknown;
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OrderResult | null>(null);
  const [error, setError] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    setLoading(true);
    setResult(null);
    setError('');
    try {
      const res = await fetch('/api/track-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: orderId.trim() }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || 'Order not found. Please check your order ID.');
      } else {
        setResult(data);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const statusKey = result?.status ? getStatusStyle(result.status) : 'gray';
  const statusStyle = STATUS_STYLES[statusKey];

  return (
    <div className="track-page">
      <div className="track-card reveal">
        <span className="track-card__eyebrow">TRACK YOUR ORDER</span>
        <h1 className="track-card__title">Where&apos;s Your Chai?</h1>
        <p className="track-card__subtitle">Enter your order ID to check delivery status</p>

        <form className="track-form" onSubmit={handleTrack}>
          <input
            type="text"
            placeholder="Enter your Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <span className="cart-drawer__spinner" style={{ borderTopColor: '#fff', width: 16, height: 16, display: 'inline-block' }} />
            ) : (
              <Search size={18} />
            )}
            {loading ? 'Tracking...' : 'Track Order'}
          </button>
        </form>

        {error && (
          <div className="track-error">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {result && (
          <div className="track-result">
            <div className="track-result__header">
              <div>
                <div className="track-result__order-id">
                  Order: {result.order_id || orderId}
                </div>
                {result.payment_type && (
                  <div className="track-result__sub">
                    {result.payment_type}
                  </div>
                )}
              </div>
              <div
                className="track-result__badge"
                style={{ background: statusStyle.bg, color: statusStyle.color }}
              >
                {result.status || 'Confirmed'}
              </div>
            </div>

            <div className="track-result__rows">
              {result.order_id && (
                <div className="track-result__row">
                  <span>Order ID</span>
                  <span className="order-success__mono">{result.order_id}</span>
                </div>
              )}
              {result.payment_type && (
                <div className="track-result__row">
                  <span>Payment</span>
                  <span>{result.payment_type}</span>
                </div>
              )}
              {result.total_amount_payable !== undefined && (
                <div className="track-result__row">
                  <span>Amount</span>
                  <span>&#8377;{result.total_amount_payable}</span>
                </div>
              )}
              <div className="track-result__row">
                <span>Status</span>
                <span
                  className="track-result__badge"
                  style={{ background: statusStyle.bg, color: statusStyle.color }}
                >
                  {result.status || 'Confirmed'}
                </span>
              </div>
            </div>
          </div>
        )}

        {!result && !error && !loading && (
          <div className="track-empty">
            <Package size={36} />
            <p>Your order details will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}

