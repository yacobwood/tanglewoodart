'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { X, ZoomIn, ZoomOut, Maximize2, Minimize2 } from 'lucide-react';
import { Artwork } from '@/lib/artworks';

interface LightboxProps {
  artwork: Artwork;
  onClose: () => void;
}

export default function Lightbox({ artwork, onClose }: LightboxProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  // Handle zoom
  const handleZoom = (direction: 'in' | 'out') => {
    setScale((prev) => {
      const newScale = direction === 'in' ? prev * 1.2 : prev / 1.2;
      return Math.max(1, Math.min(3, newScale)); // Limit between 1x and 3x
    });
  };

  // Reset zoom and position
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Handle mouse down for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsPanning(true);
      setPanStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  // Handle mouse move for panning
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning && scale > 1) {
      setPosition({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
    }
  };

  // Handle mouse up
  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Handle wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoom('in');
    } else {
      handleZoom('out');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-museum-dark/95 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Full-screen image viewer"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-lg bg-museum-charcoal/80 p-3 text-museum-cream backdrop-blur-sm transition-all duration-300 hover:bg-museum-charcoal hover:text-museum-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-museum-gold"
        aria-label="Close lightbox"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Zoom controls */}
      <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleZoom('in');
          }}
          disabled={scale >= 3}
          className="rounded-lg bg-museum-charcoal/80 p-3 text-museum-cream backdrop-blur-sm transition-all duration-300 hover:bg-museum-charcoal hover:text-museum-gold disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-museum-gold"
          aria-label="Zoom in"
        >
          <ZoomIn className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleZoom('out');
          }}
          disabled={scale <= 1}
          className="rounded-lg bg-museum-charcoal/80 p-3 text-museum-cream backdrop-blur-sm transition-all duration-300 hover:bg-museum-charcoal hover:text-museum-gold disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-museum-gold"
          aria-label="Zoom out"
        >
          <ZoomOut className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleReset();
          }}
          disabled={scale === 1 && position.x === 0 && position.y === 0}
          className="rounded-lg bg-museum-charcoal/80 p-3 text-museum-cream backdrop-blur-sm transition-all duration-300 hover:bg-museum-charcoal hover:text-museum-gold disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-museum-gold"
          aria-label="Reset zoom"
        >
          {scale > 1 ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
        </button>
      </div>

      {/* Image info */}
      <div className="absolute bottom-4 left-4 z-10 rounded-lg bg-museum-charcoal/80 px-4 py-3 backdrop-blur-sm">
        <h3 className="font-serif text-lg font-bold text-museum-cream">{artwork.title}</h3>
        <p className="text-sm text-museum-cream/70">
          {artwork.artist}, {artwork.year}
        </p>
      </div>

      {/* Zoom indicator */}
      {scale > 1 && (
        <div className="absolute bottom-4 right-4 z-10 rounded-lg bg-museum-charcoal/80 px-3 py-2 backdrop-blur-sm">
          <p className="text-sm font-medium text-museum-gold">{Math.round(scale * 100)}%</p>
        </div>
      )}

      {/* Image container */}
      <div
        ref={containerRef}
        className="relative h-full w-full overflow-hidden p-8"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{
          cursor: scale > 1 ? (isPanning ? 'grabbing' : 'grab') : 'default',
        }}
      >
        <div
          className="relative h-full w-full transition-transform duration-200 ease-out"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          }}
        >
          <Image
            src={artwork.images[0]?.url || ''}
            alt={artwork.images[0]?.alt || artwork.title}
            fill
            className="object-contain"
            sizes="100vw"
            quality={100}
            priority
          />
        </div>
      </div>

      {/* Instructions */}
      {scale === 1 && (
        <div className="absolute bottom-4 right-4 z-10 rounded-lg bg-museum-charcoal/80 px-4 py-2 backdrop-blur-sm">
          <p className="text-xs text-museum-cream/70">
            Click to zoom • Scroll to zoom • Drag to pan • ESC to close
          </p>
        </div>
      )}
    </div>
  );
}
