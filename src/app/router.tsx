import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { NotFoundPage } from '@/features/learning/pages/NotFoundPage';

const DashboardPage = lazy(() =>
  import('@/features/dashboard/pages/DashboardPage').then(m => ({ default: m.DashboardPage }))
);
const LearningPage = lazy(() =>
  import('@/features/learning/pages/LearningPage').then(m => ({ default: m.LearningPage }))
);
const BookmarksPage = lazy(() =>
  import('@/features/bookmarks/pages/BookmarksPage').then(m => ({ default: m.BookmarksPage }))
);
const ProgressPage = lazy(() =>
  import('@/features/progress/pages/ProgressPage').then(m => ({ default: m.ProgressPage }))
);

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="size-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: 'learn/:category/:slug',
        element: (
          <Suspense fallback={<PageLoader />}>
            <LearningPage />
          </Suspense>
        ),
      },
      {
        path: 'bookmarks',
        element: (
          <Suspense fallback={<PageLoader />}>
            <BookmarksPage />
          </Suspense>
        ),
      },
      {
        path: 'progress',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProgressPage />
          </Suspense>
        ),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} future={{ v7_startTransition: true }} />;
}
