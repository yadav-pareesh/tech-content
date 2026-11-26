import { useEffect } from 'react';

type Modifier = 'ctrl' | 'cmd' | 'shift' | 'alt';

interface Options {
  modifiers?: Modifier[];
  disabled?: boolean;
}

export function useKeyboardShortcut(
  key: string,
  callback: (e: KeyboardEvent) => void,
  options: Options = {}
) {
  const { modifiers = [], disabled = false } = options;

  useEffect(() => {
    if (disabled) return;

    const handler = (e: KeyboardEvent) => {
      const keyMatch = e.key.toLowerCase() === key.toLowerCase();
      const ctrlMatch = !modifiers.includes('ctrl') || (e.ctrlKey || e.metaKey);
      const cmdMatch = !modifiers.includes('cmd') || (e.metaKey || e.ctrlKey);
      const shiftMatch = !modifiers.includes('shift') || e.shiftKey;
      const altMatch = !modifiers.includes('alt') || e.altKey;

      if (keyMatch && ctrlMatch && cmdMatch && shiftMatch && altMatch) {
        callback(e);
      }
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [key, callback, modifiers, disabled]);
}
