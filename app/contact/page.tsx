'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Package } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ToastContext';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = 'Name is required.';
  if (!form.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!form.message.trim()) {
    errors.message = 'Message is required.';
  } else if (form.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }
  return errors;
}

export default function ContactPage() {
  const { showToast } = useToast();
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    const { error } = await supabase.from('contact_messages').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    });
    setLoading(false);

    if (error) {
      showToast("Something went wrong. Please email us directly at tcd@thechaidealer.com", 'error');
    } else {
      showToast("Message sent! We'll get back to you soon.", 'success');
      setForm({ name: '', email: '', message: '' });
      setErrors({});
    }
  };

  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="section-inner">
          <h1 className="about-hero__title">Contact Us</h1>
          <p className="about-hero__subtitle">We would love to hear from you. Drop us a message!</p>
        </div>
      </div>
      <div className="section-inner">
        <div className="contact-grid reveal">
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, marginBottom: 20 }}>Get in Touch</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Mail size={22} color="#C8522A" />
                <div>
                  <div style={{ fontWeight: 600 }}>Email</div>
                  <a
                    href="mailto:tcd@thechaidealer.com"
                    style={{ color: 'var(--text-m)', fontSize: 14, textDecoration: 'none' }}
                  >
                    tcd@thechaidealer.com
                  </a>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Phone size={22} color="#C8522A" />
                <div>
                  <div style={{ fontWeight: 600 }}>Phone</div>
                  <a
                    href="tel:+917042401496"
                    style={{ color: 'var(--text-m)', fontSize: 14, textDecoration: 'none' }}
                  >
                    +91 70424 01496
                  </a>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <MapPin size={22} color="#C8522A" />
                <div>
                  <div style={{ fontWeight: 600 }}>Location</div>
                  <div style={{ color: 'var(--text-m)', fontSize: 14 }}>Delhi NCR, India</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Package size={22} color="#C8522A" />
                <div>
                  <div style={{ fontWeight: 600 }}>Quick Delivery</div>
                  <div style={{ color: 'var(--text-m)', fontSize: 14 }}>Also on Blinkit & Zepto</div>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, marginBottom: 24 }}>Send a Message</h3>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  style={errors.name ? { borderColor: '#ef4444' } : {}}
                />
                {errors.name && (
                  <span style={{ color: '#ef4444', fontSize: 12, marginTop: 4, display: 'block' }}>{errors.name}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  style={errors.email ? { borderColor: '#ef4444' } : {}}
                />
                {errors.email && (
                  <span style={{ color: '#ef4444', fontSize: 12, marginTop: 4, display: 'block' }}>{errors.email}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell us something..."
                  value={form.message}
                  onChange={handleChange}
                  style={errors.message ? { borderColor: '#ef4444' } : {}}
                />
                {errors.message && (
                  <span style={{ color: '#ef4444', fontSize: 12, marginTop: 4, display: 'block' }}>{errors.message}</span>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%' }}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
