/**
 * Stripe Client SDK Initialization
 * For client-side Stripe integration (checkout, payment elements)
 */

import { loadStripe, Stripe } from '@stripe/stripe-js';

// Singleton instance to ensure Stripe is only loaded once
let stripePromise: Promise<Stripe | null>;

/**
 * Get Stripe instance
 * Uses singleton pattern to avoid loading Stripe multiple times
 */
export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    if (!publishableKey) {
      console.error('Stripe publishable key is not set');
      return Promise.resolve(null);
    }

    stripePromise = loadStripe(publishableKey);
  }

  return stripePromise;
};

/**
 * Format amount for Stripe
 * Stripe expects amounts in cents (smallest currency unit)
 * @param amount - Amount in major currency units (e.g., pounds, dollars)
 * @returns Amount in cents
 */
export const formatAmountForStripe = (amount: number): number => {
  return Math.round(amount * 100);
};

/**
 * Format amount from Stripe
 * Convert from cents back to major currency units
 * @param amount - Amount in cents
 * @returns Amount in major currency units
 */
export const formatAmountFromStripe = (amount: number): number => {
  return amount / 100;
};

/**
 * Currency formatter for display
 * @param amount - Amount in cents
 * @param currency - Currency code (default: GBP)
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'GBP'
): string => {
  const majorAmount = formatAmountFromStripe(amount);

  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(majorAmount);
};
