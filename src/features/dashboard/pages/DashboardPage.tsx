import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudy } from '@/features/learning/hooks/useStudy';
import { navigation } from '@/data/navigation';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import {
  TrendingUp, BookOpen, CheckCircle, Clock, ArrowRight,
  RotateCcw, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';

function StatCard({ label, value, icon, color }: { label: string; value: string | number; icon: React.ReactNode; color: string }) {
  return (
    <div className="card flex items-center gap-4">
      <div className={cn('flex size-11 items-center justify-center rounded-xl', color)}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-[var(--text-primary)]">{value}</p>
        <p className="text-sm text-[var(--text-muted)]">{label}</p>
      </div>
    </div>
  );
}

export function DashboardPage() {
  const { state, resetAll } = useStudy();
  const [resetOpen, setResetOpen] = useState(false);

  const totalTopics = navigation.reduce((acc, cat) => acc + cat.items.length, 0);
  const completedTopics = state.completed.length;
  const overallPct = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  const getIcon = (name: string) => {
    const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[name];
    return Icon ? <Icon size={20} /> : <BookOpen size={20} />;
  };

  const continueLink = state.lastVisited
    ? navigation.flatMap(c => c.items).find(i => i.path === state.lastVisited)
    : null;

  const recentItems = state.recentlyViewed
    .slice(0, 4)
    .map(entry => {
      const item = navigation.flatMap(c =>
        c.items.map(i => ({ ...i, categoryLabel: c.label, categoryColor: c.color }))
      ).find(i => i.path === entry.path);
      return item ? { ...item, visitedAt: entry.visitedAt } : null;
    })
    .filter(Boolean);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 lg:px-10">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 to-purple-700 p-8 text-white">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
          <div className="relative z-10">
            <p className="text-brand-200 text-sm font-medium mb-2">Welcome back 👋</p>
            <h1 className="text-3xl font-bold mb-2">Ready to ace your interview?</h1>
            <p className="text-brand-100 text-base mb-6 max-w-lg">
              You've completed {completedTopics} of {totalTopics} topics. Keep up the momentum!
            </p>
            <div className="flex flex-wrap items-center gap-4">
              {continueLink ? (
                <Link
                  to={continueLink.path}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50 transition-colors"
                >
                  Continue: {continueLink.label} <ArrowRight size={16} />
                </Link>
              ) : (
                <Link
                  to="/learn/javascript/fundamentals"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50 transition-colors"
                >
                  Start Learning <ArrowRight size={16} />
                </Link>
              )}
              {/* Progress bar */}
              <div className="flex items-center gap-3 text-sm">
                <div className="w-32 h-2 rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-white transition-all duration-700"
                    style={{ width: `${overallPct}%` }}
                  />
                </div>
                <span className="font-semibold">{overallPct}%</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
      >
        <StatCard label="Total Topics" value={totalTopics} icon={<BookOpen size={20} />} color="bg-blue-500/10 text-blue-500" />
        <StatCard label="Completed" value={completedTopics} icon={<CheckCircle size={20} />} color="bg-emerald-500/10 text-emerald-500" />
        <StatCard label="Bookmarks" value={state.bookmarks.length} icon={<TrendingUp size={20} />} color="bg-amber-500/10 text-amber-500" />
        <StatCard label="Progress" value={`${overallPct}%`} icon={<TrendingUp size={20} />} color="bg-brand-500/10 text-brand-500" />
      </motion.div>

      {/* Category progress */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mb-10"
      >
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Topics Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {navigation.map((cat, i) => {
            const done = cat.items.filter(item => state.completed.includes(item.path)).length;
            const pct = cat.items.length > 0 ? Math.round((done / cat.items.length) * 100) : 0;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                className="card group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span style={{ color: cat.color }} className="shrink-0">
                    {getIcon(cat.icon)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[var(--text-primary)]">{cat.label}</h3>
                    <p className="text-xs text-[var(--text-muted)]">{done}/{cat.items.length} topics</p>
                  </div>
                  <span className={cn(
                    'text-sm font-semibold',
                    pct === 100 ? 'text-emerald-500' : 'text-[var(--text-muted)]'
                  )}>{pct}%</span>
                </div>
                <div className="mb-4 h-1.5 rounded-full bg-[var(--surface-3)]">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, backgroundColor: cat.color }}
                  />
                </div>
                <div className="space-y-1">
                  {cat.items.slice(0, 3).map(item => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      <span className={cn(
                        'size-1.5 rounded-full shrink-0',
                        state.completed.includes(item.path) ? 'bg-emerald-500' : 'bg-[var(--border-strong)]'
                      )} />
                      {item.label}
                    </Link>
                  ))}
                  {cat.items.length > 3 && (
                    <Link
                      to={cat.items[3].path}
                      className="flex items-center gap-1 pl-4 text-xs text-brand-500 hover:text-brand-600 transition-colors"
                    >
                      +{cat.items.length - 3} more <ChevronRight size={12} />
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Recently viewed */}
      {recentItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Recently Viewed</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {recentItems.map((item) => item && (
              <Link
                key={item.path}
                to={item.path}
                className="card group hover:border-brand-500/40 cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={13} className="text-[var(--text-muted)]" />
                  <span className="text-xs text-[var(--text-muted)] truncate">{item.categoryLabel}</span>
                </div>
                <p className="text-sm font-medium text-[var(--text-primary)] group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors truncate">{item.label}</p>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* Reset progress */}
      <div className="mt-12 flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          icon={<RotateCcw size={14} />}
          onClick={() => setResetOpen(true)}
          className="text-[var(--text-muted)] hover:text-red-500"
        >
          Reset Progress
        </Button>
      </div>

      <Dialog
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        title="Reset all progress?"
        description="This will clear all completed topics, bookmarks, and recently viewed history. This action cannot be undone."
      >
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setResetOpen(false)}>Cancel</Button>
          <Button
            variant="danger"
            onClick={() => { resetAll(); setResetOpen(false); }}
            icon={<RotateCcw size={14} />}
          >
            Reset Everything
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
