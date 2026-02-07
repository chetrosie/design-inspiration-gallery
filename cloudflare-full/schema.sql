CREATE TABLE IF NOT EXISTS inspirations (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT,
  author TEXT,
  prompt TEXT,
  category TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_inspirations_created_at ON inspirations(created_at DESC);
