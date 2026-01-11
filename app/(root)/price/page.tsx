import PagePrice from "@/components/page/page-price";
import PageTitle from "@/components/page/page-title";

export const metadata = {
  title: "이미지조아 요금 안내 | ImageZoa Pricing",
  description:
    "이미지조아의 요금제와 크레딧 정책을 확인하고, 나에게 맞는 플랜을 선택해보세요.",
};

export default function PricePage() {
  return (
    <>
      <PageTitle
        subtitle="ImageZoa Pricing"
        title="요금 안내"
        description="이미지 생성 크레딧과 요금제를 한눈에 확인해보세요."
      />
      <PagePrice />
    </>
  );
}
