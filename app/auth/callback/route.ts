import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const next = requestUrl.searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // 로그인 성공 후 사용자 정보 가져오기
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // 재가입 시 프로필 복구 (deleted_at이 NULL이 아닌 경우)
        const { data: existingProfile } = await supabase
          .from("profiles")
          .select("deleted_at, full_name, avatar_url")
          .eq("id", user.id)
          .maybeSingle();

        // 탈퇴했다가 재가입한 경우 프로필 복구
        if (existingProfile?.deleted_at) {
          await supabase
            .from("profiles")
            .update({
              deleted_at: null,
              email: user.email,
              full_name:
                user.user_metadata?.full_name ||
                user.user_metadata?.name ||
                existingProfile.full_name,
              avatar_url:
                user.user_metadata?.avatar_url ||
                user.user_metadata?.picture ||
                existingProfile.avatar_url,
            })
            .eq("id", user.id);
        }
      }

      // 성공 시 원래 페이지로 리다이렉트 (또는 홈)
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // 에러 발생 시 에러 페이지로 리다이렉트
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
