import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  BookOpen, Moon, Sun, Search, Menu, X, Bookmark, BarChart2, Home
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { IconButton } from '@/components/ui/Button';
import { Tooltip } from '@/components/ui/Tooltip';
import { siteConfig } from '@/data/siteConfig';

interface HeaderProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
  sidebarOpen: boolean;
}

export function Header({ onMenuClick, onSearchClick, sidebarOpen }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { to: '/', icon: <Home size={16} />, label: 'Dashboard' },
    { to: '/bookmarks', icon: <Bookmark size={16} />, label: 'Bookmarks' },
    { to: '/progress', icon: <BarChart2 size={16} />, label: 'Progress' },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-50 h-14 flex items-center',
        'border-b border-[var(--border)] bg-[var(--surface-0)]/90 backdrop-blur-md',
        'transition-shadow duration-200',
        scrolled && 'shadow-sm shadow-black/5'
      )}
    >
      <div className="flex w-full items-center gap-3 px-4">
        {/* Hamburger (mobile + tablet) */}
        <IconButton
          onClick={onMenuClick}
          className="lg:hidden"
          aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </IconButton>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-semibold text-[var(--text-primary)]">
          <div className="flex size-7 items-center justify-center rounded-lg bg-brand-600 shadow-sm">
            <BookOpen size={14} className="text-white" />
          </div>
          <span className="hidden sm:block font-bold tracking-tight">{siteConfig.name}</span>
        </Link>

        {/* Nav links (desktop) */}
        <nav className="hidden md:flex items-center gap-1 ml-2">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all',
                location.pathname === link.to
                  ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]'
              )}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        {/* Search */}
        <button
          onClick={onSearchClick}
          className={cn(
            'hidden sm:flex items-center gap-2 rounded-lg border border-[var(--border)]',
            'bg-[var(--surface-1)] px-3 py-1.5 text-sm text-[var(--text-muted)]',
            'hover:border-[var(--border-strong)] hover:text-[var(--text-secondary)] transition-all',
            'w-48'
          )}
          aria-label="Search (Ctrl+K)"
        >
          <Search size={14} />
          <span className="flex-1 text-left">Search...</span>
          <kbd className="rounded border border-[var(--border)] bg-[var(--surface-2)] px-1 py-0.5 text-[10px] font-mono">⌘K</kbd>
        </button>

        <IconButton onClick={onSearchClick} className="sm:hidden" aria-label="Search">
          <Search size={18} />
        </IconButton>

        {/* Theme toggle */}
        <Tooltip content={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}>
          <IconButton onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </IconButton>
        </Tooltip>
      </div>
    </header>
  );
}
