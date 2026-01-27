import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // 현재 사용자 정보 가져오기
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 로그인한 사용자인 경우 탈퇴 여부 체크
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_deleted")
      .eq("id", user.id)
      .single();

    // 탈퇴한 사용자면 로그아웃 후 쿼리 파라미터 추가해서 리다이렉트
    if (profile?.is_deleted) {
      // 세션 쿠키 삭제
      await supabase.auth.signOut();

      // 이미 deleted 파라미터가 있으면 리다이렉트 안 함 (무한 루프 방지)
      if (!request.nextUrl.searchParams.has("deleted")) {
        const url = new URL("/", request.url);
        url.searchParams.set("deleted", "true");
        return NextResponse.redirect(url);
      }
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * 다음 경로를 제외한 모든 요청에 적용:
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화)
     * - favicon.ico (파비콘)
     * - 이미지 파일들
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
