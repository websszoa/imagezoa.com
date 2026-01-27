import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export default function PagePrice() {
  return (
    <div className="rounded-lg border border-dashed border-gray-200 py-6 px-4 sm:py-8 sm:px-6 lg:py-14 lg:pb-10 lg:px-8">
      {/* 플랜 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        {/* Free Plan */}
        <div className="relative rounded-lg border-2 border-gray-200 p-4 sm:p-5 lg:p-6">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 font-paperlogy">
              Free
            </h3>
            <div className="flex flex-wrap items-baseline gap-1 sm:gap-2 mb-1">
              <span className="text-2xl sm:text-3xl font-semibold text-gray-900 font-paperlogy">
                무료
              </span>
              <span className="text-xs sm:text-sm text-gray-500 font-nanumNeo">
                / 일주일 후 갱신
              </span>
            </div>
          </div>

          <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-brand shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-gray-700 font-anyvid break-keep">
                제한된 공개 이미지 생성
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-brand shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-gray-700 font-anyvid break-keep">
                캔버스 제한된 접근
              </span>
            </li>
          </ul>

          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs sm:text-sm text-muted-foreground sm:h-10 lg:h-11"
          >
            무료 플랜 시작하기
          </Button>
        </div>

        {/* Plus Plan */}
        <div className="relative rounded-lg border-2 border-brand shadow-lg lg:scale-105 p-4 sm:p-5 lg:p-6">
          <Badge
            variant="destructive"
            className="absolute -top-2 sm:-top-4 left-1/2 -translate-x-1/2 px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm font-anyvid bg-brand"
          >
            가장 인기
          </Badge>

          <div className="mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 font-paperlogy">
              Plus
            </h3>
            <div className="flex flex-wrap items-baseline gap-1 sm:gap-2 mb-1">
              <span className="text-2xl sm:text-3xl font-semibold text-gray-900 font-nanumNeo">
                ₩20,000
              </span>
              <span className="text-xs sm:text-sm text-gray-500 font-nanumNeo">
                /월
              </span>
            </div>

            <p className="text-xs text-green-600 font-nanumNeo">30% 할인</p>
          </div>

          <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-brand shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-gray-700 font-anyvid break-keep">
                비공개 이미지 생성
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-brand shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-gray-700 font-anyvid break-keep">
                월 1,000 우선순위 크레딧
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-brand shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-gray-700 font-anyvid break-keep">
                무제한 느린 크레딧
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-brand shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-gray-700 font-anyvid break-keep">
                무제한 캐릭터 일관성
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-brand shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-gray-700 font-anyvid break-keep">
                고품질 내보내기
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-brand shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-gray-700 font-anyvid break-keep">
                더 큰 생성 대기열
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-brand shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-gray-700 font-anyvid break-keep">
                150 우선순위 크레딧을 ₩4,000에 충전
              </span>
            </li>
          </ul>

          <Button
            variant="destructive"
            size="sm"
            className="w-full text-xs sm:text-sm sm:h-10 lg:h-11 bg-brand hover:bg-brand/90 text-white"
          >
            Plus 플랜 시작하기
          </Button>
        </div>

        {/* Pro Plan */}
        <div className="relative rounded-lg border-2 border-gray-200 p-4 sm:p-5 lg:p-6">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 font-paperlogy">
              Pro
            </h3>
            <div className="flex flex-wrap items-baseline gap-1 sm:gap-2 mb-1">
              <span className="text-2xl sm:text-3xl font-black text-gray-900 font-nanumNeo">
                ₩60,000
              </span>
              <span className="text-xs sm:text-sm text-gray-500 font-paperlogy">
                / 월
              </span>
            </div>

            <p className="text-xs text-green-600 font-nanumNeo">30% 할인</p>
          </div>

          <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-brand shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-gray-700 font-anyvid break-keep">
                크레딧당 최저 비용
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-brand shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-gray-700 font-anyvid break-keep">
                비공개 이미지 생성
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-brand shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-gray-700 font-anyvid break-keep">
                월 3,500 우선순위 크레딧
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-brand shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-gray-700 font-anyvid break-keep">
                일괄 생성
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-brand shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-gray-700 font-anyvid break-keep">
                고품질 내보내기
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-brand shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-gray-700 font-anyvid break-keep">
                가장 큰 생성 대기열
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-brand shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-gray-700 font-anyvid break-keep">
                250 우선순위 크레딧을 ₩4,000에 충전
              </span>
            </li>
          </ul>

          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs sm:text-sm text-muted-foreground sm:h-10 lg:h-11"
          >
            Pro 플랜 시작하기
          </Button>
        </div>
      </div>

      {/* 하단 문구 */}
      <div className="text-center text-xs sm:text-sm text-gray-500 font-nanumNeo mb-4 sm:mb-6">
        팀 또는 엔터프라이즈 플랜을 찾으시나요?{" "}
        <a href="/contact" className="text-brand hover:underline font-medium">
          문의하기
        </a>
      </div>

      {/* 환불 정책 */}
      <div className="border-t border-gray-200 pt-4 sm:pt-6">
        <h4 className="text-xl font-semibold text-gray-900 mb-2 font-paperlogy">
          환불 정책
        </h4>
        <ul className="space-y-1 text-sm text-muted-foreground font-anyvid leading-relaxed list-disc list-inside">
          <li>
            구매 후 7일 이내 미사용 구매분에 한하여 전액 환불이 가능합니다.
          </li>
          <li>부분 사용 시, 환불되지 않습니다.</li>
          <li>
            환불 신청은 고객센터를 통해 가능하며, 신청 후 영업일 기준 3-5일 이내
            처리됩니다.
          </li>
          <li>
            환불 금액은 원래 결제 수단으로 환불되며, 현금 환불을 원하실 경우
            추가 확인 절차가 필요합니다.
          </li>
          <li>
            무료 체험 또는 프로모션으로 받은 크레딧은 환불 대상에서 제외됩니다.
          </li>
        </ul>
        <p className="text-gray-500 mt-3 text-sm font-anyvid">
          자세한 환불 정책은{" "}
          <a
            href="/refund"
            className="text-brand hover:underline underline-offset-4 font-medium"
          >
            환불 정책 페이지
          </a>
          에서 확인하실 수 있습니다.
        </p>
      </div>
    </div>
  );
}
