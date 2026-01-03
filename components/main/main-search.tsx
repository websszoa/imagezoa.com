"use client";

import { useState } from "react";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const suggestedPrompts = [
  "펭귄 마법사",
  "선글라스를 쓴 고양이",
  "핑크 아이싱 케이크",
  "탑햇을 쓴 상어",
  "스케이트보드를 탄 공룡",
];

export default function MainSearch() {
  const [prompt, setPrompt] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleSuggestedPrompt = (suggested: string) => {
    setPrompt(suggested);
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
            className="w-full min-h-28 text-sm rounded-3xl px-4 py-3 pr-32 bg-zinc-50 border-zinc-200 text-muted-foreground resize-none -mt-1"
          />
          <Button
            onClick={() => setIsLoginOpen(true)}
            className="absolute bottom-3 right-3 rounded-full px-4 md:px-6 h-8 md:h-10 bg-brand text-white hover:bg-black/90 md:text-sm text-xs"
          >
            무료 회원가입
          </Button>
        </div>

        {/* 제안 프롬프트 */}
        <div className="flex flex-wrap gap-2 justify-center">
          {suggestedPrompts.map((suggested) => (
            <Button
              key={suggested}
              variant="outline"
              className="rounded-full px-5 py-2 h-auto bg-zinc-100 border-zinc-200 hover:bg-bg-zinc-200 border-0 md:text-sm text-xs font-normal text-muted-foreground"
              onClick={() => handleSuggestedPrompt(suggested)}
            >
              {suggested}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
