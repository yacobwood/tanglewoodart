"use client";

/**
 * Tanglewood Art Gallery - Navigation Component
 * Mobile-responsive navigation menu with museum styling
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface NavProps {
  isMobile?: boolean;
  onClose?: () => void;
}

const navLinks = [
  { href: "/", label: "Gallery" },
  { href: "/prints", label: "Prints" },
  { href: "/about", label: "About" },
];

export default function Nav({ isMobile = false, onClose }: NavProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted && isMobile) {
    return null;
  }

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-museum-dark/95 backdrop-blur-md">
        <div className="flex h-full flex-col">
          {/* Mobile menu header */}
          <div className="flex items-center justify-between border-b border-museum-slate/30 px-6 py-4">
            <span className="font-serif text-xl text-museum-cream">Menu</span>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-museum-cream transition-colors hover:bg-museum-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-museum-gold focus-visible:ring-offset-2 focus-visible:ring-offset-museum-dark"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile navigation links */}
          <nav className="flex flex-1 flex-col gap-2 p-6">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`group relative block py-4 font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-museum-gold"
                    : "text-museum-cream hover:text-museum-gold"
                }`}
                style={{
                  animation: `fadeInUp 400ms ease-out ${index * 80}ms both`,
                }}
              >
                <span className="text-2xl font-serif">{link.label}</span>
                {isActive(link.href) && (
                  <div className="absolute bottom-2 left-0 h-0.5 w-12 bg-museum-gold" />
                )}
              </Link>
            ))}

            {/* Admin link in mobile menu */}
            <Link
              href="/admin"
              onClick={onClose}
              className="mt-auto block py-4 text-sm text-museum-slate transition-colors hover:text-museum-gold"
              style={{
                animation: `fadeInUp 400ms ease-out ${navLinks.length * 80}ms both`,
              }}
            >
              Admin Dashboard
            </Link>
          </nav>
        </div>
      </div>
    );
  }

  // Desktop navigation
  return (
    <nav className="flex items-center gap-8">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`group relative py-2 font-medium transition-colors ${
            isActive(link.href)
              ? "text-museum-gold"
              : "text-museum-cream hover:text-museum-gold"
          }`}
        >
          {link.label}
          <span
            className={`absolute bottom-0 left-0 h-0.5 bg-museum-gold transition-all duration-300 ${
              isActive(link.href)
                ? "w-full"
                : "w-0 group-hover:w-full"
            }`}
          />
        </Link>
      ))}
    </nav>
  );
}
