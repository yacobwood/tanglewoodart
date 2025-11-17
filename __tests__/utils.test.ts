/**
 * Utility Functions Tests
 */

import { formatPrice, calculateVAT, generateSlug, formatDimensions } from '@/lib/utils'

describe('Utility Functions', () => {
  describe('formatPrice', () => {
    test('should format price in GBP correctly', () => {
      expect(formatPrice(250000)).toBe('£2,500.00')
      expect(formatPrice(5000)).toBe('£50.00')
      expect(formatPrice(100)).toBe('£1.00')
    })

    test('should handle zero price', () => {
      expect(formatPrice(0)).toBe('£0.00')
    })

    test('should format large prices with commas', () => {
      expect(formatPrice(1234567)).toBe('£12,345.67')
    })
  })

  describe('calculateVAT', () => {
    test('should calculate 20% VAT correctly', () => {
      expect(calculateVAT(100000, 20)).toBe(20000) // 20% of £1000
      expect(calculateVAT(50000, 20)).toBe(10000)  // 20% of £500
    })

    test('should calculate different VAT rates', () => {
      expect(calculateVAT(100000, 10)).toBe(10000)  // 10% VAT
      expect(calculateVAT(100000, 5)).toBe(5000)    // 5% VAT
    })

    test('should handle zero VAT', () => {
      expect(calculateVAT(100000, 0)).toBe(0)
    })
  })

  describe('generateSlug', () => {
    test('should convert title to URL-friendly slug', () => {
      expect(generateSlug('Mist Over Borrowed Light')).toBe('mist-over-borrowed-light')
      expect(generateSlug('The Weight of Amber Hours')).toBe('the-weight-of-amber-hours')
    })

    test('should handle special characters', () => {
      expect(generateSlug("Artist's Masterpiece #1")).toBe('artists-masterpiece-1')
      expect(generateSlug('Café & Restaurant')).toBe('cafe--restaurant')
    })

    test('should handle multiple spaces', () => {
      expect(generateSlug('Multiple   Spaces   Here')).toBe('multiple---spaces---here')
    })

    test('should convert to lowercase', () => {
      expect(generateSlug('UPPERCASE TITLE')).toBe('uppercase-title')
    })
  })

  describe('formatDimensions', () => {
    test('should format 2D dimensions', () => {
      const dims = { width: 60, height: 80, unit: 'cm' as const }
      expect(formatDimensions(dims)).toBe('60 × 80 cm')
    })

    test('should format 3D dimensions', () => {
      const dims = { width: 60, height: 80, depth: 5, unit: 'cm' as const }
      expect(formatDimensions(dims)).toBe('60 × 80 × 5 cm')
    })

    test('should handle inches', () => {
      const dims = { width: 24, height: 36, unit: 'in' as const }
      expect(formatDimensions(dims)).toBe('24 × 36 in')
    })
  })
})
