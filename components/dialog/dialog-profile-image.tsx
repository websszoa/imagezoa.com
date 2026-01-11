"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TentTree } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DialogProfileImageProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: Profile;
}

export default function DialogProfileImage({
  open,
  onOpenChange,
  profile,
}: DialogProfileImageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // 이미지 목록 생성
  const faceImages = Array.from({ length: 10 }, (_, i) => {
    const num = String(i + 1).padStart(2, "0");
    return `/face/face${num}.png`;
  });

  // 이미지 선택하기
  const handleImageSelect = async (imagePath: string) => {
    setIsLoading(true);

    try {
      // profiles 테이블 업데이트
      const { error } = await supabase
        .from("profiles")
        .update({ avatar_url: imagePath })
        .eq("id", profile.id);

      if (error) throw error;

      toast.success("프로필 이미지가 변경되었습니다.");
      onOpenChange(false);
      router.refresh();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "에러 발생";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

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
            <DialogTitle className="text-xl mt-2 font-nanumNeo">
              프로필 이미지를 변경 할 수 있습니다.
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-center font-nanumNeo break-keep">
            추후 더 다양한 이미지가 <br /> 순차적으로 추가될 예정입니다.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-5 gap-2 py-4">
          {faceImages.map((imagePath, index) => (
            <Button
              key={imagePath}
              variant="outline"
              onClick={() => handleImageSelect(imagePath)}
              disabled={isLoading}
              className="relative aspect-square rounded-full overflow-hidden border-2 hover:border-red-500 transition-colors p-0 h-auto"
            >
              <Image
                src={imagePath}
                alt={`Face ${index + 1}`}
                width={100}
                height={100}
                className="object-cover w-full h-full"
              />
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
