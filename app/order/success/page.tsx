/**
 * Tanglewood Art - Order Success Page
 * Order confirmation page after successful payment
 */

import React from 'react';
import type { Metadata } from 'next';
import { OrderSuccessClient } from './order-success-client';

export const metadata: Metadata = {
  title: 'Order Confirmed - Tanglewood Art',
  description: 'Your order has been successfully placed.',
};

export default function OrderSuccessPage() {
  return <OrderSuccessClient />;
}
