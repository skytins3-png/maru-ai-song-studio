CREATE TABLE IF NOT EXISTS listener_stories (
  id TEXT PRIMARY KEY,
  nickname TEXT NOT NULL,
  title TEXT NOT NULL,
  story TEXT NOT NULL,
  requested_at TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending_security_review',
  media_key TEXT NOT NULL DEFAULT '',
  media_size INTEGER NOT NULL DEFAULT 0,
  media_sha256 TEXT NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS idx_stories_pending ON listener_stories(status, created_at);
