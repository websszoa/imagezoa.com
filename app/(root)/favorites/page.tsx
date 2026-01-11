import { createClient } from "@/lib/supabase/server";
import PageTitle from "@/components/page/page-title";
import PageFavorites from "@/components/page/page-favorites";
import PageLogin from "@/components/page/page-login";

export const metadata = {
  title: "이미지조아 즐겨찾기 | ImageZoa Favorites",
  description:
    "마음에 드는 이미지를 한곳에서 편하게 확인하세요. 내가 저장한 이미지를 빠르게 관리할 수 있습니다.",
};

export default async function FavoritesPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  return (
    <>
      <PageTitle
        subtitle="ImageZoa Favorites"
        title="즐겨찾기"
        description="마음에 드는 이미지를 저장해두고 언제든지 빠르게 확인해보세요."
      />
      {error || !data?.claims ? <PageLogin /> : <PageFavorites />}
    </>
  );
}
