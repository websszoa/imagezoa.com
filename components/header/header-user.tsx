import Image from "next/image";
import { APP_SLOGAN } from "@/lib/constants";
import { Dessert, BadgeDollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HeaderUserProps } from "@/lib/types";

export default function HeaderUser({ user, profile }: HeaderUserProps) {
  return (
    <div className="p-4 border-b border-brand/5 bg-brand/5 mt-[-16px]">
      <div className="text-center py-2">
        <div className="flex justify-center mb-2">
          <div className="w-16 h-16 border-brand/10 flex items-center justify-center overflow-hidden p-1">
            {user && profile?.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt={profile.full_name || "프로필 이미지"}
                width={80}
                height={80}
                className="w-full h-full object-cover bg-brand/10 rounded-full"
              />
            ) : user ? (
              <div className="w-full h-full bg-brand flex items-center justify-center text-white font-medium text-xl rounded-full">
                {(profile?.full_name || user.email || "U")
                  .charAt(0)
                  .toUpperCase()}
              </div>
            ) : (
              <Image
                src="/face/face01.png"
                alt="프로필 이미지"
                width={80}
                height={80}
                className="w-full h-full object-cover bg-brand/10 rounded-full"
              />
            )}
          </div>
        </div>
        <h3 className="font-paperlogy font-bold text-lg text-gray-900 mb-1">
          {user
            ? `${profile?.full_name || "사용자"}님, 환영합니다!`
            : "방가워요! 환영합니다!"}
        </h3>
        <p className="font-nanumNeo text-sm text-gray-500 truncate mb-2">
          {user?.email || APP_SLOGAN}
        </p>

        {user && (
          <div className="flex items-center justify-center gap-1 font-paperlogy">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-brand/10 text-sm font-medium text-brand ">
              <BadgeDollarSign className="w-4 h-4 text-brand" />
              크레딧
              <span className="font-bold text-brand">3</span>
            </div>

            <Button
              variant="default"
              size="sm"
              className="h-8 px-3 text-red-500 bg-white border border-brand/10 text-sm font-medium rounded-full font-paperlogy flex items-center gap-1 hover:bg-red-100 hover:border-red-500/50"
            >
              <Dessert />
              충전하기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
