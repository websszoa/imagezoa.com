"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Profile } from "@/lib/types";
import { formatDateKo } from "@/lib/utils";
import { RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AdminMemberProps {
  initialMembers: Profile[];
}

export default function AdminMember({ initialMembers }: AdminMemberProps) {
  const router = useRouter();
  const [members] = useState<Profile[]>(initialMembers);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="md:p-6 md:space-y-6 p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold font-paperlogy flex items-center gap-2">
            회원 관리
          </h1>
          <p className="text-sm text-muted-foreground font-anyvid mt-1">
            전체 회원 목록을 확인하고 관리할 수 있습니다.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-muted-foreground font-paperlogy">
            전체 회원
          </p>
          <p className="text-2xl font-semibold font-paperlogy">
            {members.length}
          </p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-muted-foreground font-paperlogy">
            활성 회원
          </p>
          <p className="text-2xl font-semibold font-paperlogy text-green-600">
            {members.filter((m) => !m.is_deleted).length}
          </p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-muted-foreground font-paperlogy">
            탈퇴 회원
          </p>
          <p className="text-2xl font-semibold font-paperlogy text-red-600">
            {members.filter((m) => m.is_deleted).length}
          </p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-muted-foreground font-paperlogy">관리자</p>
          <p className="text-2xl font-semibold font-paperlogy text-brand">
            {members.filter((m) => m.role === "admin").length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-lg overflow-hidden font-anyvid">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[80px] text-center">이미지</TableHead>
              <TableHead className="">이름</TableHead>
              <TableHead className="">이메일</TableHead>
              <TableHead className=" text-center">역할</TableHead>
              <TableHead className=" text-center">방문</TableHead>
              <TableHead className=" text-center">상태</TableHead>
              <TableHead className="">가입일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  <div className="flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 animate-spin text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">
                      로딩 중...
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ) : members.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  <p className="text-muted-foreground">
                    등록된 회원이 없습니다.
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              members.map((member) => (
                <TableRow key={member.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 mx-auto">
                      <Image
                        src={member.avatar_url || "/face/face01.png"}
                        alt={member.full_name || "프로필"}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-nanumNeo font-medium">
                    {member.full_name || "-"}
                  </TableCell>
                  <TableCell className="font-nanumNeo text-muted-foreground">
                    {member.email || "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={
                        member.role === "admin" ? "default" : "secondary"
                      }
                      className={
                        member.role === "admin"
                          ? "bg-brand hover:bg-brand/90"
                          : ""
                      }
                    >
                      {member.role === "admin" ? "관리자" : "회원"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center font-nanumNeo">
                    {member.visit_count}회
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={member.is_deleted ? "destructive" : "outline"}
                      className={
                        !member.is_deleted
                          ? "border-green-500 text-green-600"
                          : ""
                      }
                    >
                      {member.is_deleted ? "탈퇴" : "활성"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-nanumNeo text-muted-foreground">
                    {formatDateKo(member.created_at)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
