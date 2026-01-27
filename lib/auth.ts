import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types";

/**
 * 서버 사이드에서 현재 로그인한 사용자를 가져옵니다.
 * @returns 로그인한 사용자 정보 또는 null
 */
export async function getUser(): Promise<User | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

/**
 * 서버 사이드에서 프로필 정보를 가져옵니다.
 * @param userId - 사용자 ID
 * @returns 프로필 정보 또는 null
 */
export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("프로필 조회 오류:", error);
    return null;
  }

  return profile;
}
