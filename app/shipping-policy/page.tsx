import { getSiteContentValue } from '@/lib/site-content';

export default async function ShippingPolicyPage() {
  const content = await getSiteContentValue('shipping_policy');
  return (
    <div className="legal-page">
      <div className="section-inner">
        <h1 className="legal-page__title">Shipping Policy</h1>
        <div
          className="legal-page__content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
