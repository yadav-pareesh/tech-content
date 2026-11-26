import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Hash, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buildSearchIndex } from '@/lib/search';
import Fuse from 'fuse.js';
import type { SearchResult } from '@/types/content';
import { useStudy } from '@/features/learning/hooks/useStudy';

const index = buildSearchIndex();
const fuse = new Fuse(index, {
  keys: ['title', 'description', 'category', 'tags'],
  threshold: 0.4,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
});

interface SearchPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function SearchPalette({ open, onClose }: SearchPaletteProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { state } = useStudy();

  useEffect(() => {
    if (open) {
      setQuery('');
      setResults([]);
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const hits = fuse.search(query).map(r => r.item);
    setResults(hits.slice(0, 8));
    setSelected(0);
  }, [query]);

  const goTo = useCallback((path: string) => {
    navigate(path);
    onClose();
  }, [navigate, onClose]);

  const handleKey = useCallback((e: React.KeyboardEvent) => {
    const list = results.length > 0 ? results : [];
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, list.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
    if (e.key === 'Enter' && list[selected]) goTo(list[selected].path);
    if (e.key === 'Escape') onClose();
  }, [results, selected, goTo, onClose]);

  // Recently viewed
  const recent = state.recentlyViewed.slice(0, 5).map(entry => {
    const result = index.find(r => r.path === entry.path);
    return result ?? null;
  }).filter(Boolean) as SearchResult[];

  const showRecent = !query && recent.length > 0;
  const displayList = query ? results : showRecent ? recent : index.slice(0, 6);

  if (!open) return null;

  const categoryColor: Record<string, string> = {
    'JavaScript': 'text-yellow-600 dark:text-yellow-400',
    'React': 'text-sky-500',
    'Next.js': 'text-emerald-600 dark:text-emerald-400',
    'State Management': 'text-pink-600 dark:text-pink-400',
    'API Integration': 'text-cyan-600 dark:text-cyan-400',
    'Web Performance': 'text-orange-600 dark:text-orange-400',
    'Testing & QA': 'text-green-600 dark:text-green-400',
    'TypeScript': 'text-blue-600 dark:text-blue-400',
    'DSA': 'text-purple-600 dark:text-purple-400',
    'System Design': 'text-indigo-600 dark:text-indigo-400',
    'Projects & HR': 'text-amber-600 dark:text-amber-400',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-xl rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] shadow-2xl animate-slide-up overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3.5">
          <Search size={18} className="shrink-0 text-[var(--text-muted)]" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Search topics, questions, keywords..."
            className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-[var(--text-muted)] hover:text-[var(--text-secondary)]">
              <X size={16} />
            </button>
          )}
          <kbd className="rounded border border-[var(--border)] bg-[var(--surface-2)] px-1.5 py-0.5 text-[10px] font-mono text-[var(--text-muted)]">ESC</kbd>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto">
          {!query && (
            <p className="px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
              {showRecent ? 'Recently Viewed' : 'All Topics'}
            </p>
          )}
          {query && results.length === 0 && (
            <div className="flex flex-col items-center py-12 text-[var(--text-muted)]">
              <Search size={32} className="mb-3 opacity-30" />
              <p className="text-sm">No results for "{query}"</p>
            </div>
          )}
          {displayList.map((result, i) => (
            <button
              key={result.id}
              onClick={() => goTo(result.path)}
              className={cn(
                'flex w-full items-center gap-3 px-4 py-3 text-left transition-colors',
                i === selected ? 'bg-brand-500/10' : 'hover:bg-[var(--surface-2)]'
              )}
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-2)]">
                {showRecent && !query ? <Clock size={14} className="text-[var(--text-muted)]" /> : <Hash size={14} className="text-[var(--text-muted)]" />}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text-primary)] truncate">{result.title}</p>
                <p className={cn('text-xs font-medium', categoryColor[result.category] ?? 'text-[var(--text-muted)]')}>
                  {result.category}
                </p>
              </div>
              <ArrowRight size={14} className="shrink-0 text-[var(--text-muted)] opacity-0 group-hover:opacity-100" />
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--border)] px-4 py-2.5 flex items-center gap-4">
          <span className="text-[10px] text-[var(--text-muted)]">
            <kbd className="rounded border border-[var(--border)] bg-[var(--surface-2)] px-1 font-mono">↑↓</kbd> navigate
          </span>
          <span className="text-[10px] text-[var(--text-muted)]">
            <kbd className="rounded border border-[var(--border)] bg-[var(--surface-2)] px-1 font-mono">↵</kbd> open
          </span>
          <span className="ml-auto text-[10px] text-[var(--text-muted)]">
            {index.length} topics indexed
          </span>
        </div>
      </div>
    </div>
  );
}
