import React, { lazy, Suspense, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { mdxComponents } from '@/lib/mdx';
import { navigation } from '@/data/navigation';
import { TableOfContents } from '@/components/layout/TableOfContents';
import { useStudy } from '../hooks/useStudy';
import { Button } from '@/components/ui/Button';
import { CheckCircle, Circle, Bookmark, BookmarkCheck, ChevronLeft, ChevronRight, PanelRightClose, PanelRightOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyComponent = React.LazyExoticComponent<React.ComponentType<any>>;

// Lazy-load all MDX files
const contentModules: Record<string, AnyComponent> = {
  'javascript/fundamentals': lazy(() => import('@/content/javascript/fundamentals.mdx')),
  'javascript/closures': lazy(() => import('@/content/javascript/closures.mdx')),
  'javascript/promises': lazy(() => import('@/content/javascript/promises.mdx')),
  'javascript/event-loop': lazy(() => import('@/content/javascript/event-loop.mdx')),
  'react/fundamentals': lazy(() => import('@/content/react/fundamentals.mdx')),
  'react/hooks': lazy(() => import('@/content/react/hooks.mdx')),
  'react/performance': lazy(() => import('@/content/react/performance.mdx')),
  'react/scenarios': lazy(() => import('@/content/react/scenarios.mdx')),
  'nextjs/fundamentals': lazy(() => import('@/content/nextjs/fundamentals.mdx')),
  'nextjs/routing-and-data': lazy(() => import('@/content/nextjs/routing-and-data.mdx')),
  'state-management/redux-and-alternatives': lazy(() => import('@/content/state-management/redux-and-alternatives.mdx')),
  'api-integration/rest-graphql-auth': lazy(() => import('@/content/api-integration/rest-graphql-auth.mdx')),
  'performance/web-vitals': lazy(() => import('@/content/performance/web-vitals.mdx')),
  'testing/fundamentals': lazy(() => import('@/content/testing/fundamentals.mdx')),
  'typescript/fundamentals': lazy(() => import('@/content/typescript/fundamentals.mdx')),
  'dsa/arrays': lazy(() => import('@/content/dsa/arrays.mdx')),
  'dsa/strings': lazy(() => import('@/content/dsa/strings.mdx')),
  'system-design/live-dashboards': lazy(() => import('@/content/system-design/live-dashboards.mdx')),
  'behavioral/projects-and-hr': lazy(() => import('@/content/behavioral/projects-and-hr.mdx')),
};

function ReadingProgress() {
  const [progress, setProgress] = React.useState(0);
  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const pct = scrollHeight <= clientHeight ? 100 : (scrollTop / (scrollHeight - clientHeight)) * 100;
      setProgress(Math.min(100, Math.round(pct)));
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <div
      className="reading-progress"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}

function ContentSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-8">
      <div className="h-8 bg-[var(--surface-2)] rounded-lg w-3/4" />
      <div className="h-4 bg-[var(--surface-2)] rounded w-full" />
      <div className="h-4 bg-[var(--surface-2)] rounded w-5/6" />
      <div className="h-32 bg-[var(--surface-2)] rounded-xl" />
      <div className="h-4 bg-[var(--surface-2)] rounded w-full" />
      <div className="h-4 bg-[var(--surface-2)] rounded w-4/5" />
    </div>
  );
}

