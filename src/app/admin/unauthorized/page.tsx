import Link from 'next/link';

export default function AdminUnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-brand-text text-center p-4">
      <div className="max-w-md">
        <h1 className="text-2xl font-bold text-foreground mb-4">Admin Access Not Configured</h1>
        <p className="mb-8">
          The admin dashboard is currently unavailable because the required `ADMIN_SECRET_KEY` has not been set up on the
          server.
        </p>
        <Link href="/" className="px-6 py-2 bg-brand-blue font-semibold text-white rounded-md transition-colors">
            Go to Homepage
        </Link>
      </div>
    </div>
  );
}
