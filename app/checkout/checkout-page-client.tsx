/**
 * Tanglewood Art Gallery - Checkout Page Client Component
 * Client-side checkout page with form and Stripe integration
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Lock } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart-store';
import { OrderSummary } from '@/components/checkout/order-summary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FormData {
  email: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface FormErrors {
  [key: string]: string;
}

export function CheckoutPageClient() {
  const router = useRouter();
  const { items, getSubtotal } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    country: 'GB',
    phone: '',
  });

  // Redirect if cart is empty
  React.useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    // Required fields
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.addressLine1) newErrors.addressLine1 = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
    if (!formData.country) newErrors.country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Create checkout session
      const response = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          customerInfo: formData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setErrors({
        submit: 'Failed to process checkout. Please try again.',
      });
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return null; // Will redirect
  }

  return (
    <main className="min-h-screen bg-museum-dark pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-museum-gold hover:text-museum-gold-light font-sans mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif text-museum-cream mb-4">
            Checkout
          </h1>
          <p className="text-museum-slate font-sans">
            Complete your order securely
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Contact Information */}
              <div className="bg-museum-charcoal border border-museum-slate/20 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-serif text-museum-cream mb-6">
                  Contact Information
                </h2>

                <div className="space-y-4">
                  <Input
                    type="email"
                    name="email"
                    label="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                    placeholder="you@example.com"
                    autoComplete="email"
                  />

                  <Input
                    type="text"
                    name="name"
                    label="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    required
                    placeholder="John Smith"
                    autoComplete="name"
                  />

                  <Input
                    type="tel"
                    name="phone"
                    label="Phone Number (Optional)"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+44 20 1234 5678"
                    autoComplete="tel"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-museum-charcoal border border-museum-slate/20 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-serif text-museum-cream mb-6">
                  Shipping Address
                </h2>

                <div className="space-y-4">
                  <Input
                    type="text"
                    name="addressLine1"
                    label="Address Line 1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    error={errors.addressLine1}
                    required
                    placeholder="123 High Street"
                    autoComplete="address-line1"
                  />

                  <Input
                    type="text"
                    name="addressLine2"
                    label="Address Line 2 (Optional)"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    placeholder="Apartment, suite, etc."
                    autoComplete="address-line2"
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      type="text"
                      name="city"
                      label="City"
                      value={formData.city}
                      onChange={handleChange}
                      error={errors.city}
                      required
                      placeholder="London"
                      autoComplete="address-level2"
                    />

                    <Input
                      type="text"
                      name="postalCode"
                      label="Postal Code"
                      value={formData.postalCode}
                      onChange={handleChange}
                      error={errors.postalCode}
                      required
                      placeholder="SW1A 1AA"
                      autoComplete="postal-code"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-museum-cream mb-2 font-sans"
                    >
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-museum-charcoal border-2 border-museum-slate rounded-md text-museum-cream font-sans focus:outline-none focus:border-museum-gold focus:ring-2 focus:ring-museum-gold focus:ring-opacity-20 transition-all duration-300 ease-museum"
                      required
                    >
                      <option value="GB">United Kingdom</option>
                      <option value="US">United States</option>
                      <option value="FR">France</option>
                      <option value="DE">Germany</option>
                      <option value="IT">Italy</option>
                      <option value="ES">Spain</option>
                      <option value="NL">Netherlands</option>
                      <option value="BE">Belgium</option>
                      <option value="IE">Ireland</option>
                    </select>
                    {errors.country && (
                      <p className="mt-2 text-sm text-red-500 font-sans">
                        {errors.country}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {errors.submit && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                  <p className="text-red-500 font-sans text-sm">
                    {errors.submit}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                loading={isLoading}
                disabled={isLoading}
              >
                <Lock className="w-5 h-5 mr-2" />
                Proceed to Payment
              </Button>

              <p className="text-xs text-museum-slate font-sans text-center mt-4">
                You will be redirected to Stripe for secure payment processing
              </p>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <OrderSummary showItems />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
