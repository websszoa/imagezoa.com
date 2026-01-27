import Link from "next/link";
import { headerMenuItems } from "@/lib/menu";

export default function HeaderMenu() {
  return (
    <nav>
      <ul className="flex items-center gap-2 font-nanumNeo text-sm font-medium">
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
  );
}
