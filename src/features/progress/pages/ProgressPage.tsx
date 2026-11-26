import React from 'react';
import { Link } from 'react-router-dom';
import { useStudy } from '@/features/learning/hooks/useStudy';
import { navigation } from '@/data/navigation';
import { CheckCircle, Circle, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';

export function ProgressPage() {
  const { state, toggleCompleted } = useStudy();

  const getIcon = (name: string) => {
    const Icon = (Icons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[name];
    return Icon ? <Icon size={18} /> : <BookOpen size={18} />;
  };

  const totalTopics = navigation.reduce((acc, cat) => acc + cat.items.length, 0);
  const completedTopics = state.completed.length;
  const overallPct = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Progress</h1>
        <p className="text-[var(--text-secondary)] mt-1">Track your learning journey</p>
      </div>

      {/* Overall */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-[var(--text-primary)]">Overall Progress</h2>
            <p className="text-sm text-[var(--text-muted)]">{completedTopics} of {totalTopics} topics</p>
          </div>
          <span className="text-3xl font-bold text-brand-500">{overallPct}%</span>
        </div>
        <div className="h-3 rounded-full bg-[var(--surface-3)] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${overallPct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-purple-500"
          />
        </div>
      </motion.div>

      {/* Per category */}
      <div className="space-y-6">
        {navigation.map((cat, ci) => {
          const done = cat.items.filter(item => state.completed.includes(item.path)).length;
          const pct = cat.items.length > 0 ? Math.round((done / cat.items.length) * 100) : 0;

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: ci * 0.08 }}
              className="card"
            >
              <div className="flex items-center gap-3 mb-4">
                <span style={{ color: cat.color }}>{getIcon(cat.icon)}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-[var(--text-primary)]">{cat.label}</h3>
                    <span className="text-sm font-medium" style={{ color: cat.color }}>{done}/{cat.items.length}</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-[var(--surface-3)]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut', delay: ci * 0.08 }}
                      className="h-full rounded-full transition-all"
                      style={{ backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                {cat.items.map(item => {
                  const isCompleted = state.completed.includes(item.path);
                  return (
                    <div key={item.path} className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-[var(--surface-2)] transition-colors group">
                      <button
                        onClick={() => toggleCompleted(item.path)}
                        className={cn(
                          'shrink-0 transition-colors',
                          isCompleted ? 'text-emerald-500' : 'text-[var(--border-strong)] hover:text-emerald-500'
                        )}
                        aria-label={isCompleted ? 'Mark incomplete' : 'Mark complete'}
                      >
                        {isCompleted ? <CheckCircle size={18} /> : <Circle size={18} />}
                      </button>
                      <Link
                        to={item.path}
                        className="flex-1 text-sm text-[var(--text-secondary)] hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                      >
                        {item.label}
                      </Link>
                      {isCompleted && (
                        <span className="text-xs text-emerald-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">Done</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
