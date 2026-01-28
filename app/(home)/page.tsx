import MainTitle from "@/components/main/main-title";
import MainMarquee from "@/components/main/main-marquee";
import MainPrompt from "@/components/main/main-prompt";
import MainGallery from "@/components/main/main-gallery";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { GeneratedImage } from "@/lib/types";

async function getImages(): Promise<GeneratedImage[]> {
  const { data, error } = await supabaseAdmin
    .from("images")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(30);

  if (error) {
    console.error("Error fetching images:", error);
    return [];
  }
  return data || [];
}

export default async function HomePage() {
  const images = await getImages();

  return (
    <>
      <MainTitle />
      <MainMarquee />
      <MainPrompt />
      <MainGallery initialImages={images} />
    </>
  );
}
