create table if not exists public.faqs (
  id text primary key,
  question text not null,
  answer text not null,
  sort_order integer not null default 999,
  is_published boolean not null default true,
  show_on_home boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.guides (
  id text primary key,
  slug text not null unique,
  title text not null,
  category text not null,
  description text not null,
  duration text not null,
  icon_name text not null default 'file',
  sort_order integer not null default 999,
  is_published boolean not null default true,
  video_url text,
  blocks jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists faqs_sort_order_idx on public.faqs (sort_order);
create index if not exists faqs_home_published_idx on public.faqs (show_on_home, is_published, sort_order);
create index if not exists guides_slug_idx on public.guides (slug);
create index if not exists guides_published_sort_idx on public.guides (is_published, sort_order);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists faqs_set_updated_at on public.faqs;
create trigger faqs_set_updated_at
before update on public.faqs
for each row execute function public.set_updated_at();

drop trigger if exists guides_set_updated_at on public.guides;
create trigger guides_set_updated_at
before update on public.guides
for each row execute function public.set_updated_at();

alter table public.faqs enable row level security;
alter table public.guides enable row level security;
