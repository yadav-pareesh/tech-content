import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentRef: React.RefObject<HTMLElement | null>;
}

export function TableOfContents({ contentRef }: TableOfContentsProps) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [active, setActive] = useState<string>('');
  const { pathname } = useLocation();

  const extractHeadings = useCallback(() => {
    const container = contentRef.current;
    if (!container) return;
    const headings = container.querySelectorAll('h2, h3, h4');
    const extracted: TocItem[] = Array.from(headings)
      .filter(h => h.id)
      .map(h => ({
        id: h.id,
        text: h.textContent ?? '',
        level: parseInt(h.tagName[1], 10),
      }));
    setItems(extracted);
    setActive(extracted[0]?.id ?? '');
  }, [contentRef]);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    extractHeadings();

    // Observe DOM mutations so lazy-loaded MDX (<Suspense>) headings are captured after mount/navigation
    const mutationObserver = new MutationObserver(() => {
      extractHeadings();
    });

    mutationObserver.observe(container, { childList: true, subtree: true });
    return () => mutationObserver.disconnect();
  }, [contentRef, pathname, extractHeadings]);

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: '-10% 0% -80% 0%', threshold: 0 }
    );
    items.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="sticky top-20">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
        On this page
      </p>
      <ul className="space-y-0.5">
        {items.map(item => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={cn(
                'block rounded py-1 text-sm transition-colors leading-5',
                item.level === 2 ? 'pl-0' : item.level === 3 ? 'pl-3' : 'pl-6',
                active === item.id
                  ? 'text-brand-600 dark:text-brand-400 font-medium'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
