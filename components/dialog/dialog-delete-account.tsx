"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TentTree } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import type { Profile } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DialogDeleteAccountProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: Profile;
}

export default function DialogDeleteAccount({
  open,
  onOpenChange,
  profile,
}: DialogDeleteAccountProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  /**
   * 계정 탈퇴 처리 (Soft Delete)
   *
   * - profiles.deleted_at 업데이트
   * - RLS에서 auth.uid() 기준으로 보호됨
   * - 이후 즉시 로그아웃 처리
   */
  const handleDeleteAccount = async () => {
    // 중복 클릭 방지
    if (isDeleting) return;

    setIsDeleting(true);

    try {
      // 현재 로그인 사용자 확인 (보안 강화)
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("인증 정보를 확인할 수 없습니다.");
      }

      // Soft delete: 본인 계정만 탈퇴 처리
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ deleted_at: new Date().toISOString() })
        .eq("id", user.id);

      if (profileError) throw profileError;

      // 로그아웃 (세션 정리)
      await supabase.auth.signOut();

      toast.success("탈퇴가 완료되었습니다.");

      // 다이얼로그 닫기 → 홈 이동
      onOpenChange(false);
      router.push("/");
      router.refresh();
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "탈퇴 처리 중 오류가 발생했습니다.";

      toast.error(message);

      // 실패 시 재시도 가능하도록 상태 복구
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="space-y-3">
          {/* 브랜드 영역 */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1 font-paperlogy font-extrabold text-brand text-xl">
              <TentTree className="size-8" />
              image zoa
            </div>
            <DialogTitle className="text-xl font-nanumNeo">
              정말 탈퇴하시겠어요?
            </DialogTitle>
          </div>

          {/* 안내 메시지 */}
          <DialogDescription className="bg-gray-100 p-3 rounded-md text-sm text-center font-nanumNeo break-keep">
            탈퇴하시면 모든 계정 정보와 데이터가 삭제되며,
            <br />
            <strong className="text-red-500 underline underline-offset-4">
              복구할 수 없습니다.
            </strong>
          </DialogDescription>

          {/* 주의 사항 */}
          <ul className="list-disc list-inside space-y-1 text-sm font-nanumNeo text-muted-foreground">
            <li>저장된 이미지와 데이터가 모두 삭제됩니다</li>
            <li>결제 기록 및 크레딧은 복구할 수 없습니다</li>
            <li>같은 이메일로 재가입이 가능합니다</li>
          </ul>
        </DialogHeader>

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            취소
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteAccount}
            disabled={isDeleting}
          >
            {isDeleting ? "처리 중..." : "탈퇴하기"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
