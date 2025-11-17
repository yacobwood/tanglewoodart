/**
 * Newsletter CTA Component
 * Email subscription form for homepage
 */

'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    // TODO: Implement actual newsletter subscription API
    // For now, simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setStatus('success');
    setMessage('Thank you for subscribing! Please check your email to confirm.');
    setEmail('');

    // Reset status after 5 seconds
    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  return (
    <section className="section py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          className="relative bg-museum-charcoal border border-museum-slate rounded-sm overflow-hidden"
        >
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-museum-gold via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative px-6 py-12 md:px-12 md:py-16 text-center max-w-3xl mx-auto">
            <p className="text-sm text-museum-gold uppercase tracking-widest mb-4">
              Stay Informed
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-museum-cream mb-4">
              New Works & Exhibitions
            </h2>

            <p className="text-lg text-museum-cream/80 mb-8 max-w-2xl mx-auto">
              Subscribe to receive updates about new paintings, upcoming exhibitions,
              and exclusive previews of works in progress.
            </p>

            {/* Newsletter Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'loading' || status === 'success'}
                className="flex-1"
                aria-label="Email address"
              />
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={status === 'loading' || status === 'success'}
                className="sm:w-auto"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>

            {/* Status Messages */}
            {message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm ${
                  status === 'success' ? 'text-museum-gold' : 'text-red-400'
                }`}
                role="status"
                aria-live="polite"
              >
                {message}
              </motion.p>
            )}

            <p className="text-xs text-museum-cream/60 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
