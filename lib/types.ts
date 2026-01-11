import { z } from "zod";
import { contactSchema } from "./validator";
import type { User } from "@supabase/supabase-js";

// 문의하기 폼 타입
export type ContactFormValues = z.infer<typeof contactSchema>;

// 프로필 타입
export interface Profile {
  id: string;
  avatar_url: string | null;
  full_name: string | null;
  email: string | null;
  role: "admin" | "user";
  created_at?: string;
}

// 헤더 컴포넌트 Props 타입
export interface HeaderRightProps {
  user: User | null;
  profile: Profile | null;
}

export interface HeaderUserProps {
  user: User | null;
  profile: Profile | null;
}
