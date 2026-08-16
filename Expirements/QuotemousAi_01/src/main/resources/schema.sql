CREATE TABLE IF NOT EXISTS quote_posts (
  id UUID PRIMARY KEY,
  content VARCHAR(500) NOT NULL,
  nickname VARCHAR(50) NOT NULL DEFAULT 'Anonymous',
  feeling VARCHAR(20) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE IF NOT EXISTS reactions (
  id BIGSERIAL PRIMARY KEY,
  quote_id UUID NOT NULL REFERENCES quote_posts(id) ON DELETE CASCADE,
  reaction_type VARCHAR(20) NOT NULL,
  count INT NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_quote_posts_created_at ON quote_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reactions_quote_id ON reactions(quote_id);
