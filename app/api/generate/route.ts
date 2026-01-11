import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {
      prompt,
      aspect_ratio = "1x1",
      rendering_speed = "DEFAULT",
      style_type = "AUTO",
    } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "프롬프트가 필요합니다." },
        { status: 400 }
      );
    }

    const apiKey = process.env.IDEOGRAM_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API 키가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    // FormData 생성
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("aspect_ratio", aspect_ratio);
    formData.append("rendering_speed", rendering_speed);
    formData.append("style_type", style_type);

    // Ideogram API 호출
    const response = await fetch(
      "https://api.ideogram.ai/v1/ideogram-v3/generate",
      {
        method: "POST",
        headers: {
          "Api-Key": apiKey,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Ideogram API 에러:", errorData);
      return NextResponse.json(
        { error: "이미지 생성에 실패했습니다." },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("이미지 생성 에러:", error);
    return NextResponse.json(
      { error: "서버 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}
