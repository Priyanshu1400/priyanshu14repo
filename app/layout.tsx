import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { CartProvider } from '@/components/CartContext';
import { ToastProvider } from '@/components/ToastContext';
import ClientLayout from '@/components/ClientLayout';

export const metadata: Metadata = {
  metadataBase: new URL('https://300mltea.in'),
  title: '300ml Tea - Wahi wali chai. Kahin bhi.',
  description: '300ml Tea - Pre-measured raw chai blend. Maa ki chai ka magic, ab kahin bhi. Buy 1 Get 1 Free!',
  openGraph: {
    images: [
      { url: 'https://300mltea.in/og.png' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      { url: 'https://300mltea.in/og.png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://checkout-ui.shiprocket.com/assets/styles/shopify.css"
        />
      </head>
      <body>
        <input type="hidden" value="300mltea.com" id="sellerDomain" />
        <CartProvider>
          <ToastProvider>
            <ClientLayout>{children}</ClientLayout>
          </ToastProvider>
        </CartProvider>
        <Script
          src="https://checkout-ui.shiprocket.com/assets/js/channels/shopify.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
