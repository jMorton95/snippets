export type Item = {
  id?: string;
  indent: number;
  heading?: string;
  description?: string;
  snippet?: Snippet;
  next: Item[] | null;
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
