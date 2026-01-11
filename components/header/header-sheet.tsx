"use client";

import { APP_NAME } from "@/lib/constants";
import { LogoutButton } from "../auth/logout-button";
import { useLogin } from "@/contexts/login-context";
import type { User } from "@supabase/supabase-js";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface SheetHeaderProps {
  user: User | null;
  onClose: () => void;
}

export default function HeaderSheet({ user, onClose }: SheetHeaderProps) {
  const { openLogin } = useLogin();

  return (
    <SheetHeader className="border-b border-brand/10">
      <SheetTitle className="font-paperlogy text-xl uppercase font-bold text-brand flex items-center gap-2">
        {APP_NAME}
        {user ? (
          <LogoutButton />
        ) : (
          <button
            className="text-[12px] rounded-full px-2.5 font-paperlogy font-normal bg-brand text-white h-6 cursor-pointer hover:bg-brand/90"
            onClick={() => {
              onClose();
              openLogin();
            }}
          >
            로그인
          </button>
        )}
      </SheetTitle>
      <SheetDescription className="sr-only">
        메뉴 및 사용자 정보를 확인할 수 있습니다.
      </SheetDescription>
    </SheetHeader>
  );
}
