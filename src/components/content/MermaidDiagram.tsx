import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

export function MermaidDiagram({ chart, className }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const id = useRef(`mermaid-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    let cancelled = false;
    async function render() {
      try {
        const mermaid = (await import('mermaid')).default;
        const isDark = document.documentElement.classList.contains('dark');
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? 'dark' : 'default',
          securityLevel: 'loose',
          fontFamily: 'Inter, system-ui, sans-serif',
          themeVariables: isDark
            ? { primaryColor: '#6366f1', primaryTextColor: '#f0f0ff', lineColor: '#4a4a6a', background: '#12121e' }
            : { primaryColor: '#6366f1', primaryTextColor: '#0f0f1a', lineColor: '#8080a0', background: '#f8f9ff' },
        });
        const { svg } = await mermaid.render(id.current, chart);
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
          setError(null);
        }
      } catch (e) {
        if (!cancelled) setError(String(e));
      }
    }
    render();
    return () => { cancelled = true; };
  }, [chart]);

  if (error) {
    return (
      <div className="rounded-lg border border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/30 p-4 text-sm text-red-600 dark:text-red-400">
        Failed to render diagram: {error}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        'my-5 flex justify-center overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-6',
        '[&_svg]:max-w-full',
        className
      )}
    />
  );
}
