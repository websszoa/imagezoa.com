"use client";

import { Image } from "lucide-react";
import PageNoData from "./page-no-data";

export default function PageMyGallery() {
  return (
    <PageNoData
      icon={Image}
      title="나의 갤러리가 없습니다."
      description="관심 있는 이미지를 생성해보세요."
      buttonText="이미지 생성하기"
      buttonHref="/"
    />
  );
}
