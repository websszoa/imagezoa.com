import { createClient } from "@/lib/supabase/server";
import PageTitle from "@/components/page/page-title";
import PageLogin from "@/components/page/page-login";
import PageMyGallery from "@/components/page/page-my-gallery";

export const metadata = {
  title: "이미지조아 나의 갤러리 | ImageZoa My Gallery",
  description:
    "내가 생성한 이미지를 한곳에서 확인하고 관리할 수 있는 이미지조아 개인 갤러리 페이지입니다.",
};

export default async function MyGalleryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <PageTitle
        subtitle="ImageZoa My Gallery"
        title="나의 갤러리"
        description="내가 생성한 이미지를 한곳에서 확인하고 관리해보세요."
      />
      {!user ? <PageLogin /> : <PageMyGallery />}
    </>
  );
}
