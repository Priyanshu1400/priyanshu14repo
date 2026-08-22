import { getSiteContentValue } from '@/lib/site-content';

export default async function TermsOfServicePage() {
  const content = await getSiteContentValue('terms_of_service');
  return (
    <div className="legal-page">
      <div className="section-inner">
        <h1 className="legal-page__title">Terms of Service</h1>
        <div
          className="legal-page__content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
