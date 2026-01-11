"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opacity, setOpacity] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    // 페이지 변경 시 opacity를 0으로 초기화
    setOpacity(0);
    
    // 약간의 딜레이 후 페이드인 시작
    const timer = setTimeout(() => {
      setOpacity(1);
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      style={{
        opacity,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      {children}
    </div>
  );
}

