"use client";

import { TentTree } from "lucide-react";
import GoogleLoginButton from "../auth/google-login-button";
import KakaoLoginButton from "../auth/kakao-login-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DialogLoginProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DialogLogin({ open, onOpenChange }: DialogLoginProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="space-y-2">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-1 font-paperlogy font-extrabold text-brand text-xl">
                <TentTree className="size-9" />
                image zoa
              </div>
            </div>
            <DialogTitle className="text-xl mt-2">
              Welcome to imagezoa.com
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-center font-kakaoBig font-light break-keep">
            로그인을 하시면 서비스를 이용할 수 있습니다.
            <br />
            이미지를 생성하고, 저장한 이미지를 어디서든 자유롭게 확인할 수
            있어요.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 pt-2">
          <GoogleLoginButton />
          <KakaoLoginButton />
        </div>

        <p className="text-xs text-muted-foreground text-center font-kakaoBig">
          계속 진행하면{" "}
          <a
            href="/privacy"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            개인정보 처리방침
          </a>{" "}
          및{" "}
          <a
            href="/terms"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            이용약관
          </a>
          에 동의하게 됩니다.
        </p>
      </DialogContent>
    </Dialog>
  );
}

