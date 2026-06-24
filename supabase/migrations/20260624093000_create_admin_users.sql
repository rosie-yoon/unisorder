create table if not exists public.admin_users (
  id uuid primary key,
  username text not null unique,
  display_name text not null,
  password_hash text not null,
  is_active boolean not null default true,
  session_version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists admin_users_username_idx on public.admin_users (username);
create index if not exists admin_users_active_idx on public.admin_users (is_active);

drop trigger if exists admin_users_set_updated_at on public.admin_users;
create trigger admin_users_set_updated_at
before update on public.admin_users
for each row execute function public.set_updated_at();

alter table public.admin_users enable row level security;
