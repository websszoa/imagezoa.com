"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ImageIcon,
  Sparkles,
  Loader2,
  ImagePlus,
  X,
  Settings2,
} from "lucide-react";

// 모델 옵션
const models = [
  { value: "AUTO", label: "Auto (자동)" },
  { value: "V_3", label: "3.0 (latest)" },
  { value: "V_3_MARCH", label: "3.0 (March 26)" },
  { value: "V_2", label: "2.0" },
  { value: "V_2_TURBO", label: "2.0 Turbo" },
];

// 비율 옵션
const aspectRatios = [
  { value: "ASPECT_1_1", label: "1:1" },
  { value: "ASPECT_16_9", label: "16:9" },
  { value: "ASPECT_9_16", label: "9:16" },
  { value: "ASPECT_4_3", label: "4:3" },
  { value: "ASPECT_3_4", label: "3:4" },
  { value: "ASPECT_3_2", label: "3:2" },
  { value: "ASPECT_2_3", label: "2:3" },
];

// 스타일 옵션
const styleTypes = [
  { value: "AUTO", label: "자동" },
  { value: "REALISTIC", label: "사실적" },
  { value: "DESIGN", label: "디자인" },
  { value: "RENDER_3D", label: "3D 렌더" },
  { value: "ANIME", label: "애니메이션" },
];

// Magic Prompt 옵션
const magicPromptOptions = [
  { value: "ON", label: "On" },
  { value: "OFF", label: "Off" },
];

export default function MainPrompt() {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [model, setModel] = useState("AUTO");
  const [aspectRatio, setAspectRatio] = useState("ASPECT_1_1");
  const [styleType, setStyleType] = useState("AUTO");
  const [magicPrompt, setMagicPrompt] = useState("OFF");
  const [seed, setSeed] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    // TODO: 실제 이미지 생성 API 호출
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedImage(
        "/logo/a-modern-logo-design-featuring-the-brand_IB4uo_EcQha7DijR8ELqOg_OTDCu_QVQFqifOlH263V_A.jpeg",
      );
    }, 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setReferenceImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="main__container mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 왼쪽: 이미지 미리보기 */}
        <div className="aspect-square w-full rounded-2xl border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-12 h-12 text-brand animate-spin" />
              <p className="text-sm text-muted-foreground font-anyvid">
                이미지 생성 중...
              </p>
            </div>
          ) : generatedImage ? (
            <Image
              src={generatedImage}
              alt="Generated Image"
              width={512}
              height={512}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <ImageIcon className="w-16 h-16" />
              <p className="text-sm font-anyvid">
                생성된 이미지가 여기에 표시됩니다
              </p>
            </div>
          )}
        </div>

        {/* 오른쪽: 프롬프트 입력 및 옵션 */}
        <div>
          {/* 프롬프트 입력 */}
          <div className="space-y-2 mb-4">
            <Label className="text-sm font-medium font-anyvid">프롬프트</Label>
            <div className="relative">
              <Textarea
                placeholder="귀여운 고양이가 우주복을 입고 달에서 점프하는 모습"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="resize-none font-anyvid pr-12 pb-10 h-40"
              />
              {/* 이미지 추가 버튼 */}
              <div className="absolute bottom-2 right-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="reference-image"
                />
                <label
                  htmlFor="reference-image"
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors"
                  title="참조 이미지 추가"
                >
                  <ImagePlus className="w-4 h-4 text-muted-foreground" />
                </label>
              </div>
              {/* 참조 이미지 미리보기 */}
              {referenceImage && (
                <div className="absolute bottom-2 left-2 flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded overflow-hidden border border-gray-200">
                    <Image
                      src={referenceImage}
                      alt="Reference"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    onClick={() => setReferenceImage(null)}
                    className="w-5 h-5 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 옵션들 - 모델, 비율, 스타일 (3칸) */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {/* 모델 */}
            <div className="space-y-2">
              <Label className="text-sm font-medium font-anyvid">모델</Label>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="w-full font-anyvid">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {models.map((m) => (
                    <SelectItem
                      key={m.value}
                      value={m.value}
                      className="font-anyvid"
                    >
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 비율 */}
            <div className="space-y-2">
              <Label className="text-sm font-medium font-anyvid">비율</Label>
              <Select value={aspectRatio} onValueChange={setAspectRatio}>
                <SelectTrigger className="w-full font-anyvid">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {aspectRatios.map((ratio) => (
                    <SelectItem
                      key={ratio.value}
                      value={ratio.value}
                      className="font-anyvid"
                    >
                      {ratio.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 스타일 */}
            <div className="space-y-2">
              <Label className="text-sm font-medium font-anyvid">스타일</Label>
              <Select value={styleType} onValueChange={setStyleType}>
                <SelectTrigger className="w-full font-anyvid">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {styleTypes.map((style) => (
                    <SelectItem
                      key={style.value}
                      value={style.value}
                      className="font-anyvid"
                    >
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 고급 옵션 토글 */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-anyvid"
            >
              <Settings2 className="w-4 h-4" />
              고급 옵션 {showAdvanced ? "숨기기" : "보기"}
            </button>

            {/* 고급 옵션 패널 */}
            {showAdvanced && (
              <div className="mt-3 p-2 md:p-4 rounded-lg bg-gray-50 border border-gray-200 space-y-4">
                {/* 씨드, 매직 (2칸) */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Seed */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium font-anyvid">
                      Seed (일관성 유지 번호)
                    </Label>
                    <Input
                      type="number"
                      placeholder="Optional"
                      value={seed}
                      onChange={(e) => setSeed(e.target.value)}
                      className="font-anyvid bg-white"
                    />
                  </div>

                  {/* Magic Prompt */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium font-anyvid">
                      Magic (매직 효과)
                    </Label>
                    <Select value={magicPrompt} onValueChange={setMagicPrompt}>
                      <SelectTrigger className="w-full font-anyvid bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {magicPromptOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="font-anyvid"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Negative Prompt */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium font-anyvid">
                    Negative Prompt (제거 요소)
                  </Label>
                  <Textarea
                    placeholder="피하고 싶은 요소를 입력하세요"
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                    rows={2}
                    className="resize-none font-anyvid bg-white"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 생성 버튼 */}
          <Button
            size="lg"
            className="w-full bg-brand hover:bg-brand/90 font-anyvid text-base"
            onClick={handleGenerate}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                생성 중...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                이미지 생성하기
              </>
            )}
          </Button>

          {/* 안내 문구 */}
          <p className="text-xs text-muted-foreground text-center font-anyvid mt-2">
            이미지 생성에는 크레딧이 소모됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
