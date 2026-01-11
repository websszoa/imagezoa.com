"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import DialogDeleteAccount from "@/components/dialog/dialog-delete-account";
import type { Profile } from "@/lib/types";
import { Mail, UserIcon, Shield, Crown, Calendar, Trash2 } from "lucide-react";

interface PageProfileItemProps {
  profile: Profile;
}

export default function PageProfileItem({ profile }: PageProfileItemProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const displayName = profile.full_name || "이름 없음";
  const email = profile.email || "이메일 없음";
  const role = profile.role === "admin" ? "관리자" : "일반 사용자";
  const createdAt = formatDate(profile.created_at);

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
          <UserIcon className="w-5 h-5 text-orange-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-muted-foreground font-nanumNeo mb-1">
            이름
          </p>
          <p className="text-sm font-nanumNeo text-gray-900">{displayName}</p>
        </div>
      </div>

      <Separator />

      <div className="flex items-start gap-4">
        <div className="shrink-0 w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
          <Mail className="w-5 h-5 text-red-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-muted-foreground font-nanumNeo mb-1">
            이메일
          </p>
          <p className="text-sm font-nanumNeo text-gray-900 break-all">
            {email}
          </p>
        </div>
      </div>

      <Separator />

      <div className="flex items-start gap-4">
        <div className="shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
          <Calendar className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-muted-foreground font-nanumNeo mb-1">
            가입일
          </p>
          <p className="text-sm font-nanumNeo text-gray-900">{createdAt}</p>
        </div>
      </div>

      <Separator />

      <div className="flex items-start gap-4">
        <div className="shrink-0 w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
          {profile.role === "admin" ? (
            <Crown className="w-5 h-5 text-purple-600" />
          ) : (
            <Shield className="w-5 h-5 text-purple-600" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-muted-foreground font-nanumNeo mb-1">
            권한
          </p>
          <p className="text-sm font-nanumNeo text-gray-900">{role}</p>
        </div>
      </div>

      <Separator />

      <div className="pt-2 flex gap-2 justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsDeleteDialogOpen(true)}
          className="text-sm font-normal text-muted-foreground hover:bg-red-50 hover:border-red-300 hover:text-red-600 font-nanumNeo transition-colors flex items-center gap-1"
        >
          <Trash2 className="w-4 h-4" />
          탈퇴하기
        </Button>
      </div>

      <DialogDeleteAccount
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        profile={profile}
      />
    </div>
  );
}
