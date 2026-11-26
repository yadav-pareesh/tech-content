import React from 'react';
import { cn } from '@/lib/utils';
import { Info, Lightbulb, AlertTriangle, XCircle, Star } from 'lucide-react';

type CalloutType = 'note' | 'tip' | 'warning' | 'danger' | 'important';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const configs: Record<CalloutType, { icon: React.ReactNode; color: string; bg: string; border: string }> = {
  note: {
    icon: <Info size={16} />,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-800',
  },
  tip: {
    icon: <Lightbulb size={16} />,
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-emerald-200 dark:border-emerald-800',
  },
  warning: {
    icon: <AlertTriangle size={16} />,
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
  },
  danger: {
    icon: <XCircle size={16} />,
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-200 dark:border-red-800',
  },
  important: {
    icon: <Star size={16} />,
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    border: 'border-purple-200 dark:border-purple-800',
  },
};

export function Callout({ type = 'note', title, children }: CalloutProps) {
  const config = configs[type];
  return (
    <div className={cn('my-5 rounded-xl border p-4', config.bg, config.border)}>
      <div className={cn('flex items-center gap-2 font-semibold text-sm mb-2', config.color)}>
        {config.icon}
        <span>{title ?? type.charAt(0).toUpperCase() + type.slice(1)}</span>
      </div>
      <div className="text-sm text-[var(--text-secondary)] [&>p]:mb-2 [&>p:last-child]:mb-0 [&>ul]:list-disc [&>ul]:pl-4 [&>ul]:space-y-1">
        {children}
      </div>
    </div>
  );
}
