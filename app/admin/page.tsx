import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/admin-auth';
import { readArtworks } from '@/lib/db';
import AdminDashboard from './admin-dashboard';

export default async function AdminPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect('/admin/login');
  }

  const artworks = await readArtworks();

  return <AdminDashboard artworks={artworks} />;
}
