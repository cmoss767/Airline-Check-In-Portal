import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-brand-text text-center p-4">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold text-brand-blue mb-4">404</h1>
        <h2 className="text-2xl font-bold text-foreground mb-4">Page Not Found</h2>
        <p className="mb-8">
          Sorry, we couldn’t find the page you’re looking for. It might have been moved, deleted, or maybe you just
          mistyped the URL.
        </p>
        <Link href="/" className="px-6 py-2 bg-brand-blue text-white font-semibold rounded-md transition-colors">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
