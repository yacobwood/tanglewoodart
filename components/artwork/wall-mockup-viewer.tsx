'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Artwork } from '@/lib/artworks';

interface WallMockupViewerProps {
  artwork: Artwork;
}

const ROOM_BACKGROUNDS = [
  {
    id: 'modern-living',
    name: 'Modern Living Room',
    image: '/room-mockups/modern-living.jpg',
    artworkPosition: { x: '50%', y: '45%', scale: 0.35 },
  },
  {
    id: 'minimal-gallery',
    name: 'Minimal Gallery Wall',
    image: '/room-mockups/minimal-gallery.jpg',
    artworkPosition: { x: '50%', y: '40%', scale: 0.4 },
  },
];

export default function WallMockupViewer({ artwork }: WallMockupViewerProps) {
  const [selectedRoom, setSelectedRoom] = useState(ROOM_BACKGROUNDS[0]);

  return (
    <div className="space-y-4 rounded-lg border border-museum-slate bg-museum-charcoal/30 p-6">
      <div className="space-y-2">
        <h3 className="font-serif text-xl font-bold text-museum-cream">
          Visualize in Your Space
        </h3>
        <p className="text-sm text-museum-cream/70">
          See how this artwork would look in different settings
        </p>
      </div>

      {/* Room Selector */}
      <div className="flex gap-2">
        {ROOM_BACKGROUNDS.map((room) => (
          <button
            key={room.id}
            onClick={() => setSelectedRoom(room)}
            className={`flex-1 rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${
              selectedRoom.id === room.id
                ? 'border-museum-gold bg-museum-gold/10 text-museum-gold'
                : 'border-museum-slate text-museum-cream hover:border-museum-gold/50 hover:text-museum-gold'
            }`}
          >
            {room.name}
          </button>
        ))}
      </div>

      {/* Mockup Display */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
        {/* Room background */}
        <Image
          src={selectedRoom.image}
          alt={selectedRoom.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
        />

        {/* Artwork overlay */}
        <div
          className="absolute"
          style={{
            left: selectedRoom.artworkPosition.x,
            top: selectedRoom.artworkPosition.y,
            transform: `translate(-50%, -50%) scale(${selectedRoom.artworkPosition.scale})`,
          }}
        >
          <div className="relative aspect-[4/5] w-64 overflow-hidden rounded-sm shadow-2xl">
            <Image
              src={artwork.images[0]?.url || ''}
              alt={artwork.images[0]?.alt || artwork.title}
              fill
              className="object-cover"
              sizes="256px"
            />
            {/* Frame effect */}
            <div className="absolute inset-0 border-8 border-white shadow-lg" />
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-museum-cream/50">
        Visualization is for illustrative purposes only. Actual size and appearance may vary.
      </p>
    </div>
  );
}
