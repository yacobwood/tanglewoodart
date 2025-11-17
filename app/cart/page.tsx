/**
 * Tanglewood Art - Cart Page
 * Full cart page with items list and order summary
 */

import React from 'react';
import type { Metadata } from 'next';
import { CartPageClient } from './cart-page-client';

export const metadata: Metadata = {
  title: 'Shopping Cart - Tanglewood Art',
  description: 'Review your selected artworks and prints before checkout.',
};

export default function CartPage() {
  return <CartPageClient />;
}
