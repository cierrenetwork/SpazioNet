export type VerticalId = 'napoli' | 'milan' | 'inter' | 'juve' | 'rompipallone';

export interface Vertical {
  id: VerticalId;
  name: string;
  url: string;
  color: string; // Tailwind class part, e.g., 'napoli' for 'bg-napoli'
  teamName: string; // Used for search queries
}

export type ArticleCategory = 'Trending' | 'Evergreen';

export interface ArticleSuggestion {
  id: string;
  topic: string;
  description: string;
  seoTitle: string;
  discoverTitle: string;
  category: ArticleCategory;
  score: number; // 0-100
  reasoning: string;
  sourceUrl?: string; // Derived from search
}

export interface SearchResult {
  title: string;
  url: string;
}
