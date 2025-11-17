import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/admin-auth';
import { readArtworks } from '@/lib/db';
import { getHeroArtworkIds } from '@/lib/hero-images';
import HeroImagesManager from './hero-images-manager';

export default async function HeroImagesPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect('/admin/login');
  }

  const artworks = await readArtworks();
  const heroArtworkIds = getHeroArtworkIds();

  return <HeroImagesManager artworks={artworks} initialHeroIds={heroArtworkIds} />;
}
