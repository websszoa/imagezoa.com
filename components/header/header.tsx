import HeaderLeft from "./header-left";
import HeaderMenu from "./header-menu";
import HeaderRight from "./header-right";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-gray-100">
      <div className="header__container grid grid-cols-2 md:grid-cols-12 items-center">
        <div className="md:col-span-3 flex items-center justify-start">
          <HeaderLeft />
        </div>
        <div className="md:col-span-6 hidden md:flex items-center justify-center">
          <HeaderMenu />
        </div>
        <div className="md:col-span-3 flex items-center justify-end gap-2">
          <HeaderRight />
        </div>
      </div>
    </header>
  );
}
