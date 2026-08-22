import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';

const ORDER_ID_RE = /^[a-zA-Z0-9_-]{1,100}$/;

export async function POST(req: NextRequest) {
  try {
    const { order_id } = await req.json();

    if (!order_id || typeof order_id !== 'string' || !ORDER_ID_RE.test(order_id)) {
      return NextResponse.json({ error: 'Invalid order_id' }, { status: 400 });
    }

    const bodyString = JSON.stringify({ order_id, timestamp: new Date().toISOString() });
    const hmacSignature = createHmac('sha256', process.env.SHIPROCKET_SECRET_KEY!)
      .update(bodyString)
      .digest('base64');

    const response = await fetch(
      'https://fastrr-api-dev.pickrr.com/api/v1/custom-platform-order/details',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': process.env.SHIPROCKET_API_KEY!,
          'X-Api-HMAC-SHA256': hmacSignature,
        },
        body: bodyString,
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('[track-order]', err);
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
  }
}
