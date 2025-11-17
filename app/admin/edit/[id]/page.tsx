import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/admin-auth';
import { getArtworkById } from '@/lib/db';
import EditArtworkForm from './edit-artwork-form';

interface EditArtworkPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditArtworkPage({ params }: EditArtworkPageProps) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect('/admin/login');
  }

  const { id } = await params;
  const artwork = await getArtworkById(id);

  if (!artwork) {
    redirect('/admin');
  }

  return <EditArtworkForm artwork={artwork} />;
}
