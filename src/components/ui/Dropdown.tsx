import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, ChevronDown } from 'lucide-react';

interface DropdownItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface DropdownProps {
  items: DropdownItem[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function Dropdown({ items, value, onChange, placeholder = 'Select...', className }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selected = items.find(i => i.value === value);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-1)] px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--surface-2)] transition-colors"
      >
        <span className="flex items-center gap-2">
          {selected?.icon}
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown size={14} className={cn('transition-transform text-[var(--text-muted)]', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-20 min-w-full rounded-xl border border-[var(--border)] bg-[var(--surface-1)] py-1 shadow-xl animate-slide-up">
          {items.map(item => (
            <button
              key={item.value}
              onClick={() => { onChange(item.value); setOpen(false); }}
              className="flex w-full items-center justify-between gap-2 px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)] transition-colors"
            >
              <span className="flex items-center gap-2">{item.icon}{item.label}</span>
              {item.value === value && <Check size={14} className="text-brand-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
