import Link from "next/link";
import { headerMenuItems } from "@/lib/menu";

export default function HeaderCenter() {
  return (
    <div className="header__center">
      <nav>
        <ul className="flex items-center gap-2 font-kakaoSmall text-[15px] font-medium">
          {headerMenuItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="transition-colors hover:bg-gray-100 px-3 py-1 rounded-full"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
