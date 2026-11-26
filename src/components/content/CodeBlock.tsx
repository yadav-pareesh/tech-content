import { useEffect, useState, useRef } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = 'typescript', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [html, setHtml] = useState<string>('');
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    async function highlight() {
      try {
        const { codeToHtml } = await import('shiki');
        const result = await codeToHtml(code.trim(), {
          lang: language,
          themes: { light: 'github-light', dark: 'github-dark' },
          defaultColor: false,
        });
        if (mounted.current) setHtml(result);
      } catch {
        if (mounted.current) setHtml('');
      }
    }
    highlight();
    return () => { mounted.current = false; };
  }, [code, language]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="group relative my-5 rounded-xl border border-[var(--border)] bg-[var(--surface-1)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-400/70" />
            <span className="size-2.5 rounded-full bg-yellow-400/70" />
            <span className="size-2.5 rounded-full bg-green-400/70" />
          </div>
          {filename && (
            <span className="text-xs font-mono text-[var(--text-muted)]">{filename}</span>
          )}
          {!filename && language && (
            <span className="text-xs font-mono text-[var(--text-muted)] capitalize">{language}</span>
          )}
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)] transition-all opacity-0 group-hover:opacity-100"
          aria-label="Copy code"
        >
          {copied ? <><Check size={12} className="text-green-500" /> Copied</> : <><Copy size={12} /> Copy</>}
        </button>
      </div>
      {/* Code */}
      <div className="overflow-x-auto text-sm font-mono leading-6">
        {html ? (
          <div
            className="shiki-container [&_.shiki]:bg-transparent! [&_code]:block [&_code]:p-4"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre className="p-4 text-[var(--text-secondary)]">
            <code>{code.trim()}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
