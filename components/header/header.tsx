import HeaderLeft from "./header-left";
import HeaderCenter from "./header-center";
import HeaderRight from "./header-right";

export default function Header() {
  return (
    <header>
      <div className="header__container grid grid-cols-2 md:grid-cols-12 items-center">
        <div className="md:col-span-3">
          <HeaderLeft />
        </div>
        <div className="md:col-span-6 hidden md:block">
          <HeaderCenter />
        </div>
        <div className="md:col-span-3">
          <HeaderRight />
        </div>
      </div>
    </header>
  );
}
