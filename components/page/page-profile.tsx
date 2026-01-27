"use client";

import Image from "next/image";
import { useState } from "react";
import type { Profile } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import DialogProfileImage from "@/components/dialog/dialog-profile-image";
import DialogProfileName from "@/components/dialog/dialog-profile-name";
import DialogDeleteAccount from "@/components/dialog/dialog-delete-account";
import {
  Calendar,
  Camera,
  Eye,
  LogOut,
  Mail,
  Pencil,
  Shield,
  Trash2,
  UserIcon,
} from "lucide-react";

interface PageProfileProps {
  profile: Profile | null;
}

export default function PageProfile({ profile }: PageProfileProps) {
  const router = useRouter();
  const supabase = createClient();

  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isNameDialogOpen, setIsNameDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  console.log(profile);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("로그아웃 중 오류가 발생했습니다.");
    } else {
      toast.success("로그아웃 되었습니다.");
      router.refresh();
      router.push("/");
    }
  };

  return (
    <div className="contact__container">
      <div className="flex flex-col items-center justify-center gap-2 mb-6">
        <button
          type="button"
          className="relative w-20 h-20 rounded-full bg-green-100 flex items-center justify-center overflow-hidden cursor-pointer group"
          onClick={() => setIsImageDialogOpen(true)}
        >
          <Image
            src={profile?.avatar_url || "/face/face01.png"}
            alt={profile?.full_name ?? "프로필"}
            width={80}
            height={80}
            className="w-full h-full object-cover rounded-full"
            referrerPolicy="no-referrer"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-6 h-6 text-white" />
          </div>
        </button>

        <div className="font-paperlogy text-base md:text-xl text-gray-900 flex items-center gap-2">
          {profile?.full_name ?? "이름 없음"}
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 rounded-full p-0 bg-gray-100 hover:bg-gray-200"
            onClick={() => setIsNameDialogOpen(true)}
          >
            <Pencil />
          </Button>
        </div>
      </div>

      <Separator />

      <div className="space-y-4 mt-4">
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-orange-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground font-anyvid mb-1">
              이름
            </p>
            <p className="text-sm font-anyvid text-gray-900">
              {profile?.full_name ?? "이름 없음"}
            </p>
          </div>
        </div>

        <Separator />

        <div className="flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
            <Mail className="w-5 h-5 text-red-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground font-anyvid mb-1">
              이메일
            </p>
            <p className="text-sm font-anyvid text-gray-900 break-all">
              {profile?.email ?? "이메일 없음"}
            </p>
          </div>
        </div>

        <Separator />

        <div className="flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
            <Shield className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground font-anyvid mb-1">
              역할
            </p>
            <p className="text-sm font-anyvid text-gray-900">
              {profile?.role === "admin" ? "관리자" : "일반사용자"}
            </p>
          </div>
        </div>

        <Separator />

        <div className="flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground font-anyvid mb-1">
              가입일
            </p>
            <p className="text-sm font-anyvid text-gray-900">
              {profile?.created_at
                ? new Date(profile.created_at).toLocaleDateString("ko-KR")
                : "날짜 없음"}
            </p>
          </div>
        </div>

        <Separator />

        <div className="flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
            <Eye className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground font-anyvid mb-1">
              방문횟수
            </p>
            <p className="text-sm font-anyvid text-gray-900">
              {profile?.visit_count ?? 1}회
            </p>
          </div>
        </div>

        <Separator />

        <div className="pt-2 flex gap-2 justify-center">
          <Button
            variant="outline"
            size="sm"
            className="text-sm font-normal text-muted-foreground hover:bg-green-50 hover:border-green-600 hover:text-green-700 font-anyvid transition-colors flex items-center gap-1"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            로그아웃
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-sm font-normal text-muted-foreground hover:bg-red-50 hover:border-red-300 hover:text-red-600 font-anyvid transition-colors flex items-center gap-1"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="w-4 h-4" />
            탈퇴하기
          </Button>
        </div>
      </div>

      <DialogProfileImage
        open={isImageDialogOpen}
        onOpenChange={setIsImageDialogOpen}
        currentImage={profile?.avatar_url}
      />
      <DialogProfileName
        open={isNameDialogOpen}
        onOpenChange={setIsNameDialogOpen}
        currentName={profile?.full_name}
      />
      <DialogDeleteAccount
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </div>
  );
}
