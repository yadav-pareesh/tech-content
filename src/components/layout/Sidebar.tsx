import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronRight, BookOpen, Home, Bookmark, BarChart2 } from 'lucide-react';
import { navigation } from '@/data/navigation';
import { useStudy } from '@/features/learning/hooks/useStudy';
import * as Icons from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const { state } = useStudy();
  const [expanded, setExpanded] = useState<string[]>(() => {
    // Auto-expand category of current path
    const active = navigation.find(cat => cat.items.some(i => i.path === location.pathname));
    return active ? [active.id] : navigation.map(c => c.id);
  });

  const toggle = (id: string) => {
    setExpanded(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  // Close sidebar on route change (mobile)
  useEffect(() => { onClose(); }, [location.pathname]);

  const getIcon = (name: string) => {
    const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[name];
    return Icon ? <Icon size={16} /> : <BookOpen size={16} />;
  };

  const categoryProgress = (categoryId: string) => {
    const cat = navigation.find(c => c.id === categoryId);
    if (!cat) return 0;
    const total = cat.items.length;
    const done = cat.items.filter(i => state.completed.includes(i.path)).length;
    return total > 0 ? Math.round((done / total) * 100) : 0;
  };

  return (
    <>
      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          'fixed left-0 top-14 z-40 h-[calc(100vh-3.5rem)] w-64 flex-col',
          'border-r border-[var(--border)] bg-[var(--surface-1)]',
          'transition-transform duration-300 ease-in-out',
          'flex overflow-hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0 lg:sticky lg:top-14 lg:flex lg:shrink-0'
        )}
        aria-label="Topic navigation"
      >
        <div className="flex-1 overflow-y-auto py-4 px-3">
          {/* Primary pages (mobile) */}
          <div className="mb-3 pb-3 border-b border-[var(--border)] md:hidden space-y-0.5">
            {[
              { to: '/', icon: <Home size={16} />, label: 'Dashboard' },
              { to: '/bookmarks', icon: <Bookmark size={16} />, label: 'Bookmarks', count: state.bookmarks.length },
              { to: '/progress', icon: <BarChart2 size={16} />, label: 'Progress' },
            ].map(link => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.icon}
                  <span className="flex-1">{link.label}</span>
                  {typeof link.count === 'number' && link.count > 0 && (
                    <span className="rounded-full bg-[var(--surface-2)] px-2 py-0.5 text-xs text-[var(--text-muted)]">
                      {link.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <nav>
            {navigation.map((cat) => {
              const isExpanded = expanded.includes(cat.id);
              const pct = categoryProgress(cat.id);

              return (
                <div key={cat.id} className="mb-1">
                  <button
                    onClick={() => toggle(cat.id)}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-2)] transition-colors"
                    aria-expanded={isExpanded}
                  >
                    <span style={{ color: cat.color }} className="shrink-0">
                      {getIcon(cat.icon)}
                    </span>
                    <span className="flex-1 text-left">{cat.label}</span>
                    {pct > 0 && (
                      <span className="text-xs text-[var(--text-muted)]">{pct}%</span>
                    )}
                    <ChevronRight
                      size={14}
                      className={cn('text-[var(--text-muted)] transition-transform duration-200', isExpanded && 'rotate-90')}
                    />
                  </button>

                  {/* Progress bar */}
                  {pct > 0 && (
                    <div className="mx-3 mb-1 h-0.5 rounded-full bg-[var(--surface-3)]">
                      <div
                        className="h-full rounded-full bg-brand-500 transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  )}

                  {isExpanded && (
                    <ul className="mt-0.5 space-y-0.5 pl-2">
                      {cat.items.map((item) => {
                        const isActive = location.pathname === item.path;
                        const isDone = state.completed.includes(item.path);

                        return (
                          <li key={item.path}>
                            <Link
                              to={item.path}
                              className={cn(
                                'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all duration-150',
                                isActive
                                  ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 font-medium'
                                  : 'text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]'
                              )}
                              aria-current={isActive ? 'page' : undefined}
                            >
                              <span className={cn(
                                'size-1.5 rounded-full shrink-0',
                                isDone ? 'bg-emerald-500' : isActive ? 'bg-brand-500' : 'bg-[var(--border-strong)]'
                              )} />
                              <span className="flex-1 truncate">{item.label}</span>
                              {isActive && (
                                <span className="size-1.5 rounded-full bg-brand-500 animate-pulse" />
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--border)] px-4 py-3">
          <p className="text-xs text-[var(--text-muted)]">
            {state.completed.length} of {navigation.reduce((acc, c) => acc + c.items.length, 0)} topics completed
          </p>
        </div>
      </aside>
    </>
  );
}
