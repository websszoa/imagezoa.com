"use client";

import Link from "next/link";
import { TentTree, Home, Mail } from "lucide-react";
import { APP_ENG_NAME, COMPANY_EMAIL } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DialogDeletedProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DialogDeleted({
  open,
  onOpenChange,
}: DialogDeletedProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-2 font-paperlogy uppercase font-extrabold text-brand text-xl">
                <TentTree className="size-9" />
                {APP_ENG_NAME}
              </div>
            </div>

            <DialogTitle className="text-xl font-nanumNeo">
              아쉽게도 탈퇴된 계정입니다
            </DialogTitle>
          </div>

          <DialogDescription className="text-sm text-center font-anyvid break-keep">
            해당 계정은 탈퇴 처리되어 <br />더 이상 서비스를 이용하실 수
            없습니다.
          </DialogDescription>
        </DialogHeader>

        {/* 안내 박스 */}
        <div className="w-full bg-gray-50 p-4 rounded-lg font-anyvid">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-brand mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-900">
                계정 복구가 필요하신가요?
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                탈퇴 후 일정 기간 내에는 계정 복구가 가능합니다.{" "}
                <a
                  href={`mailto:${COMPANY_EMAIL}`}
                  className="text-brand hover:underline"
                >
                  {COMPANY_EMAIL}
                </a>
                으로 문의해주세요.
              </p>
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex gap-2 pt-2">
          <Button
            asChild
            variant="outline"
            className="flex-1 font-nanumNeo"
            onClick={() => onOpenChange(false)}
          >
            <a href={`mailto:${COMPANY_EMAIL}`}>
              <Mail className="w-4 h-4" />
              문의하기
            </a>
          </Button>
          <Button
            asChild
            className="flex-1 bg-brand hover:bg-brand/90 font-nanumNeo"
            onClick={() => onOpenChange(false)}
          >
            <Link href="/">
              <Home className="w-4 h-4" />
              홈으로
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
