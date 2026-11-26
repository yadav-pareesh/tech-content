import React from 'react';
import { CodeBlock } from '@/components/content/CodeBlock';
import { MermaidDiagram } from '@/components/content/MermaidDiagram';
import { Callout } from '@/components/content/Callout';
import { QuestionCard } from '@/components/content/QuestionCard';

// MDX component mapping — shared across all content
export const mdxComponents = {
  // Override default HTML elements
  pre: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  code: ({ className, children }: { className?: string; children?: React.ReactNode }) => {
    const match = /language-(\w+)/.exec(className ?? '');
    const code = String(children ?? '').replace(/\n$/, '');

    if (match) {
      return <CodeBlock code={code} language={match[1]} />;
    }
    return (
      <code className="bg-[var(--surface-2)] text-brand-600 dark:text-brand-400 px-1.5 py-0.5 rounded text-[0.875em] font-mono">
        {children}
      </code>
    );
  },
  // Custom components
  CodeBlock,
  MermaidDiagram,
  Callout,
  QuestionCard,

  // Typography helpers
  Lead: ({ children }: { children: React.ReactNode }) => (
    <p className="text-lg text-[var(--text-secondary)] leading-8 mb-6 font-light">{children}</p>
  ),
  KeyPoint: ({ children }: { children: React.ReactNode }) => (
    <div className="my-4 flex gap-3 rounded-xl border-l-4 border-brand-500 bg-brand-500/5 px-4 py-3">
      <span className="text-brand-500 font-bold text-sm mt-0.5">★</span>
      <div className="text-sm text-[var(--text-secondary)] [&>p]:mb-0">{children}</div>
    </div>
  ),
  InterviewTip: ({ children }: { children: React.ReactNode }) => (
    <div className="my-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/20 p-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">💡 Interview Tip</p>
      <div className="text-sm text-[var(--text-secondary)] [&>p]:mb-0">{children}</div>
    </div>
  ),
  CommonMistake: ({ children }: { children: React.ReactNode }) => (
    <div className="my-4 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-red-600 dark:text-red-400 mb-2">⚠ Common Mistake</p>
      <div className="text-sm text-[var(--text-secondary)] [&>p]:mb-0">{children}</div>
    </div>
  ),
};
