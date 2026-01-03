import {
  LucideIcon,
  Home,
  Newspaper,
  Rat,
  Grip,
  Hamburger,
  Ham,
} from "lucide-react";

export interface HeaderMenuItem {
  label: string;
  href: string;
}
export interface MenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

// 헤더 메뉴
export const headerMenuItems: HeaderMenuItem[] = [
  { label: "생성하기", href: "/" },
  { label: "갤러리", href: "/gallery" },
  { label: "가격", href: "/price" },
  { label: "문의하기", href: "/contact" },
];

// 모바일 메뉴
export const mobileMenuItems: MenuItem[] = [
  { icon: Home, label: "홈", href: "/" },
  { icon: Newspaper, label: "공지사항", href: "/notice" },
  { icon: Rat, label: "문의하기", href: "/contact" },
  { icon: Grip, label: "더보기", href: "#more" },
];

// 푸터 메뉴
export const footerMenuItems: MenuItem[] = [
  { icon: Hamburger, label: "문의사항", href: "/contact" },
  { icon: Ham, label: "제보하기", href: "/submit" },
];
