/**
 * Tanglewood Art Gallery - Utility Functions
 * Production-ready helper functions for common operations
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names using clsx and tailwind-merge
 * Handles conditional classes and Tailwind CSS conflicts
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a price in cents to a currency string
 * @param cents - Price in cents
 * @param currency - Currency code (default: GBP)
 * @param locale - Locale for formatting (default: en-GB)
 * @returns Formatted currency string (e.g., "£123.45")
 */
export function formatPrice(
  cents: number,
  currency: string = "GBP",
  locale: string = "en-GB"
): string {
  const pounds = cents / 100;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(pounds);
}

/**
 * Calculates VAT amount from a price
 * @param price - Price in cents
 * @param vatPercent - VAT percentage (default: 20 for UK)
 * @returns VAT amount in cents
 */
export function calculateVAT(price: number, vatPercent: number = 20): number {
  return Math.round((price * vatPercent) / 100);
}

/**
 * Generates a URL-friendly slug from a string
 * @param title - String to convert to slug
 * @returns URL-friendly slug
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove non-word chars except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Calculates shipping cost based on order details
 * @param itemCount - Number of items in cart
 * @param orderTotal - Subtotal in cents
 * @param country - Destination country code
 * @returns Shipping cost in cents
 */
export function calculateShipping(
  itemCount: number,
  orderTotal: number,
  country: string = "GB"
): number {
  // Free shipping over £500
  if (orderTotal >= 50000) {
    return 0;
  }

  // UK shipping
  if (country === "GB") {
    if (itemCount === 1) return 1500; // £15
    if (itemCount === 2) return 2500; // £25
    return 3500; // £35 for 3+ items
  }

  // European shipping
  if (["FR", "DE", "IT", "ES", "NL", "BE", "IE"].includes(country)) {
    if (itemCount === 1) return 3500; // £35
    if (itemCount === 2) return 5000; // £50
    return 7500; // £75 for 3+ items
  }

  // International shipping
  if (itemCount === 1) return 6000; // £60
  if (itemCount === 2) return 9000; // £90
  return 12000; // £120 for 3+ items
}

/**
 * Formats a date to a readable string
 * @param date - Date object or ISO string
 * @param format - Format type (default: "long")
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  format: "short" | "long" | "full" = "long"
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  const formatOptions: Record<string, Intl.DateTimeFormatOptions> = {
    short: { month: "short", day: "numeric", year: "numeric" },
    long: { month: "long", day: "numeric", year: "numeric" },
    full: {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  };

  return dateObj.toLocaleDateString("en-GB", formatOptions[format]);
}

/**
 * Validates an email address
 * @param email - Email address to validate
 * @returns True if valid email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Debounce function for search and input handlers
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Truncates text to a specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @param suffix - Suffix to append (default: "...")
 * @returns Truncated text
 */
export function truncate(
  text: string,
  maxLength: number,
  suffix: string = "..."
): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length).trim() + suffix;
}

/**
 * Converts dimensions to a formatted string
 * @param width - Width value
 * @param height - Height value
 * @param depth - Optional depth value
 * @param unit - Unit of measurement
 * @returns Formatted dimensions string (e.g., "50 x 70 cm")
 */
export function formatDimensions(
  width: number,
  height: number,
  depth?: number,
  unit: "cm" | "in" = "cm"
): string {
  if (depth) {
    return `${width} × ${height} × ${depth} ${unit}`;
  }
  return `${width} × ${height} ${unit}`;
}

/**
 * Generates a random ID (for temporary use before database assignment)
 * @param prefix - Optional prefix for the ID
 * @returns Random ID string
 */
export function generateId(prefix?: string): string {
  const id = Math.random().toString(36).substring(2, 11);
  return prefix ? `${prefix}_${id}` : id;
}

/**
 * Clamps a number between min and max values
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Checks if code is running on client side
 * @returns True if running in browser
 */
export function isClient(): boolean {
  return typeof window !== "undefined";
}

/**
 * Safely parses JSON with fallback
 * @param json - JSON string to parse
 * @param fallback - Fallback value if parsing fails
 * @returns Parsed object or fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}
