import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface QuestionCardProps {
  question: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  tags?: string[];
  children: React.ReactNode;
  defaultOpen?: boolean;
  id?: string;
}

const difficultyStyles = {
  easy: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
  medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
  hard: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
};

export function QuestionCard({ question, difficulty, tags = [], children, defaultOpen = false, id }: QuestionCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div id={id} className="my-4 rounded-xl border border-[var(--border)] bg-[var(--surface-1)] overflow-hidden transition-all duration-200 hover:border-[var(--border-strong)]">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-start gap-4 px-5 py-4 text-left hover:bg-[var(--surface-2)] transition-colors"
        aria-expanded={open}
      >
        <ChevronDown
          size={18}
          className={cn('mt-0.5 shrink-0 text-[var(--text-muted)] transition-transform duration-200', open && 'rotate-180')}
        />
        <div className="flex-1 min-w-0">
          <span className="font-semibold text-[var(--text-primary)] leading-snug">{question}</span>
          {(difficulty || tags.length > 0) && (
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              {difficulty && (
                <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium capitalize', difficultyStyles[difficulty])}>
                  {difficulty}
                </span>
              )}
              {tags.map(tag => (
                <span key={tag} className="rounded-full bg-[var(--surface-2)] px-2 py-0.5 text-xs text-[var(--text-muted)]">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </button>
      {open && (
        <div className="border-t border-[var(--border)] px-5 py-5 prose-content animate-slide-up">
          {children}
        </div>
      )}
    </div>
  );
}
