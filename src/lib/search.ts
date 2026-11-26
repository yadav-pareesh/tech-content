import type { SearchResult } from '@/types/content';
import { navigation } from '@/data/navigation';

// Static content index — in a real app this would be generated at build time
// Here we build it from navigation + a small static description map
const descriptions: Record<string, string> = {
  '/learn/javascript/fundamentals': 'var let const hoisting scope types equality coercion prototype chain map filter reduce spread rest shallow deep copy debounce throttle',
  '/learn/javascript/closures': 'closure lexical scope function scope variable capture private data module pattern IIFE',
  '/learn/javascript/promises': 'promise async await then catch finally microtask queue error handling Promise.all race allSettled',
  '/learn/javascript/event-loop': 'event loop call stack microtask macrotask setTimeout setInterval requestAnimationFrame libuv',
  '/learn/react/fundamentals': 'component JSX props state virtual DOM reconciliation prop drilling context api controlled uncontrolled error boundary keys',
  '/learn/react/hooks': 'useState useEffect useCallback useMemo useRef useContext useReducer custom hooks rules of hooks async useEffect Strict Mode dependency array',
  '/learn/react/performance': 'memo React.memo useMemo useCallback code splitting lazy Suspense virtualization re-renders profiler',
  '/learn/react/scenarios': 'pagination infinite scroll IntersectionObserver search api debounce abortcontroller loading error state authentication share state unrelated components',
  '/learn/nextjs/fundamentals': 'nextjs react ssr ssg isr server components client components use client hydration seo',
  '/learn/nextjs/routing-and-data': 'app router pages router file-based dynamic routes middleware data fetching link image optimization live sports score scenario',
  '/learn/state-management/redux-and-alternatives': 'redux toolkit rtk query thunk reducer action store middleware context api zustand global state',
  '/learn/api-integration/rest-graphql-auth': 'rest graphql http methods status codes 401 403 404 500 get post put patch delete axios fetch error handling jwt access refresh token cors caching abortcontroller slow api',
  '/learn/performance/web-vitals': 'lighthouse core web vitals lcp inp cls image optimization bundle size tree shaking initial page load',
  '/learn/testing/fundamentals': 'unit testing integration testing e2e end-to-end jest cypress enzyme react testing library',
  '/learn/typescript/fundamentals': 'types interfaces generics union intersection type guards enums as const satisfies never unknown',
  '/learn/dsa/arrays': 'array two pointers sliding window prefix sum sorting binary search kadane duplicates second largest flatten nested array',
  '/learn/dsa/strings': 'string manipulation palindrome anagram substring character frequency reverse without reverse first non-repeating KMP',
  '/learn/system-design/live-dashboards': 'live sports score dashboard medal tally websockets socket.io sse polling thousands athletes filters api failures mobile',
  '/learn/behavioral/projects-and-hr': 'project architecture socket.io chatly cms bug star method hr collaboration designers backend',
};

export function buildSearchIndex(): SearchResult[] {
  const results: SearchResult[] = [];
  for (const cat of navigation) {
    for (const item of cat.items) {
      results.push({
        id: item.path,
        title: `${cat.label} — ${item.label}`,
        description: descriptions[item.path] ?? '',
        category: cat.label,
        path: item.path,
        tags: [cat.id, item.slug],
      });
    }
  }
  return results;
}
