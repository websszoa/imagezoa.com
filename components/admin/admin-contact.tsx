"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Contact } from "@/lib/types";
import { formatDateKo } from "@/lib/utils";
import { RefreshCw, MessageSquare } from "lucide-react";
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

interface AdminContactProps {
  initialContacts: Contact[];
}

// 상태 뱃지
function getStatusBadge(status: Contact["status"]) {
  switch (status) {
    case "pending":
      return <Badge variant="secondary">대기</Badge>;
    case "in_progress":
      return (
        <Badge className="bg-yellow-500 hover:bg-yellow-600">처리중</Badge>
      );
    case "resolved":
      return <Badge className="bg-green-500 hover:bg-green-600">완료</Badge>;
    case "closed":
      return <Badge variant="outline">종료</Badge>;
    default:
      return <Badge variant="outline">-</Badge>;
  }
}

export default function AdminContact({ initialContacts }: AdminContactProps) {
  const router = useRouter();
  const [contacts] = useState<Contact[]>(initialContacts);
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    router.refresh();
    setTimeout(() => setIsLoading(false), 500);
  };

  // 통계 계산
  const totalCount = contacts.length;
  const pendingCount = contacts.filter((c) => c.status === "pending").length;
  const inProgressCount = contacts.filter(
    (c) => c.status === "in_progress",
  ).length;
  const resolvedCount = contacts.filter((c) => c.status === "resolved").length;

  return (
    <div className="md:p-6 md:space-y-6 p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold font-paperlogy flex items-center gap-2">
            문의 관리
          </h1>
          <p className="text-sm text-muted-foreground font-anyvid mt-1">
            사용자 문의를 확인하고 답변할 수 있습니다.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isLoading}
          className="font-anyvid text-sm text-muted-foreground"
        >
          <RefreshCw
            className={`w-4 h-4 mr-1 ${isLoading ? "animate-spin" : ""}`}
          />
          새로고침
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-muted-foreground font-paperlogy">
            전체 문의
          </p>
          <p className="text-2xl font-semibold font-paperlogy">{totalCount}</p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-muted-foreground font-paperlogy">
            대기 중
          </p>
          <p className="text-2xl font-semibold font-paperlogy text-gray-600">
            {pendingCount}
          </p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-muted-foreground font-paperlogy">
            처리 중
          </p>
          <p className="text-2xl font-semibold font-paperlogy text-yellow-600">
            {inProgressCount}
          </p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-muted-foreground font-paperlogy">완료</p>
          <p className="text-2xl font-semibold font-paperlogy text-green-600">
            {resolvedCount}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-lg overflow-hidden font-anyvid">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[50px] text-center">No</TableHead>
              <TableHead className="max-w-[300px]">문의 내용</TableHead>
              <TableHead className="text-center">상태</TableHead>
              <TableHead className="text-center">답변</TableHead>
              <TableHead className="">문의일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  <div className="flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 animate-spin text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">
                      로딩 중...
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ) : contacts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  <div className="flex flex-col items-center gap-2">
                    <MessageSquare className="w-8 h-8 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      등록된 문의가 없습니다.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              contacts.map((contact, index) => (
                <TableRow key={contact.id} className="hover:bg-gray-50">
                  <TableCell className="text-center text-muted-foreground">
                    {contacts.length - index}
                  </TableCell>
                  <TableCell className="max-w-[300px]">
                    <p
                      className="truncate text-muted-foreground"
                      title={contact.message}
                    >
                      {contact.message}
                    </p>
                  </TableCell>
                  <TableCell className="text-center">
                    {getStatusBadge(contact.status)}
                  </TableCell>
                  <TableCell className="text-center">
                    {contact.admin_reply ? (
                      <Badge className="bg-brand hover:bg-brand/90">완료</Badge>
                    ) : (
                      <Badge variant="outline">미답변</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDateKo(contact.created_at)}
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
