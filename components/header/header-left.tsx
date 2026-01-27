import { TentTree } from "lucide-react";
import Link from "next/link";

export default function HeaderLeft() {
  return (
    <Link
      href="/"
      className="flex items-center gap-1 font-paperlogy font-extrabold text-brand text-xl"
    >
      <TentTree className="size-9" />
      image zoa
    </Link>
  );
}
