'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from './CartContext';
import { supabase } from '@/lib/supabase';
import CartDrawer from './CartDrawer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const pathname = usePathname();
  const { totalItems, openDrawer } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const marqueeItems = [
    'FREE DELIVERY ON ONLINE PAYMENT',
    'MAA KI CHAI, KAHIN BHI',
    'ZERO GUESSWORK',
    'SAME TASTE EVERY TIME',
    'ALL NATURAL INGREDIENTS',
  ];

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/product', label: 'Shop' },
    { href: '/about', label: 'Our Story' },
    { href: '/track-order', label: 'Track Order' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleNewsletterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = newsletterEmail.trim().toLowerCase();
    if (!email) return;

    const { error } = await supabase.from('newsletter_subscribers').insert({ email });
    if (error && error.code !== '23505') {
      setNewsletterMessage('Something went wrong. Please try again.');
      return;
    }

    setNewsletterEmail('');
    setNewsletterMessage('You are on the list.');
  };

  return (
    <>
      {/* Ticker strip — fixed at very top */}
      <div className="ticker-strip">
        <div className="ticker-strip__track">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} className="ticker-strip__item">
              <span className="ticker-strip__dot" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Navbar — fixed below ticker */}
      <nav className={`navbar ${scrolled ? 'navbar--solid' : 'navbar--transparent'}`}>
        <div className="navbar__inner">
          <Link href="/" className="navbar__logo">
            <span className="navbar__logo-text">300ml TEA</span>
          </Link>

          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="navbar__link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="navbar__actions">
            <button
              className="navbar__cart"
              onClick={openDrawer}
              aria-label={`Cart (${totalItems} items)`}
            >
              <ShoppingCart size={20} color="white" />
              {totalItems > 0 && <span className="navbar__cart-count">{totalItems}</span>}
            </button>
            <Link href="/product" className="btn btn-primary btn-small">
              Shop Now
            </Link>
            <button className="navbar__menu-btn" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${mobileOpen ? 'mobile-menu--open' : ''}`}>
        <button className="mobile-menu__close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
          <X size={28} />
        </button>
        <ul className="mobile-menu__links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="mobile-menu__link" onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              className="mobile-menu__link"
              style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}
              onClick={() => { setMobileOpen(false); openDrawer(); }}
            >
              Cart {totalItems > 0 ? `(${totalItems})` : ''}
            </button>
          </li>
        </ul>
      </div>

      <CartDrawer />

      <main>{children}</main>

      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__grid">
            <div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, color: '#FAF6F1', display: 'block' }}>
                300ml TEA
              </span>
              <p className="footer__brand-text">
                Pre-measured raw chai blend that brings maa ki chai to your cup, kahin bhi. Not instant. Not premix. Just real chai.
              </p>
            </div>
            <div>
              <h4 className="footer__heading">Shop</h4>
              <ul className="footer__links">
                <li><Link href="/product" className="footer__link">300ml Tea</Link></li>
                <li><Link href="/cart" className="footer__link">Cart</Link></li>
                <li><Link href="/track-order" className="footer__link">Track Order</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="footer__heading">Company</h4>
              <ul className="footer__links">
                <li><Link href="/about" className="footer__link">Our Story</Link></li>
                <li><Link href="/contact" className="footer__link">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="footer__heading">Legal</h4>
              <ul className="footer__links">
                <li><Link href="/privacy-policy" className="footer__link">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="footer__link">Terms of Service</Link></li>
                <li><Link href="/return-policy" className="footer__link">Return Policy</Link></li>
                <li><Link href="/refund-policy" className="footer__link">Refund Policy</Link></li>
                <li><Link href="/shipping-policy" className="footer__link">Shipping Policy</Link></li>
              </ul>
            </div>
            <div className="footer__newsletter">
              <div className="footer__newsletter-copy">
                <strong>Keep chai close.</strong>
                <span>Get occasional notes, offers, and brewing inspiration.</span>
              </div>
              <div>
                <form className="footer__newsletter-form" onSubmit={handleNewsletterSubmit}>
                  <input
                    className="footer__newsletter-input"
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(event) => setNewsletterEmail(event.target.value)}
                    placeholder="Your email address"
                    aria-label="Email address for newsletter"
                  />
                  <button className="footer__newsletter-button" type="submit">Join</button>
                </form>
                {newsletterMessage && <p className="footer__newsletter-message" role="status">{newsletterMessage}</p>}
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <p className="footer__copyright">© 2025 300ml Tea. All rights reserved.</p>
            <div style={{ fontSize: 13, color: '#9a8578', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="mailto:tcd@thechaidealer.com" style={{ color: '#9a8578', textDecoration: 'none' }}>tcd@thechaidealer.com</a>
              <a href="tel:+917042401496" style={{ color: '#9a8578', textDecoration: 'none' }}>+91 70424 01496</a>
            </div>
            <div className="footer__legal">
              <Link href="/privacy-policy">Privacy</Link>
              <Link href="/terms-of-service">Terms</Link>
              <Link href="/return-policy">Returns</Link>
              <Link href="/shipping-policy">Shipping</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
