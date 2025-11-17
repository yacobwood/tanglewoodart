/**
 * Tanglewood Art Gallery - Checkout Page
 * Checkout page with customer info form and payment processing
 */

import React from 'react';
import type { Metadata } from 'next';
import { CheckoutPageClient } from './checkout-page-client';

export const metadata: Metadata = {
  title: 'Checkout - Tanglewood Art Gallery',
  description: 'Complete your purchase securely with Stripe.',
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
