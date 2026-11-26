import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { SearchPalette } from '@/features/search/components/SearchPalette';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useKeyboardShortcut('k', () => setSearchOpen(true), { modifiers: ['ctrl'] });

  return (
    <div className="min-h-screen bg-[var(--surface-0)]">
      <Header
        onMenuClick={() => setSidebarOpen(o => !o)}
        onSearchClick={() => setSearchOpen(true)}
        sidebarOpen={sidebarOpen}
      />

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>

      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
