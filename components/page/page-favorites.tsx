"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import GalleryGrid from "@/components/gallery/gallery-grid";

const logoImages: string[] = [];
const productImages: string[] = [];

type TabType = "logo" | "product";

export default function PageFavorites() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("logo");
  const currentImages = activeTab === "logo" ? logoImages : productImages;
  const imageFolder = activeTab === "logo" ? "/logo" : "/product";
  const hasImages = currentImages.length > 0;

  return (
    <div className="product__gallery">
      {hasImages ? (
        <GalleryGrid
          images={currentImages}
          folder={imageFolder}
          altPrefix={
            activeTab === "logo" ? "Favorite Logo" : "Favorite Product"
          }
        />
      ) : (
        <div className="rounded-lg border border-gray-200 py-16 px-6 text-center">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-700 mb-2 font-paperlogy">
            즐겨찾기가 없습니다
          </h3>
          <p className="text-sm text-muted-foreground font-nanumNeo mb-4">
            관심 있는 이미지를 즐겨찾기에 추가해보세요.
          </p>
          <Button variant="destructive" onClick={() => router.push("/gallery")}>
            갤러리 가기
          </Button>
        </div>
      )}
    </div>
  );
}
