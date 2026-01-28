"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GeneratedImage } from "@/lib/types";
import { formatDateKo } from "@/lib/utils";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AdminImagesProps {
  initialImages: GeneratedImage[];
}

export default function AdminImages({ initialImages }: AdminImagesProps) {
  const router = useRouter();
  const [images] = useState<GeneratedImage[]>(initialImages);
  const [isLoading, setIsLoading] = useState(false);

  // 통계 계산
  const totalCount = images.length;

  return (
    <div className="md:p-6 md:space-y-6 p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold font-paperlogy flex items-center gap-2">
            이미지 관리
          </h1>
          <p className="text-sm text-muted-foreground font-anyvid mt-1">
            생성된 이미지 목록을 확인하고 관리할 수 있습니다.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-muted-foreground font-paperlogy">
            전체 이미지
          </p>
          <p className="text-2xl font-semibold font-paperlogy">{totalCount}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-lg overflow-hidden font-anyvid">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[80px] text-center">미리보기</TableHead>
              <TableHead className="max-w-[200px]">프롬프트</TableHead>
              <TableHead className="w-[80px] text-center">Seed</TableHead>
              <TableHead className="text-center">비율</TableHead>
              <TableHead className="text-center">속도</TableHead>
              <TableHead className="text-center">스타일</TableHead>
              <TableHead className="text-center">모델</TableHead>
              <TableHead className="">생성일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10">
                  <div className="flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 animate-spin text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">
                      로딩 중...
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ) : images.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10">
                  <p className="text-muted-foreground">
                    생성된 이미지가 없습니다.
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              images.map((image) => (
                <TableRow key={image.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="w-12 h-12 rounded overflow-hidden bg-gray-100 mx-auto">
                      {image.r2_url ? (
                        <Image
                          src={image.r2_url}
                          alt={image.prompt?.slice(0, 20) || "이미지"}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                          -
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-anyvid max-w-[200px]">
                    <p className="truncate" title={image.prompt}>
                      {image.prompt || "-"}
                    </p>
                  </TableCell>
                  <TableCell className="text-left font-anyvid text-muted-foreground">
                    {image.seed || "-"}
                  </TableCell>
                  <TableCell className="text-center font-anyvid text-muted-foreground">
                    {image.aspect_ratio || "-"}
                  </TableCell>
                  <TableCell className="text-center font-anyvid text-muted-foreground">
                    {image.rendering_speed || "-"}
                  </TableCell>
                  <TableCell className="text-center font-anyvid text-muted-foreground">
                    {image.style_type || "-"}
                  </TableCell>
                  <TableCell className="text-center font-anyvid text-muted-foreground">
                    {image.model || "-"}
                  </TableCell>
                  <TableCell className="font-anyvid text-muted-foreground">
                    {formatDateKo(image.created_at)}
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
