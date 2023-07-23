type FontSize = 'text-sm' | 'text-xs' | 'text-base' | 'text-lg' | 'text-xl' | 'text-2xl' | 'text-3xl' | 'text-4xl' | 'text-5xl';

export type Item = {
  id: string;
  indent: number;
  heading?: string;
  description?: string;
  snippet?: Snippet;
  next: Item[] | null;
  gapBottom?: number;
  gapTop?: number;
  fontSize?: FontSize;
};

export type Snippet = {
  code: string;
  language: string;
  showLineNumbers: boolean;
  startingLineNumber: number;
  wrapLongLines: boolean;
  theme?: object;
  highlight?: string;
};


