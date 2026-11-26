import React, { createContext, useContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { StudyState } from '@/types/study';
import { siteConfig } from '@/data/siteConfig';

const DEFAULT: StudyState = {
  completed: [],
  bookmarks: [],
  recentlyViewed: [],
  lastVisited: null,
};

interface StudyContextValue {
  state: StudyState;
  toggleCompleted: (path: string) => void;
  toggleBookmark: (path: string) => void;
  recordVisit: (path: string) => void;
  resetAll: () => void;
  isCompleted: (path: string) => boolean;
  isBookmarked: (path: string) => boolean;
}

const StudyContext = createContext<StudyContextValue | null>(null);

export function StudyProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useLocalStorage<StudyState>(siteConfig.storageKeys.study, DEFAULT);

  const toggleCompleted = useCallback((path: string) => {
    setState(prev => ({
      ...prev,
      completed: prev.completed.includes(path)
        ? prev.completed.filter(p => p !== path)
        : [...prev.completed, path],
    }));
  }, [setState]);

  const toggleBookmark = useCallback((path: string) => {
    setState(prev => ({
      ...prev,
      bookmarks: prev.bookmarks.includes(path)
        ? prev.bookmarks.filter(p => p !== path)
        : [...prev.bookmarks, path],
    }));
  }, [setState]);

  const recordVisit = useCallback((path: string) => {
    setState(prev => {
      const now = Date.now();
      const existing = prev.recentlyViewed.filter(e => e.path !== path);
      return {
        ...prev,
        lastVisited: path,
        recentlyViewed: [{ path, visitedAt: now }, ...existing].slice(0, 10),
      };
    });
  }, [setState]);

  const resetAll = useCallback(() => {
    setState(DEFAULT);
  }, [setState]);

  const isCompleted = useCallback((path: string) => state.completed.includes(path), [state.completed]);
  const isBookmarked = useCallback((path: string) => state.bookmarks.includes(path), [state.bookmarks]);

  const value = useMemo(
    () => ({ state, toggleCompleted, toggleBookmark, recordVisit, resetAll, isCompleted, isBookmarked }),
    [state, toggleCompleted, toggleBookmark, recordVisit, resetAll, isCompleted, isBookmarked]
  );

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
}

export function useStudy() {
  const ctx = useContext(StudyContext);
  if (!ctx) throw new Error('useStudy must be used within StudyProvider');
  return ctx;
}