export function LearningPage() {
  const { category = '', slug = '' } = useParams<{ category: string; slug: string }>();
  const navigate = useNavigate();
  const { toggleCompleted, toggleBookmark, recordVisit, isCompleted, isBookmarked } = useStudy();
  const contentRef = useRef<HTMLElement>(null);
  const [tocCollapsed, setTocCollapsed] = React.useState(false);
  const path = `/learn/${category}/${slug}`;
  const contentKey = `${category}/${slug}`;
  const Content = contentModules[contentKey];

  // Record visit
  useEffect(() => {
    if (contentKey in contentModules) recordVisit(path);
  }, [path, contentKey, recordVisit]);

  // Find nav context
  const allItems = navigation.flatMap(cat =>
    cat.items.map(item => ({ ...item, categoryId: cat.id, categoryLabel: cat.label }))
  );
  const currentIndex = allItems.findIndex(i => i.path === path);
  const prev = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const next = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;
  const current = allItems[currentIndex];

  if (!Content) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <p className="text-6xl mb-4">🔍</p>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Topic Not Found</h1>
        <p className="text-[var(--text-secondary)] mb-6">The topic "{category}/{slug}" doesn't exist yet.</p>
        <Button variant="primary" onClick={() => navigate('/')}>Back to Dashboard</Button>
      </div>
    );
  }

  const completed = isCompleted(path);
  const bookmarked = isBookmarked(path);

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <ReadingProgress />

      {/* Main content */}
      <article className="flex-1 min-w-0" ref={contentRef}>
        {/* Page header */}
        <div className="flex items-start justify-between gap-2 border-b border-[var(--border)] px-6 py-3">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              {current?.label ?? slug}
            </h1>
            {current && (
              <p className="text-xs font-medium uppercase tracking-widest text-[var(--text-muted)] mb-1.5">
                {current.categoryLabel}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => toggleBookmark(path)}
              className={cn(
                'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all',
                bookmarked
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                  : 'text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]'
              )}
              aria-pressed={bookmarked}
            >
              {bookmarked ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
              <span className="hidden sm:inline">{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>
            <button
              onClick={() => toggleCompleted(path)}
              className={cn(
                'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all',
                completed
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]'
              )}
              aria-pressed={completed}
            >
              {completed ? <CheckCircle size={15} /> : <Circle size={15} />}
              <span className="hidden sm:inline">{completed ? 'Completed' : 'Mark done'}</span>
            </button>
            <button
              onClick={() => setTocCollapsed(prev => !prev)}
              className="hidden xl:flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)] transition-all"
              aria-pressed={!tocCollapsed}
              aria-label={tocCollapsed ? 'Show table of contents' : 'Hide table of contents'}
              title={tocCollapsed ? 'Show table of contents' : 'Hide table of contents'}
            >
              {tocCollapsed ? <PanelRightOpen size={15} /> : <PanelRightClose size={15} />}
            </button>
          </div>
        </div>

        {/* MDX content */}
        <div className="px-6 py-8 prose-content max-w-4xl">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <MDXProvider components={mdxComponents as any}>
            <Suspense fallback={<ContentSkeleton />}>
              <Content />
            </Suspense>
          </MDXProvider>
        </div>

        {/* Prev / Next navigation */}
        <div className="border-t border-[var(--border)] px-6 py-6">
          <div className="flex items-center justify-between gap-4">
            {prev ? (
              <Link
                to={prev.path}
                className="group flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-1)] px-4 py-3 text-sm hover:border-brand-500/50 hover:bg-[var(--surface-2)] transition-all max-w-[48%]"
              >
                <ChevronLeft size={16} className="text-[var(--text-muted)] group-hover:text-brand-500 transition-colors shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-[var(--text-muted)]">Previous</p>
                  <p className="font-medium text-[var(--text-primary)] truncate">{prev.label}</p>
                </div>
              </Link>
            ) : <div />}

            {next ? (
              <Link
                to={next.path}
                className="group flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-1)] px-4 py-3 text-sm hover:border-brand-500/50 hover:bg-[var(--surface-2)] transition-all max-w-[48%] ml-auto"
              >
                <div className="min-w-0 text-right">
                  <p className="text-xs text-[var(--text-muted)]">Next</p>
                  <p className="font-medium text-[var(--text-primary)] truncate">{next.label}</p>
                </div>
                <ChevronRight size={16} className="text-[var(--text-muted)] group-hover:text-brand-500 transition-colors shrink-0" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </article>

      {/* Table of Contents (desktop) */}
      {!tocCollapsed && (
        <aside className="hidden xl:block w-56 shrink-0 border-l border-[var(--border)] px-5 py-6">
          <TableOfContents contentRef={contentRef} />
        </aside>
      )}
    </div>
  );
}
