import type { NavCategory } from '@/types/content';

export const navigation: NavCategory[] = [
  {
    id: 'javascript',
    label: 'JavaScript',
    icon: 'Zap',
    color: '#f7df1e',
    items: [
      { label: 'Fundamentals', slug: 'fundamentals', path: '/learn/javascript/fundamentals' },
      { label: 'Closures & Scope', slug: 'closures', path: '/learn/javascript/closures' },
      { label: 'Promises & Async', slug: 'promises', path: '/learn/javascript/promises' },
      { label: 'Event Loop', slug: 'event-loop', path: '/learn/javascript/event-loop' },
    ],
  },
  {
    id: 'react',
    label: 'React',
    icon: 'Atom',
    color: '#61dafb',
    items: [
      { label: 'Fundamentals', slug: 'fundamentals', path: '/learn/react/fundamentals' },
      { label: 'Hooks In Depth', slug: 'hooks', path: '/learn/react/hooks' },
      { label: 'Performance', slug: 'performance', path: '/learn/react/performance' },
      { label: 'Practical Scenarios', slug: 'scenarios', path: '/learn/react/scenarios' },
    ],
  },
  {
    id: 'nextjs',
    label: 'Next.js',
    icon: 'Layers',
    color: '#10b981',
    items: [
      { label: 'Fundamentals & Rendering', slug: 'fundamentals', path: '/learn/nextjs/fundamentals' },
      { label: 'Routing & Data Fetching', slug: 'routing-and-data', path: '/learn/nextjs/routing-and-data' },
    ],
  },
  {
    id: 'state-management',
    label: 'State Management',
    icon: 'Database',
    color: '#ec4899',
    items: [
      { label: 'Redux, Context & Zustand', slug: 'redux-and-alternatives', path: '/learn/state-management/redux-and-alternatives' },
    ],
  },
  {
    id: 'api-integration',
    label: 'API Integration',
    icon: 'Globe',
    color: '#06b6d4',
    items: [
      { label: 'REST, GraphQL & Auth', slug: 'rest-graphql-auth', path: '/learn/api-integration/rest-graphql-auth' },
    ],
  },
  {
    id: 'performance',
    label: 'Web Performance',
    icon: 'Gauge',
    color: '#f97316',
    items: [
      { label: 'Core Web Vitals & Bundles', slug: 'web-vitals', path: '/learn/performance/web-vitals' },
    ],
  },
  {
    id: 'testing',
    label: 'Testing & QA',
    icon: 'ShieldCheck',
    color: '#22c55e',
    items: [
      { label: 'Testing Fundamentals', slug: 'fundamentals', path: '/learn/testing/fundamentals' },
    ],
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    icon: 'FileCode',
    color: '#3178c6',
    items: [
      { label: 'Fundamentals', slug: 'fundamentals', path: '/learn/typescript/fundamentals' },
    ],
  },
  {
    id: 'dsa',
    label: 'DSA',
    icon: 'GitBranch',
    color: '#a855f7',
    items: [
      { label: 'Arrays', slug: 'arrays', path: '/learn/dsa/arrays' },
      { label: 'Strings', slug: 'strings', path: '/learn/dsa/strings' },
    ],
  },
  {
    id: 'system-design',
    label: 'System Design',
    icon: 'LayoutDashboard',
    color: '#6366f1',
    items: [
      { label: 'Live Sports & Dashboards', slug: 'live-dashboards', path: '/learn/system-design/live-dashboards' },
    ],
  },
  {
    id: 'behavioral',
    label: 'Projects & HR',
    icon: 'Users',
    color: '#eab308',
    items: [
      { label: 'Project Architecture & HR', slug: 'projects-and-hr', path: '/learn/behavioral/projects-and-hr' },
    ],
  },
];
