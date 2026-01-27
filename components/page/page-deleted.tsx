"use client";

import Link from "next/link";
import { APP_ENG_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { TentTree, UserX, Home, Mail } from "lucide-react";

export default function PageDeleted() {
  return (
    <div className="contact__container">
      <div className="flex flex-col items-center justify-center gap-6 py-8">
        {/* 로고 */}
        <div className="flex items-center gap-1 font-paperlogy font-extrabold uppercase text-brand text-2xl">
          <TentTree className="size-10" />
          {APP_ENG_NAME}
        </div>

        {/* 아이콘 */}
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
          <UserX className="w-10 h-10 text-red-500" />
        </div>

        {/* 메시지 */}
        <div className="text-center space-y-2">
          <h2 className="text-xl font-paperlogy text-gray-900">
            탈퇴된 계정입니다
          </h2>
          <p className="text-sm text-muted-foreground font-anyvid max-w-sm break-keep">
            해당 계정은 탈퇴 처리되어 더 이상 서비스를 이용하실 수 없습니다.
          </p>
        </div>

        {/* 안내 박스 */}
        <div className="w-full max-w-sm bg-gray-50 p-4 rounded-lg font-anyvid">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-brand mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-900">
                계정 복구가 필요하신가요?
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                탈퇴 후 일정 기간 내에는 계정 복구가 가능합니다. 문의하기를 통해
                관리자에게 요청해주세요.
              </p>
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex gap-2">
          <Button asChild variant="outline" className="font-nanumNeo">
            <Link href="/contact">
              <Mail className="w-4 h-4" />
              문의하기
            </Link>
          </Button>
          <Button asChild className="bg-brand hover:bg-brand/90 font-nanumNeo">
            <Link href="/">
              <Home className="w-4 h-4" />
              홈으로 이동
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
