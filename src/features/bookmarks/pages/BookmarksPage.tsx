import { Link } from 'react-router-dom';
import { useStudy } from '@/features/learning/hooks/useStudy';
import { navigation } from '@/data/navigation';
import { Bookmark, BookmarkX, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export function BookmarksPage() {
  const { state, toggleBookmark } = useStudy();

  const bookmarkedItems = state.bookmarks
    .map(path => {
      const cat = navigation.find(c => c.items.some(i => i.path === path));
      const item = cat?.items.find(i => i.path === path);
      return item && cat ? { ...item, categoryLabel: cat.label, categoryColor: cat.color } : null;
    })
    .filter(Boolean);

  if (bookmarkedItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-amber-500/10">
          <Bookmark size={28} className="text-amber-500" />
        </div>
        <h1 className="text-xl font-semibold text-[var(--text-primary)] mb-2">No bookmarks yet</h1>
        <p className="text-[var(--text-secondary)] mb-6 max-w-sm">
          Bookmark topics while studying to save them for later review.
        </p>
        <Link to="/learn/javascript/fundamentals" className="btn-primary">
          Start Learning
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Bookmarks</h1>
        <p className="text-[var(--text-secondary)] mt-1">{bookmarkedItems.length} saved topic{bookmarkedItems.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="space-y-3">
        {bookmarkedItems.map((item, i) => item && (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
            className="card flex items-center gap-4 group"
          >
            <div className="flex size-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${item.categoryColor}18` }}>
              <Bookmark size={16} style={{ color: item.categoryColor }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[var(--text-primary)] truncate">{item.label}</p>
              <p className="text-xs text-[var(--text-muted)]">{item.categoryLabel}</p>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => toggleBookmark(item.path)}
                className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30 transition-colors"
                aria-label="Remove bookmark"
              >
                <BookmarkX size={15} />
              </button>
              <Link
                to={item.path}
                className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-700 transition-colors"
              >
                Open <ExternalLink size={12} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
