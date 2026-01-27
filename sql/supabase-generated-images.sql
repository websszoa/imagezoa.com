-- AI 생성 이미지 저장 테이블
-- Ideogram API로 생성된 이미지를 R2에 업로드하고 메타데이터를 저장

-- generated_images 테이블 생성
create table public.generated_images (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  
  -- 이미지 URL 정보
  ideogram_url text not null,  -- Ideogram API에서 받은 원본 URL
  r2_url text,  -- Cloudflare R2에 업로드된 URL
  r2_key text,  -- R2에 저장된 파일 키/경로
  
  -- 생성 정보
  prompt text not null,  -- 사용자가 입력한 프롬프트
  resolution text,  -- 이미지 해상도 (예: "1024x1024", "2048x2048")
  seed integer,  -- 생성 시드 값 (재현 가능한 이미지 생성을 위해)
  
  -- Ideogram API 응답 정보
  ideogram_job_id text,  -- Ideogram API 작업 ID
  ideogram_status text,  -- Ideogram API 상태 (pending, completed, failed 등)
  
  -- 메타데이터
  file_size bigint,  -- 파일 크기 (bytes)
  mime_type text,  -- MIME 타입 (예: "image/png", "image/jpeg")
  width integer,  -- 이미지 너비
  height integer,  -- 이미지 높이
  
  -- 타임스탬프
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,  -- 소프트 삭제
  
  primary key (id)
);

-- Row Level Security 활성화
alter table public.generated_images enable row level security;

-- RLS 정책: 사용자는 자신의 이미지만 조회할 수 있음
create policy "Users can view their own generated images"
  on public.generated_images
  for select
  using (auth.uid() = user_id and deleted_at is null);

-- RLS 정책: 사용자는 자신의 이미지만 생성할 수 있음
create policy "Users can insert their own generated images"
  on public.generated_images
  for insert
  with check (auth.uid() = user_id);

-- RLS 정책: 사용자는 자신의 이미지만 수정할 수 있음
create policy "Users can update their own generated images"
  on public.generated_images
  for update
  using (auth.uid() = user_id);

-- 관리자 여부를 확인하는 함수 (RLS 우회) - profiles.sql에서 생성되지만, 여기서도 참조
-- 참고: 이 함수는 profiles.sql의 fix-rls-recursion.sql에서 생성됩니다
-- create or replace function public.is_admin(user_id uuid) returns boolean ...

-- RLS 정책: 관리자는 모든 이미지를 조회할 수 있음 (security definer 함수 사용)
create policy "Admins can view all generated images"
  on public.generated_images
  for select
  using (public.is_admin(auth.uid()));

-- updated_at 자동 업데이트 트리거
drop trigger if exists on_generated_images_updated on public.generated_images;
create trigger on_generated_images_updated
  before update on public.generated_images
  for each row execute procedure public.handle_updated_at();

-- 인덱스 생성 (성능 최적화)
create index generated_images_user_id_idx on public.generated_images(user_id) where deleted_at is null;
create index generated_images_created_at_idx on public.generated_images(created_at desc) where deleted_at is null;
create index generated_images_ideogram_job_id_idx on public.generated_images(ideogram_job_id) where ideogram_job_id is not null;
create index generated_images_r2_key_idx on public.generated_images(r2_key) where r2_key is not null;

