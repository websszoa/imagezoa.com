import PageRefund from "@/components/page/page-refund";
import PageTitle from "@/components/page/page-title";

export const metadata = {
  title: "환불 요청 | 이미지조아 ImageZoa",
  description:
    "이미지조아 서비스 이용 중 발생한 결제 내역에 대한 환불을 요청할 수 있는 페이지입니다. 환불 정책과 진행 상태를 확인해보세요.",
};

export default async function RefundPage() {
  return (
    <>
      <PageTitle
        subtitle="ImageZoa Refund"
        title="환불 정책"
        description="결제 내역을 확인하고 환불 요청을 진행할 수 있습니다."
      />
      <PageRefund />
    </>
  );
}
