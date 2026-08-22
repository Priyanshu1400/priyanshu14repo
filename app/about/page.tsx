'use client';

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="section-inner">
          <h1 className="about-hero__title">Our Story</h1>
          <p className="about-hero__subtitle">
            MOM — Magic of Ma = Magic of Measurement
          </p>
        </div>
      </div>
      <div className="about-content reveal">
        <p>
          <strong>300ml Tea</strong> was born from a simple, powerful emotion: the longing for <strong>maa ki chai</strong> when you are far from home.
        </p>
        <p>
          We are a team of chai lovers who noticed something — when people move away from home for work, studies, or life, they miss the small things most. The taste of maa's chai, perfectly brewed every single time, with just the right amount of everything.
        </p>
        <h3>The Problem We Solve</h3>
        <p>
          Making good chai is hard. You need to measure tea, sugar, and masala perfectly. Too much tea and it is bitter. Too much sugar and it is cloying. Too little masala and it is bland. For migrants, bachelors, and busy families in Delhi NCR, this guesswork ruins the chai experience.
        </p>
        <h3>Our Solution</h3>
        <p>
          <strong>300ml Tea</strong> is a pre-measured raw chai blend. Each packet contains exactly the right amount of premium tea powder, natural sugar, and our signature Adrak & Elaichi masala — all perfectly calibrated for one 300ml cup of chai.
        </p>
        <p>
          It is NOT instant tea. It is NOT a premix. You pour 300ml of milk, add the sachet contents, stir on high flame for 5 minutes 30 seconds, and strain. The result is authentic, freshly brewed chai — the kind that reminds you of home.
        </p>
        <h3>How It Works</h3>
        <p>
          Pour 300ml of milk into a pan and heat on high flame. After 1 minute, tear open one sachet and pour contents into the hot milk. Stir continuously for 4 minutes 30 seconds. Strain. Serve. That is it. No measuring. No guesswork. No compromise.
        </p>
        <h3>Our Promise</h3>
        <p>
          Every ingredient is carefully sourced. No preservatives. No artificial flavours. Just real chai, the way it should be. We are building a brand that respects the emotion behind every cup of chai.
        </p>
        <p>
          <strong>Delhi NCR only</strong> for now, but expanding soon. Available on our website, Blinkit, and Zepto.
        </p>
        <p style={{ fontSize: 20, fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--orange)', marginTop: 40, textAlign: 'center' }}>
          Wahi wali chai. Kahin bhi.
        </p>
      </div>
    </div>
  );
}
