"use client";

import Image from "next/image";
import { GeneratedImage } from "@/lib/types";

interface MainGalleryProps {
  initialImages: GeneratedImage[];
}

export default function MainGallery({ initialImages }: MainGalleryProps) {
  if (initialImages.length === 0) {
    return (
      <div className="main__container mt-10">
        <div className="text-center py-20 border border-dashed border-gray-300 rounded-lg p-4">
          <p className="text-muted-foreground font-anyvid">
            아직 생성된 이미지가 없습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="main__container mt-10 pb-20">
      {/* 섹션 타이틀 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold font-paperlogy text-slate-900">
          최근 생성된 이미지
        </h2>
        <p className="text-sm text-muted-foreground font-anyvid mt-1">
          다른 사용자들이 만든 창작물을 구경해보세요
        </p>
      </div>

      {/* 핀터레스트 스타일 Masonry 그리드 */}
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
        {initialImages.map((image) => (
          <div
            key={image.id}
            className="break-inside-avoid group cursor-pointer"
          >
            <div className="relative rounded-xl overflow-hidden bg-gray-100">
              {image.r2_url ? (
                <Image
                  src={image.r2_url}
                  alt={image.prompt || "Generated image"}
                  width={400}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
              ) : (
                <div className="w-full aspect-square flex items-center justify-center text-muted-foreground">
                  No Image
                </div>
              )}

              {/* 호버 시 오버레이 */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-anyvid line-clamp-2">
                    {image.prompt}
                  </p>
                  {image.style_type && (
                    <span className="inline-block mt-1 text-xs text-white/80 bg-white/20 px-2 py-0.5 rounded-full">
                      {image.style_type}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
