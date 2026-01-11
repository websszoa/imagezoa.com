"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Citrus } from "lucide-react";

import type { HeaderRightProps } from "@/lib/types";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSheet } from "@/contexts/sheet-context";
import HeaderInfo from "./header-info";
import HeaderSheet from "./header-sheet";
import HeaderUser from "./header-user";
import HeaderNav from "./header-nav";

export default function HeaderRight({ user, profile }: HeaderRightProps) {
  const { isOpen, setIsOpen } = useSheet();

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          {user ? (
            <Button
              variant="ghost"
              size="icon"
              className="relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-offset-2 ring-offset-background ring-brand hover:ring-brand/80 transition-all p-0"
            >
              {profile?.avatar_url ? (
                <Image
                  src={profile.avatar_url}
                  alt={profile.full_name || "Profile"}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-brand flex items-center justify-center text-white font-medium text-sm">
                  {(profile?.full_name || user.email || "U")
                    .charAt(0)
                    .toUpperCase()}
                </div>
              )}
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full hover:border bg-brand text-white hover:bg-white hover:text-brand overflow-hidden p-0"
            >
              <Citrus />
            </Button>
          )}
        </SheetTrigger>
        <SheetContent>
          {/* 헤더 시트 */}
          <HeaderSheet user={user} onClose={() => setIsOpen(false)} />

          {/* 사용자 정보 섹션 */}
          <HeaderUser user={user} profile={profile} />

          {/* 메뉴 */}
          <HeaderNav user={user} />

          {/* 앱 정보 */}
          <HeaderInfo />
        </SheetContent>
      </Sheet>
    </>
  );
}
