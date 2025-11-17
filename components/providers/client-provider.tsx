"use client";

/**
 * Tanglewood Art Gallery - Client Provider
 * Wraps the app for client-side only components and handles hydration
 */

import { useEffect, useState } from "react";

interface ClientProviderProps {
  children: React.ReactNode;
}

export default function ClientProvider({ children }: ClientProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering children until mounted
  // This is important for Zustand stores with localStorage persistence
  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}
