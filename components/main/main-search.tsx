"use client";

import Image from "next/image";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/contexts/login-context";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

const suggestedPrompts = [
  "프리미엄 브랜드 로고 컬렉션 스타일",
  "미니멀하고 현대적인 로고 디자인",
  "깔끔한 벡터 로고",
  "플랫 디자인",
  "고급 브랜드 아이덴티티 느낌",
];

export default function MainSearch() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  );
  const [aspectRatio, setAspectRatio] = useState("1x1");
  const [renderingSpeed, setRenderingSpeed] = useState("DEFAULT");
  const [styleType, setStyleType] = useState("AUTO");
  const { openLogin } = useLogin();

  const handleSuggestedPrompt = (suggested: string) => {
    setPrompt(suggested);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("프롬프트를 입력해주세요.");
      return;
    }

    try {
      // 로그인 상태 확인
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        openLogin();
        return;
      }

      setIsGenerating(true);

      // API 호출
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          aspect_ratio: aspectRatio,
          rendering_speed: renderingSpeed,
          style_type: styleType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "이미지 생성에 실패했습니다.");
      }

      // 성공 시 처리
      if (data.data && data.data.length > 0) {
        const imageUrl = data.data[0].url;
        setGeneratedImageUrl(imageUrl);
        toast.success("이미지가 생성되었습니다!");
      } else {
        toast.error("이미지를 받아오지 못했습니다.");
      }
    } catch (error) {
      console.error("이미지 생성 에러:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "이미지 생성 중 오류가 발생했습니다."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="main__search">
      <div className="max-w-[600px] mx-auto">
        {/* 이미지 */}
        <div className="w-full">
          <Image
            src="/home-cover.webp"
            alt="AI Image Generator"
            width={800}
            height={400}
            className="w-full h-auto rounded-lg object-cover"
            priority
          />
        </div>

        {/* 입력 필드와 버튼 */}
        <div className="relative mb-4">
          <Textarea
            placeholder="프롬프트를 작성해주세요!"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full min-h-28 text-sm rounded-3xl px-4 py-3 pr-32 bg-zinc-50 border-zinc-200 text-muted-foreground resize-none -mt-1 font-kakaoSmall font-light"
          />
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="absolute bottom-3 right-3 rounded-full px-4 md:px-6 h-8 md:h-10 bg-brand text-white hover:bg-black/90 md:text-sm text-xs disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                생성 중...
              </>
            ) : (
              "로고 만들기"
            )}
          </Button>
        </div>

        {/* 옵션 선택 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div className="space-y-2">
            <label
              htmlFor="aspect-ratio"
              className="text-xs font-medium text-muted-foreground font-kakaoSmall"
            >
              종횡비
            </label>
            <select
              id="aspect-ratio"
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
              className="w-full h-10 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-kakaoSmall text-foreground focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
            >
              <option value="1x1">1:1 (정사각형)</option>
              <option value="4x3">4:3 (가로형)</option>
              <option value="3x4">3:4 (세로형)</option>
              <option value="16x9">16:9 (와이드)</option>
              <option value="9x16">9:16 (세로 와이드)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="rendering-speed"
              className="text-xs font-medium text-muted-foreground font-kakaoSmall"
            >
              렌더링 속도
            </label>
            <select
              id="rendering-speed"
              value={renderingSpeed}
              onChange={(e) => setRenderingSpeed(e.target.value)}
              className="w-full h-10 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-kakaoSmall text-foreground focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
            >
              <option value="FLASH">FLASH (매우 빠름)</option>
              <option value="TURBO">TURBO (빠름)</option>
              <option value="DEFAULT">DEFAULT (기본)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="style-type"
              className="text-xs font-medium text-muted-foreground font-kakaoSmall"
            >
              스타일 타입
            </label>
            <select
              id="style-type"
              value={styleType}
              onChange={(e) => setStyleType(e.target.value)}
              className="w-full h-10 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-kakaoSmall text-foreground focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
            >
              <option value="AUTO">AUTO (자동)</option>
              <option value="GENERAL">GENERAL (일반)</option>
              <option value="REALISTIC">REALISTIC (사실적)</option>
              <option value="DESIGN">DESIGN (디자인)</option>
              <option value="FICTION">FICTION (판타지)</option>
            </select>
          </div>
        </div>

        {/* 제안 프롬프트 */}
        <div className="flex flex-wrap gap-2 justify-center">
          {suggestedPrompts.map((suggested) => (
            <Button
              key={suggested}
              variant="outline"
              className="rounded-full px-5 py-2 h-auto bg-zinc-100 border-zinc-200 hover:bg-bg-zinc-200 border-0 md:text-sm text-xs text-muted-foreground font-kakaoSmall font-light"
              onClick={() => handleSuggestedPrompt(suggested)}
            >
              {suggested}
            </Button>
          ))}
        </div>

        {/* 생성된 이미지 */}
        {generatedImageUrl && (
          <div className="w-full mt-6">
            <div className="rounded-lg overflow-hidden border border-zinc-200 bg-white p-4">
              <Image
                src={generatedImageUrl}
                alt="생성된 이미지"
                width={800}
                height={800}
                className="w-full h-auto rounded-lg object-cover"
                unoptimized
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
