export interface StudyEntry {
  path: string;
  visitedAt: number;
}

export interface StudyState {
  completed: string[];       // list of page paths
  bookmarks: string[];       // list of page paths
  recentlyViewed: StudyEntry[];
  lastVisited: string | null;
}

export type ProgressByCategory = {
  [categoryId: string]: {
    total: number;
    completed: number;
  };
};
