/**
 * Cart Store Tests
 * Tests for Zustand cart state management
 */

import { renderHook, act } from '@testing-library/react'
import { useCartStore } from '@/lib/cart-store'

// Mock artwork for testing
const mockArtwork = {
  id: 'test-1',
  title: 'Test Artwork',
  slug: 'test-artwork',
  artist: 'Test Artist',
  year: 2024,
  medium: 'Oil on canvas',
  dimensions: { width: 60, height: 80, unit: 'cm' as const },
  category: 'landscape' as const,
  description: 'Test description',
  price: 100000, // £1000.00
  availability: 'available' as const,
  featured: false,
  images: [{ url: '/test.jpg', alt: 'Test' }],
}

describe('Cart Store', () => {
  beforeEach(() => {
    // Reset cart before each test
    const { result } = renderHook(() => useCartStore())
    act(() => {
      result.current.clearCart()
    })
  })

  test('should add item to cart', () => {
    const { result } = renderHook(() => useCartStore())

    act(() => {
      result.current.addItem(mockArtwork, 'original')
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].artworkId).toBe('test-1')
    expect(result.current.items[0].type).toBe('original')
  })

  test('should not add duplicate original artwork', () => {
    const { result } = renderHook(() => useCartStore())

    act(() => {
      result.current.addItem(mockArtwork, 'original')
      result.current.addItem(mockArtwork, 'original')
    })

    expect(result.current.items).toHaveLength(1)
  })

  test('should remove item from cart', () => {
    const { result } = renderHook(() => useCartStore())

    act(() => {
      result.current.addItem(mockArtwork, 'original')
    })

    const cartItemId = result.current.items[0].id

    act(() => {
      result.current.removeItem(cartItemId)
    })

    expect(result.current.items).toHaveLength(0)
  })

  test('should calculate subtotal correctly', () => {
    const { result } = renderHook(() => useCartStore())

    act(() => {
      result.current.addItem(mockArtwork, 'original')
    })

    expect(result.current.getSubtotal()).toBe(100000) // £1000.00 in pence
  })

  test('should calculate total with VAT and shipping', () => {
    const { result } = renderHook(() => useCartStore())

    act(() => {
      result.current.addItem(mockArtwork, 'original')
    })

    const total = result.current.getTotal()
    const subtotal = result.current.getSubtotal()
    const vat = result.current.getVAT()
    const shipping = result.current.getShipping()

    expect(total).toBe(subtotal + vat + shipping)
  })

  test('should get item count', () => {
    const { result } = renderHook(() => useCartStore())

    act(() => {
      result.current.addItem(mockArtwork, 'original')
    })

    expect(result.current.getItemCount()).toBe(1)
  })

  test('should clear cart', () => {
    const { result } = renderHook(() => useCartStore())

    act(() => {
      result.current.addItem(mockArtwork, 'original')
      result.current.clearCart()
    })

    expect(result.current.items).toHaveLength(0)
  })

  test('should toggle cart drawer', () => {
    const { result } = renderHook(() => useCartStore())

    expect(result.current.isOpen).toBe(false)

    act(() => {
      result.current.toggleCart()
    })

    expect(result.current.isOpen).toBe(true)

    act(() => {
      result.current.toggleCart()
    })

    expect(result.current.isOpen).toBe(false)
  })
})
