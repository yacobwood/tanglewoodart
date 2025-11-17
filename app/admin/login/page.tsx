'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'Invalid password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-museum-dark flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-museum-gold mb-2">
            Admin Access
          </h1>
          <p className="text-museum-slate font-sans">
            Enter your password to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <Input
              type="password"
              label="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error}
              placeholder="Enter admin password"
              required
              autoFocus
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
            >
              Sign In
            </Button>
          </div>
        </form>

        <div className="text-center">
          <a
            href="/"
            className="text-museum-slate hover:text-museum-gold transition-colors text-sm font-sans"
          >
            Back to Gallery
          </a>
        </div>
      </div>
    </div>
  );
}
