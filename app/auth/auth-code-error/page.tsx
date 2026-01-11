import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthCodeErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 font-nanumNeo">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">로그인 오류</h1>
          <p className="text-muted-foreground">
            인증 코드 처리 중 문제가 발생했습니다.
          </p>
        </div>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            다시 시도해주시거나 홈으로 돌아가주세요.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button asChild>
              <Link href="/">홈으로 가기</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">다시 시도</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
