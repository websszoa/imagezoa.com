import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="main__container max-w-[2000px]">{children}</main>
      <Footer />
    </>
  );
}
