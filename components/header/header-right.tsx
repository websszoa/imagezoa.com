"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import { Citrus } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSheet } from "@/contexts/sheet-context";
import { createClient } from "@/lib/supabase/client";

import HeaderSheet from "./header-sheet";
import HeaderInfo from "./header-info";
import HeaderUser from "./header-user";
import HeaderNav from "./header-nav";
import DialogDeleted from "../dialog/dialog-deleted";

export default function HeaderRight() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isOpen, setIsOpen } = useSheet();
  const [user, setUser] = useState<User | null>(null);
  const [isDeletedDialogOpen, setIsDeletedDialogOpen] = useState(false);

  // URL에서 deleted 파라미터 감지
  useEffect(() => {
    if (searchParams.get("deleted") === "true") {
      setIsDeletedDialogOpen(true);
      router.replace("/", { scroll: false }); // URL에서 파라미터 제거
    }
  }, [searchParams, router]);

  useEffect(() => {
    const supabase = createClient();

    // 유저 정보 가져오기
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // 로그인/로그아웃 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="destructive"
            size="icon"
            className="h-10 w-10 rounded-full hover:bg-brand/90"
          >
            <Citrus />
          </Button>
        </SheetTrigger>
        <SheetContent>
          {/* 헤더 시트 */}
          <HeaderSheet user={user} />

          {/* 사용자 정보 */}
          <HeaderUser userId={user?.id} />

          {/* 메뉴 */}
          <HeaderNav user={user} />

          {/* 앱 정보 */}
          <HeaderInfo />
        </SheetContent>
      </Sheet>

      {/* 탈퇴 계정 안내 다이얼로그 */}
      <DialogDeleted
        open={isDeletedDialogOpen}
        onOpenChange={setIsDeletedDialogOpen}
      />
    </>
  );
}
