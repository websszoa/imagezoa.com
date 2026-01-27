-- Supabase Profiles 테이블 생성
-- 참조: https://supabase.com/docs/guides/auth/managing-user-data

-- profiles 테이블 생성
create table public.profiles (
  id uuid not null references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  role text not null default 'user' check (role in ('admin', 'user')),
  visit_count integer not null default 1,
  is_deleted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  primary key (id)
);

-- Row Level Security 활성화
alter table public.profiles enable row level security;

-- RLS 정책: 사용자는 자신의 프로필을 조회할 수 있음
create policy "Users can view their own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

-- RLS 정책: 사용자는 자신의 프로필을 수정할 수 있음
create policy "Users can update their own profile"
  on public.profiles
  for update
  using (auth.uid() = id);

-- RLS 정책: 관리자는 모든 프로필을 조회할 수 있음
create policy "Admins can view all profiles"
  on public.profiles
  for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- RLS 정책: 관리자는 모든 프로필을 수정할 수 있음
create policy "Admins can update all profiles"
  on public.profiles
  for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- 새 사용자 생성 시 자동으로 프로필 생성하는 함수
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, role, visit_count)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture'),
    coalesce((new.raw_user_meta_data->>'role')::text, 'user'),
    1
  );
  return new;
end;
$$;

-- 사용자 생성 시 트리거 (기존 트리거가 있으면 삭제 후 생성)
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- updated_at 자동 업데이트 함수
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- updated_at 자동 업데이트 트리거 (기존 트리거가 있으면 삭제 후 생성)
drop trigger if exists on_profiles_updated on public.profiles;
create trigger on_profiles_updated
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- 로그인 시 방문횟수 증가 함수
create or replace function public.handle_user_login()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  -- last_sign_in_at이 변경되었을 때만 방문횟수 증가
  if old.last_sign_in_at is distinct from new.last_sign_in_at then
    update public.profiles
    set visit_count = visit_count + 1
    where id = new.id;
  end if;
  return new;
end;
$$;

-- 로그인 시 트리거 (기존 트리거가 있으면 삭제 후 생성)
drop trigger if exists on_auth_user_login on auth.users;
create trigger on_auth_user_login
  after update on auth.users
  for each row execute procedure public.handle_user_login();

-- 인덱스 생성 (성능 최적화)
create index profiles_email_idx on public.profiles(email) where deleted_at is null;
create index profiles_role_idx on public.profiles(role) where deleted_at is null;
create index profiles_deleted_at_idx on public.profiles(deleted_at) where deleted_at is not null;

