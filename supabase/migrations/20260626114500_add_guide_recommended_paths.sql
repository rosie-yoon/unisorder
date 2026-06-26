alter table public.guides
add column if not exists recommended_paths text[] not null default '{}'::text[],
add column if not exists path_order integer not null default 999;

create index if not exists guides_recommended_paths_idx on public.guides using gin (recommended_paths);
create index if not exists guides_path_order_idx on public.guides (path_order);

update public.guides
set recommended_paths = case
  when category ilike '%Lazada%' or title ilike '%Lazada%' then array['Lazada 추가 시작하기']
  when category like '%재고%' or category like '%정산%' or title like '%재고%' or title like '%마진%' then array['Pro 시작하기']
  when category like '%주문%' or category like '%송장%' then array['주문 처리 루틴 만들기']
  else array['Basic 시작하기']
end
where recommended_paths = '{}'::text[];

update public.guides
set path_order = sort_order
where path_order = 999;
