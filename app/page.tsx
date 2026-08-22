'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, Check, ArrowRight } from 'lucide-react';
import FAQSection from '@/components/FAQSection';

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is 300ml Tea exactly?',
      answer:
        '300ml Tea is a pre-measured raw chai blend. Each packet contains the exact amount of tea powder, sugar, and chai masala (Adrak & Elaichi) needed to make one perfect 300ml cup of chai. It is NOT instant tea or a premix. You pour 300ml of milk, add the sachet contents, stir on high flame for 5 minutes 30 seconds, and strain.',
    },
    {
      question: 'Is it instant tea? Do I just add hot water?',
      answer:
        'No, 300ml Tea is NOT instant tea. You pour 300ml of milk into a pan, heat on high flame, add the sachet contents after 1 minute, stir continuously for 4 minutes 30 seconds, and strain. The result is authentic, freshly brewed chai — just like maa used to make.',
    },
    {
      question: 'How many cups does one packet make?',
      answer:
        'One packet makes exactly ONE cup of 300ml chai. The proportions are precisely calibrated for a single serving.',
    },
    {
      question: 'What ingredients are inside?',
      answer:
        'Each packet contains premium tea powder, natural sugar, and our signature chai masala blend of Adrak (ginger) and Elaichi (cardamom). No preservatives, no artificial flavours.',
    },
    {
      question: 'Where do you deliver?',
      answer:
        'We currently deliver across Delhi NCR only. You can also find us on Blinkit and Zepto for quick delivery.',
    },
    {
      question: 'What is the Buy 1 Get 1 offer?',
      answer:
        'For a limited time, when you buy one pack of 300ml Tea at ₹250, you get another pack absolutely free. That is 2 packs for the price of 1!',
    },
    {
      question: 'How do I store the packets?',
      answer:
        'Store in a cool, dry place away from direct sunlight. The individual sachets are sealed to maintain freshness. Once opened, use immediately.',
    },
  ];

  const benefits = [
    { title: 'Pre-\nMeasured' },
    { title: 'Zero\nGuesswork' },
    { title: 'Same Taste\nEvery Time' },
    { title: 'All Natural\nIngredients' },
  ];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="pdp-hero">
        <div className="pdp-hero__content">
          <h1 className="pdp-hero__title">
            Maa Ki Chai,
            <br />
            Kahin Bhi.
          </h1>
          <p className="pdp-hero__desc">
            Pre-measured raw chai blend with tea powder, sugar, and Adrak &amp; Elaichi masala.
            Not instant. Not premix. Just real chai — in 5 minutes 30 seconds.
          </p>
          <Link href="/product" className="pdp-hero__cta">
            Shop Now <ArrowRight size={16} />
          </Link>
        </div>
        <div className="pdp-hero__image">
          <img
            src="/images/300ml_tea_3d_box_1.png"
            alt="300ml Tea — Adrak & Elaichi packaging box"
          />
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <div className="pdp-marquee">
        <div className="pdp-marquee__track">
          {[...Array(2)].map((_, dup) =>
            ['FREE DELIVERY ON ONLINE PAYMENT', 'MAA KI CHAI, KAHIN BHI', 'ZERO GUESSWORK', 'SAME TASTE EVERY TIME', 'ALL NATURAL INGREDIENTS'].map(
              (text, i) => (
                <span key={`${dup}-${i}`} className="pdp-marquee__item">
                  {text}
                </span>
              )
            )
          )}
        </div>
      </div>

      {/* ===== BENEFIT BADGES ===== */}
      <section className="pdp-badges">
        {benefits.map((b, i) => (
          <div key={i} className="pdp-badges__circle">
            <span className="pdp-badges__text">{b.title}</span>
          </div>
        ))}
      </section>

      {/* ===== SHOP OUR TEA MIX ===== */}
      <section className="pdp-shop-section">
        <h2 className="pdp-shop-section__title">Shop Our Tea Mix</h2>
        <div className="pdp-shop-section__card-wrapper">
          <Link href="/product" className="pdp-product-card">
            <div className="pdp-product-card__image">
              <img
                src="/images/300ml_tea_3d_box_1.png"
                alt="300ml Tea — Adrak & Elaichi"
              />
            </div>
            <div className="pdp-product-card__info">
              <h3 className="pdp-product-card__name">300ml Tea</h3>
              <p className="pdp-product-card__sub">Adrak &amp; Elaichi · 1 Cup Sachet</p>
              <div className="pdp-product-card__price-row">
                <span className="pdp-product-card__price">₹250</span>
                <span className="pdp-product-card__price-old">₹500</span>
              </div>
              <span className="pdp-product-card__add-btn">View Product</span>
            </div>
          </Link>
        </div>
        <p className="pdp-shop-section__coming">More flavours coming soon</p>
      </section>

      {/* ===== WHAT IS 300ML TEA ===== */}
      <section className="pdp-whatis">
        <div className="pdp-whatis__wave-top" />
        <div className="pdp-whatis__inner">
          <p className="pdp-whatis__pretitle">So, what is</p>
          <h2 className="pdp-whatis__title">300ml Tea?</h2>
          <p className="pdp-whatis__text">
            <span className="pdp-whatis__text--bold">300ml Tea is a pre-measured raw chai blend.</span> Each
            packet contains the exact amount of tea powder, sugar, and chai masala (Adrak &amp; Elaichi)
            needed to make one perfect 300ml cup of chai.
          </p>
          <p className="pdp-whatis__text">
            It is NOT instant tea or a premix. You pour 300ml of milk, add the sachet contents, stir on
            high flame for 5 minutes 30 seconds, and strain. The result is authentic, freshly brewed
            chai — just like maa used to make.
          </p>
        </div>
      </section>

      {/* ===== SCIENCE / WHY IT WORKS ===== */}
      <section className="pdp-science">
        <h2 className="pdp-science__title">Why It Works</h2>
        <ul className="pdp-science__list">
          <li className="pdp-science__item">
            <Check size={20} className="pdp-science__check" />
            Pre-measured proportions mean zero guesswork — same taste every single time.
          </li>
          <li className="pdp-science__item">
            <Check size={20} className="pdp-science__check" />
            Premium tea powder sourced from trusted estates for rich, authentic flavour.
          </li>
          <li className="pdp-science__item">
            <Check size={20} className="pdp-science__check" />
            Natural sugar and real Adrak &amp; Elaichi masala — no preservatives, no artificial flavours.
          </li>
          <li className="pdp-science__item">
            <Check size={20} className="pdp-science__check" />
            Each sachet is sealed for freshness, so every cup tastes like it was just made.
          </li>
          <li className="pdp-science__item">
            <Check size={20} className="pdp-science__check" />
            5 minutes 30 seconds from start to finish — faster than waiting in a chai queue.
          </li>
        </ul>
      </section>

      {/* ===== HOW IT'S MADE ===== */}
      <section className="pdp-howmade">
        <div className="pdp-howmade__text">
          <p className="pdp-howmade__title">How It&apos;s Made</p>
          <h3 className="pdp-howmade__subtitle">Real Chai, Simplified.</h3>
          <p className="pdp-howmade__desc">
            We took the guesswork out of making perfect chai. Every packet has the right amount of tea
            powder, sugar, and masala — measured exactly for 300ml of milk. Just pour, add, stir, and
            strain. That&apos;s it.
          </p>
          <div className="pdp-howmade__tags">
            <span>Tea Powder</span>
            <span>Natural Sugar</span>
            <span>Adrak</span>
            <span>Elaichi</span>
            <span>No Preservatives</span>
          </div>
        </div>
        <div className="pdp-howmade__image">
          <img
            src="/images/300ml_tea_3d_box_1.png"
            alt="300ml Tea preparation"
          />
        </div>
      </section>

      {/* ===== BREW VIDEO ===== */}
      <section className="pdp-brew-video">
        <h2 className="pdp-brew-video__title">Watch How to Brew</h2>
        <Link href="/product" className="pdp-brew-video__player">
          <img
            src="/images/300ml_tea_3d_box_1.png"
            alt="How to brew 300ml Tea"
          />
          <span className="pdp-brew-video__play-btn">
            <ArrowRight size={32} />
          </span>
        </Link>
        <p className="pdp-brew-video__caption">See how easy it is to make the perfect cup — video coming soon</p>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="pdp-testimonials">
        <h2 className="pdp-testimonials__title">What People Are Saying</h2>
        <div className="pdp-testimonials__grid">
          <div className="pdp-testimonials__card">
            <div className="pdp-testimonials__stars">★★★★★</div>
            <p className="pdp-testimonials__text">
              &ldquo;Honestly tastes exactly like my mom makes. I was sceptical but one sip and I was
              back home. The Adrak-Elaichi flavour is spot on.&rdquo;
            </p>
            <p className="pdp-testimonials__author">— Priya S., Delhi</p>
          </div>
          <div className="pdp-testimonials__card">
            <div className="pdp-testimonials__stars">★★★★★</div>
            <p className="pdp-testimonials__text">
              &ldquo;I live alone and making chai was always a hassle — too much, too little. With 300ml
              Tea it&apos;s perfect every time. No measuring, no waste.&rdquo;
            </p>
            <p className="pdp-testimonials__author">— Rahul M., Gurgaon</p>
          </div>
          <div className="pdp-testimonials__card">
            <div className="pdp-testimonials__stars">★★★★★</div>
            <p className="pdp-testimonials__text">
              &ldquo;Bought the Buy 1 Get 1 offer and it was worth every rupee. Two packs, perfect chai
              for a week. Already ordered again for my parents.&rdquo;
            </p>
            <p className="pdp-testimonials__author">— Anjali K., Noida</p>
          </div>
        </div>
      </section>

      {/* ===== CTA BAR ===== */}
      <section className="pdp-cta-bar">
        <div className="pdp-cta-bar__content">
          <h2 className="pdp-cta-bar__title">Ready for Maa Ki Chai?</h2>
          <p className="pdp-cta-bar__desc">
            Buy 1 Get 1 Free — limited time only. Free delivery on online payment across Delhi NCR.
          </p>
        </div>
        <div className="pdp-cta-bar__buttons">
          <Link href="/product" className="pdp-cta-bar__shop-btn">
            Shop Now
          </Link>
          <Link href="/contact" className="pdp-cta-bar__contact-btn">
            Contact Us
          </Link>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="pdp-faq">
        <h2 className="pdp-faq__title">Frequently Asked Questions</h2>
        <div className="pdp-faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className={`pdp-faq-item ${openFaq === i ? 'pdp-faq-item--open' : ''}`}>
              <button
                className="pdp-faq-item__q"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {faq.question}
                <ChevronDown size={20} className="pdp-faq-item__icon" />
              </button>
              <div className="pdp-faq-item__a">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
