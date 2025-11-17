import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/admin-auth';
import NewArtworkForm from './new-artwork-form';

export default async function NewArtworkPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect('/admin/login');
  }

  return <NewArtworkForm />;
}
