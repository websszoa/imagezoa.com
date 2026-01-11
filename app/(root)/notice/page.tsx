import PageNotice from "@/components/page/page-notice";
import PageTitle from "@/components/page/page-title";

export const metadata = {
  title: "이미지조아 공지사항 | ImageZoa Notice",
  description:
    "이미지조아의 서비스 소식, 업데이트, 신규 기능 및 필수 안내사항을 한곳에서 확인하세요.",
};

export default function NoticePage() {
  return (
    <>
      <PageTitle
        subtitle="ImageZoa Notice"
        title="이미지조아 공지사항"
        description="서비스 소식과 기능 업데이트를 빠르게 확인하세요."
      />
      <PageNotice />
    </>
  );
}
