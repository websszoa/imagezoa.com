"use client";

import { useEffect, useState } from "react";
import { TentTree, PartyPopper } from "lucide-react";
import { APP_ENG_NAME } from "@/lib/constants";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

interface DialogWelcomeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DialogWelcome({
  open,
  onOpenChange,
}: DialogWelcomeProps) {
  const [countdown, setCountdown] = useState(10);

  // 카운트다운 타이머
  useEffect(() => {
    if (!open) {
      setCountdown(10);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [open]);

  // 카운트다운 종료 시 다이얼로그 닫기
  useEffect(() => {
    if (countdown === 0 && open) {
      onOpenChange(false);
    }
  }, [countdown, open, onOpenChange]);

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
            <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto overflow-hidden">
              <Image
                src="/face/face09.png"
                alt="프로필"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <DialogTitle className="text-xl font-nanumNeo">
              환영합니다!
            </DialogTitle>
          </div>

          <DialogDescription className="text-sm text-center font-anyvid break-keep">
            로그인에 성공했습니다. <br />
            <span className="capitalize">{APP_ENG_NAME}</span>와 함께 멋진
            이미지를 만들어보세요!
          </DialogDescription>
        </DialogHeader>

        {/* 자동 닫힘 안내 */}
        <div className="pt-4 text-center">
          <p className="text-xs text-muted-foreground font-anyvid">
            {countdown}초 후 자동으로 닫힙니다
          </p>
          <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand transition-all duration-1000 ease-linear"
              style={{ width: `${(countdown / 10) * 100}%` }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
