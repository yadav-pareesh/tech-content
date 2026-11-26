import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
      <div className="relative mb-8">
        <span className="text-[8rem] font-black text-[var(--surface-3)] select-none leading-none">404</span>
        <span className="absolute inset-0 flex items-center justify-center text-[2rem]">🤔</span>
      </div>
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-3">Page not found</h1>
      <p className="text-[var(--text-secondary)] mb-8 max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link to="/">
          <Button variant="primary" icon={<Home size={16} />}>Go home</Button>
        </Link>
        <button onClick={() => history.back()}>
          <Button variant="secondary" icon={<ArrowLeft size={16} />}>Go back</Button>
        </button>
      </div>
    </div>
  );
}
