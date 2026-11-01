create table users (
  id uuid primary key default gen_random_uuid(),
  handle text not null unique check (handle ~ '^[a-z0-9_]{1,15}$'),
  password_hash text not null,
  created_at timestamptz not null default now()
);

create table sessions (
  token_hash text primary key,
  user_id uuid not null references users (id) on delete cascade,
  expires_at timestamptz not null
);
create index sessions_user_id on sessions (user_id);

-- Millisecond precision so a timestamp round-trips through a JS Date exactly;
-- the timeline cursor depends on that.
create table posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references users (id) on delete cascade,
  body text not null,
  char_limit smallint not null check (char_limit between 0 and 42),
  created_at timestamptz(3) not null default now()
);
create index posts_timeline on posts (created_at desc, id desc);
