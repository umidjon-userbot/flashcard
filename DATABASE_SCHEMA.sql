
create table users (
  telegram_id bigint primary key,
  username text,
  first_name text,
  last_name text,
  photo_url text,
  language_code text,
  role text default 'user',
  is_active boolean default true,
  registered_at timestamp default now(),
  last_login_at timestamp default now(),
  login_count integer default 1
);

create table flashcard_sets (
  id uuid default gen_random_uuid() primary key,
  telegram_id bigint references users(telegram_id),
  title text,
  created_at timestamp default now()
);

create table flashcards (
  id uuid default gen_random_uuid() primary key,
  set_id uuid references flashcard_sets(id) on delete cascade,
  hanzi text,
  pinyin text,
  english text
);

create table progress (
  id uuid default gen_random_uuid() primary key,
  telegram_id bigint references users(telegram_id),
  hanzi text,
  correct_count integer default 0,
  wrong_count integer default 0,
  last_review timestamp default now()
);
