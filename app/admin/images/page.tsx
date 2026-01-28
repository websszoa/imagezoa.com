import AdminImages from "@/components/admin/admin-images";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { GeneratedImage } from "@/lib/types";

async function getImages(): Promise<GeneratedImage[]> {
  const { data, error } = await supabaseAdmin
    .from("images")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching images:", error);
    return [];
  }

  return data || [];
}

export default async function AdminImagesPage() {
  const images = await getImages();

  return <AdminImages initialImages={images} />;
}
