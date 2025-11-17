"use client";

/**
 * Tanglewood Art Gallery - Header Component
 * Sticky header with logo, navigation, and cart - Museum in the Dark theme
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart, Menu } from "lucide-react";
import Nav from "./nav";
import { useCartStore } from "@/lib/store/cart-store";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const itemCount = useCartStore((state) => state.getItemCount());
  const openCart = useCartStore((state) => state.openCart);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "border-b border-museum-slate/30 bg-museum-dark/80 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-museum-gold focus-visible:ring-offset-2 focus-visible:ring-offset-museum-dark rounded-lg"
            >
              <div className="flex flex-col">
                <span className="font-serif text-xl text-museum-cream tracking-wide transition-colors group-hover:text-museum-gold sm:text-2xl">
                  Tanglewood Art
                </span>
                <div className="h-px w-0 bg-museum-gold transition-all duration-300 group-hover:w-full" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:gap-8">
              <Nav />

              {/* Cart Button */}
              <button
                onClick={openCart}
                className="group relative rounded-lg p-2 text-museum-cream transition-colors hover:bg-museum-charcoal hover:text-museum-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-museum-gold focus-visible:ring-offset-2 focus-visible:ring-offset-museum-dark"
                aria-label={`Shopping cart with ${itemCount} items`}
              >
                <ShoppingCart className="h-6 w-6" />
                {mounted && itemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-museum-gold text-xs font-bold text-museum-dark">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button & Cart */}
            <div className="flex items-center gap-4 md:hidden">
              {/* Mobile Cart Button */}
              <button
                onClick={openCart}
                className="group relative rounded-lg p-2 text-museum-cream transition-colors hover:bg-museum-charcoal hover:text-museum-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-museum-gold focus-visible:ring-offset-2 focus-visible:ring-offset-museum-dark"
                aria-label={`Shopping cart with ${itemCount} items`}
              >
                <ShoppingCart className="h-6 w-6" />
                {mounted && itemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-museum-gold text-xs font-bold text-museum-dark">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Hamburger Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="rounded-lg p-2 text-museum-cream transition-colors hover:bg-museum-charcoal hover:text-museum-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-museum-gold focus-visible:ring-offset-2 focus-visible:ring-offset-museum-dark"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <Nav isMobile onClose={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  );
}
