import z from "zod";
import type { LucideIcon } from "lucide-react";
import {
  adminLoginSchema,
  contactSchema,
  profileNameSchema,
} from "./validator";

// 문의하기 폼 타입 (contact)
export type ContactFormValues = z.infer<typeof contactSchema>;

// 프로필 이름 변경 폼 타입 (profile)
export type ProfileNameFormValues = z.infer<typeof profileNameSchema>;

// 관리자 로그인 폼 타입
export type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;

// 빈 데이터 상태 컴포넌트 Props (page-no-data)
export interface PageNoDataProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

// 페이지 타이틀 컴포넌트 Props (page-title)
export interface PageTitleProps {
  subtitle: string;
  title: string;
  description: string;
}

// 프로필 데이터 타입 (profile)
export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: string | null;
  visit_count: number;
  is_deleted: boolean;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
}
