import { getSiteContentValue } from '@/lib/site-content';

export default async function ReturnPolicyPage() {
  const content = await getSiteContentValue('return_policy');
  return (
    <div className="legal-page">
      <div className="section-inner">
        <h1 className="legal-page__title">Return Policy</h1>
        <div
          className="legal-page__content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
