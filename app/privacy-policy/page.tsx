import { getSiteContentValue } from '@/lib/site-content';

export default async function PrivacyPolicyPage() {
  const content = await getSiteContentValue('privacy_policy');
  return (
    <div className="legal-page">
      <div className="section-inner">
        <h1 className="legal-page__title">Privacy Policy</h1>
        <div
          className="legal-page__content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
