import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { quantity: rawQuantity } = await req.json();
    const quantity = Math.max(1, Math.min(100, parseInt(rawQuantity) || 1));

    const body = JSON.stringify({
      cart_data: {
        items: [{ variant_id: '1', quantity }],
      },
      redirect_url: 'https://300mltea.com/order-success',
      timestamp: new Date().toISOString(),
    });

    const hmacSignature = createHmac('sha256', process.env.SHIPROCKET_SECRET_KEY!)
      .update(body)
      .digest('base64');

    const response = await fetch(
      'https://checkout-api.shiprocket.com/api/v1/access-token/checkout',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': process.env.SHIPROCKET_API_KEY!,
          'X-Api-HMAC-SHA256': hmacSignature,
        },
        body,
      }
    );

    const data = await response.json();
    console.log('[get-checkout-token] Shiprocket response:', JSON.stringify(data));

    if (!response.ok || !data?.result?.token) {
      const msg = data.message || data.error || `Shiprocket error ${response.status}`;
      return NextResponse.json({ error: msg }, { status: response.status || 500 });
    }

    return NextResponse.json({ token: data.result.token });
  } catch (err) {
    console.error('[get-checkout-token]', err);
    return NextResponse.json({ error: 'Failed to generate checkout token' }, { status: 500 });
  }
}