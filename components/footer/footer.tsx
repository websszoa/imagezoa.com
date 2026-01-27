import FooterMenu from "./footer-menu";
import FooterInfo from "./footer-info";
import FooterBottom from "./footer-bottom";

export default function Footer() {
  return (
    <footer className="footer__container max-w-7xl mx-auto px-4 md:px-6 pt-8 pb-18 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 border-t border-gray-300/40 pt-12">
        <FooterInfo />
        <FooterMenu />
      </div>
      <FooterBottom />
    </footer>
  );
}
