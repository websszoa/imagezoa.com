import { APP_NAME, APP_ENG_NAME } from "@/lib/constants";
import PagePrice from "@/components/page/page-price";
import PageTitle from "@/components/page/page-title";

export const metadata = {
  title: `${APP_NAME} 요금 안내 | ${APP_ENG_NAME} Pricing`,
  description: `${APP_NAME}의 요금제와 크레딧 정책을 확인하고, 나에게 맞는 플랜을 선택해보세요.`,
};

export default function PricePage() {
  return (
    <>
      <PageTitle
        subtitle="Pricing"
        title="요금 안내"
        description="이미지 생성 크레딧과 요금제를 한눈에 확인해보세요."
      />
      <PagePrice />
    </>
  );
}
