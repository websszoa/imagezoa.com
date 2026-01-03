import Link from "next/link";
import { Heart, Tent } from "lucide-react";
import { footerMenuItems } from "@/lib/menu";
import { APP_COPYRIGHT, APP_DESCRIPTION, APP_SLOGAN } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="footer__container mx-auto px-4 md:px-6 py-4 mt-6 pb-18 md:pb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-300/40 pt-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-extrabold font-paperlogy text-brand mb-4 flex items-center gap-1">
              <Tent className="size-9" />
              image zoa
            </h3>
          </div>
          <p className="font-nanumNeo text-sm text-muted-foreground leading-5 mb-2 break-keep">
            <strong className="block mb-1">{APP_SLOGAN}</strong>
            {APP_DESCRIPTION}
          </p>

          <div className="flex items-center flex-wrap gap-3 text-sm font-nanumNeo text-muted-foreground">
            {footerMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-1 hover:text-brand transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300/40 my-8 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-muted-foreground font-nanumNeo">
          <div className="text-xs">{APP_COPYRIGHT}</div>
          <div className="flex items-center gap-2 text-xs">
            <span>Made with</span>
            <Heart className="h-4 w-4 hover:text-brand" />
            <span>for AI creators</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
