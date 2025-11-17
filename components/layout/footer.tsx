"use client";

/**
 * Tanglewood Art Gallery - Footer Component
 * Newsletter signup, social links, and site info - Museum styling
 */

import Link from "next/link";
import { useState } from "react";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      // TODO: Implement newsletter subscription API endpoint
      // For now, just simulate success
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMessage({
        type: "success",
        text: "Thank you for subscribing! Check your email for confirmation.",
      });
      setEmail("");
    } catch (error) {
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-museum-slate/30 bg-museum-dark">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Newsletter Section */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-2xl text-museum-cream mb-4">
              Stay Inspired
            </h3>
            <p className="text-museum-cream/80 mb-6 max-w-md">
              Subscribe to receive updates on new artworks, exclusive prints, and behind-the-scenes stories from the studio.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="max-w-md">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  disabled={isSubmitting}
                  className="flex-1 rounded-lg border border-museum-slate bg-museum-charcoal px-4 py-3 text-museum-cream placeholder:text-museum-slate transition-colors focus:border-museum-gold focus:outline-none focus:ring-2 focus:ring-museum-gold focus:ring-offset-2 focus:ring-offset-museum-dark disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg bg-museum-gold px-6 py-3 font-semibold text-museum-dark transition-all hover:bg-museum-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-museum-gold focus-visible:ring-offset-2 focus-visible:ring-offset-museum-dark disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? "..." : "Subscribe"}
                </button>
              </div>

              {message && (
                <p
                  className={`mt-3 text-sm ${
                    message.type === "success"
                      ? "text-museum-gold"
                      : "text-red-400"
                  }`}
                  role="alert"
                >
                  {message.text}
                </p>
              )}
            </form>
          </div>

          {/* Social Links & Info */}
          <div>
            <h3 className="font-serif text-2xl text-museum-cream mb-4">
              Connect
            </h3>

            {/* Social Icons */}
            <div className="flex gap-4 mb-8">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-museum-cream transition-colors hover:bg-museum-charcoal hover:text-museum-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-museum-gold focus-visible:ring-offset-2 focus-visible:ring-offset-museum-dark"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-museum-cream transition-colors hover:bg-museum-charcoal hover:text-museum-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-museum-gold focus-visible:ring-offset-2 focus-visible:ring-offset-museum-dark"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-museum-cream transition-colors hover:bg-museum-charcoal hover:text-museum-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-museum-gold focus-visible:ring-offset-2 focus-visible:ring-offset-museum-dark"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="mailto:hello@tanglewoodart.com"
                className="rounded-lg p-2 text-museum-cream transition-colors hover:bg-museum-charcoal hover:text-museum-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-museum-gold focus-visible:ring-offset-2 focus-visible:ring-offset-museum-dark"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>

            {/* Quick Links */}
            <nav className="flex flex-col gap-2 text-sm">
              <Link
                href="/about"
                className="text-museum-cream/80 transition-colors hover:text-museum-gold focus-visible:outline-none focus-visible:text-museum-gold"
              >
                About the Artist
              </Link>
              <Link
                href="/admin"
                className="text-museum-slate transition-colors hover:text-museum-gold focus-visible:outline-none focus-visible:text-museum-gold"
              >
                Admin Dashboard
              </Link>
            </nav>
          </div>
        </div>

        {/* Copyright & Credits */}
        <div className="mt-12 border-t border-museum-slate/30 pt-8">
          <div className="flex flex-col gap-4 text-center text-sm text-museum-cream/60 md:flex-row md:justify-between md:text-left">
            <p>
              &copy; {currentYear} Tanglewood Art. All rights reserved.
            </p>
            <p className="font-serif italic">
              Original oil paintings by Dennis Wood
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
