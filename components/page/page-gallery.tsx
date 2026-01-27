"use client";

import { Image } from "lucide-react";
import PageNoData from "./page-no-data";

export default function PageGallery() {
  return (
    <PageNoData
      icon={Image}
      title="생성한 이미지가 없습니다."
      description="AI로 나만의 이미지를 생성해보세요."
      buttonText="이미지 생성하기"
      buttonHref="/"
    />
  );
}
