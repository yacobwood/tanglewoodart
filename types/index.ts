/**
 * Tanglewood Art Gallery - Type Definitions
 * Production-ready TypeScript interfaces and types
 */

// Category enum for artwork classification
export enum Category {
  LANDSCAPE = "landscape",
  PORTRAIT = "portrait",
  ABSTRACT = "abstract",
  STILL_LIFE = "still-life",
  SEASCAPE = "seascape",
}

// Dimensions interface for artwork measurements
export interface Dimensions {
  width: number;
  height: number;
  depth?: number;
  unit: "cm" | "in";
}

// Image interface for artwork photos
export interface ArtworkImage {
  url: string;
  alt: string;
}

// Main Artwork interface
export interface Artwork {
  id: string;
  title: string;
  slug: string;
  artist: string;
  year: number;
  medium: string;
  dimensions: Dimensions;
  category: Category;
  description: string;
  story?: string;
  images: ArtworkImage[];
  price: number; // Price in cents for original artwork
  availability: "available" | "sold" | "reserved";
  featured: boolean;
  series?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Print variant interface for print sales
export interface PrintVariant {
  id: string;
  size: "A4" | "A3" | "A2" | "A1" | "A0";
  finish: "matte" | "glossy" | "canvas";
  price: number; // Price in cents
  dimensions: Dimensions;
}

// Cart item interface
export interface CartItem {
  artworkId: string;
  artwork?: Artwork; // Populated artwork details
  type: "original" | "print";
  printVariant?: PrintVariant;
  quantity: number;
  price: number; // Price per item in cents
}

// Order status enum
export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  CONFIRMED = "confirmed",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

// Shipping details interface
export interface ShippingDetails {
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  country: string;
  phone?: string;
}

// Order interface
export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number; // In cents
  shipping: number; // In cents
  tax: number; // VAT in cents
  total: number; // In cents
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  status: OrderStatus;
  customerEmail: string;
  customerName?: string;
  shippingDetails?: ShippingDetails;
  createdAt: Date;
  updatedAt: Date;
  paidAt?: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
}

// Stripe checkout session metadata
export interface CheckoutSessionMetadata {
  orderId: string;
  customerEmail: string;
}

// Filter options for artwork browsing
export interface ArtworkFilters {
  category?: Category;
  availability?: Artwork["availability"];
  priceMin?: number;
  priceMax?: number;
  featured?: boolean;
  series?: string;
  searchQuery?: string;
}

// Pagination interface
export interface PaginationParams {
  page: number;
  limit: number;
}

// Paginated response
export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// API response wrapper
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Newsletter subscription
export interface NewsletterSubscription {
  id: string;
  email: string;
  name?: string;
  subscribedAt: Date;
  active: boolean;
}

// Contact form submission
export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  artworkId?: string; // If inquiring about specific artwork
  createdAt: Date;
  replied: boolean;
}

// User preferences (for future use)
export interface UserPreferences {
  currency: "GBP" | "USD" | "EUR";
  newsletter: boolean;
  favoriteArtworks: string[]; // Array of artwork IDs
}
