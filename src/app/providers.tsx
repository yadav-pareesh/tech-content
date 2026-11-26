import React from 'react';
import { StudyProvider } from '@/features/learning/hooks/useStudy';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StudyProvider>
      {children}
    </StudyProvider>
  );
}
