import { createClient } from "@/lib/supabase/server";
import PageTitle from "@/components/page/page-title";
import PageProfile from "@/components/page/page-profile";
import PageLogin from "@/components/page/page-login";
import type { Profile } from "@/lib/types";

export const metadata = {
  title: "이미지조아 내 정보 | ImageZoa Profile",
  description:
    "내 프로필 정보를 확인하고 수정할 수 있는 페이지입니다. 계정 정보와 서비스 이용 내역을 편리하게 관리해보세요.",
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile: Profile | null = null;

  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("id, avatar_url, full_name, email, role, created_at")
      .eq("id", user.id)
      .is("deleted_at", null)
      .single();

    if (data) {
      profile = {
        id: data.id,
        avatar_url: data.avatar_url,
        full_name: data.full_name,
        email: data.email,
        role: data.role || "user",
        created_at: data.created_at,
      };
    }
  }

  return (
    <>
      <PageTitle
        subtitle="ImageZoa Profile"
        title="프로필"
        description="내 프로필 정보를 확인하고 수정할 수 있는 페이지입니다."
      />
      {!user ? <PageLogin /> : <PageProfile profile={profile} />}
    </>
  );
}
