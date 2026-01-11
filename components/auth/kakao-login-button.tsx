import { Button } from "@/components/ui/button";

export default function KakaoLoginButton() {
  return (
    <div className="relative">
      <Button className="w-full h-10 bg-[#FEE500] hover:bg-[#FEE500]/80 text-[#000000] font-medium justify-center gap-1 transition-colors duration-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="#3C1E1E"
          viewBox="0 0 21 21"
        >
          <path
            fill="current"
            d="M10.5 3.217c4.514 0 8 2.708 8 6.004 0 3.758-4.045 6.184-8 5.892-1.321-.093-1.707-.17-2.101-.23-1.425.814-2.728 2.344-3.232 2.334-.325-.19.811-2.896.533-3.114-.347-.244-3.157-1.329-3.2-4.958 0-3.199 3.486-5.928 8-5.928Z"
          ></path>
        </svg>
        카카오 로그인
      </Button>
    </div>
  );
}
