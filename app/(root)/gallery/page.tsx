import { APP_NAME, APP_ENG_NAME } from "@/lib/constants";
import PageTitle from "@/components/page/page-title";
import PageGallery from "@/components/page/page-gallery";

export const metadata = {
  title: `${APP_NAME} 내 갤러리 | ${APP_ENG_NAME} Gallery`,
  description: `내가 생성한 이미지를 한곳에서 확인하고 관리할 수 있는 ${APP_NAME} 개인 갤러리 페이지입니다.`,
};

export default async function GalleryPage() {
  return (
    <>
      <PageTitle
        subtitle="ImageZoa Gallery"
        title="갤러리"
        description="생성된 이미지를 한곳에서 확인하고 관리해보세요."
      />
      <PageGallery />
    </>
  );
}
