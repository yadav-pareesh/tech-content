export interface ContentMeta {
  title: string;
  description: string;
  category: string;
  slug: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  estimatedTime: number; // minutes
  order: number;
}

export interface NavItem {
  label: string;
  slug: string;
  path: string;
}

export interface NavCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  items: NavItem[];
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  path: string;
  tags: string[];
}
