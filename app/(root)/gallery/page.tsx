import { createClient } from "@/lib/supabase/server";
import PageTitle from "@/components/page/page-title";
import PageLogin from "@/components/page/page-login";
import PageGallery from "@/components/page/page-gallery";

export const metadata = {
  title: "이미지조아 내 갤러리 | ImageZoa Gallery",
  description:
    "내가 생성한 이미지를 한곳에서 확인하고 관리할 수 있는 이미지조아 개인 갤러리 페이지입니다.",
};

export default async function GalleryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <PageTitle
        subtitle="ImageZoa Gallery"
        title="갤러리"
        description="내가 생성한 이미지를 한곳에서 확인하고 관리해보세요."
      />
      {!user ? <PageLogin /> : <PageGallery />}
    </>
  );
}
