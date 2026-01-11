import HeaderLeft from "./header-left";
import HeaderCenter from "./header-center";

import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types";
import HeaderRight from "./header-right";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile: Profile | null = null;

  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("id, avatar_url, full_name, email, role")
      .eq("id", user.id)
      .is("deleted_at", null)
      .single();

    if (data) {
      profile = {
        id: data.id,
        avatar_url: data.avatar_url,
        full_name: data.full_name,
        email: data.email,
        role: data.role || "user",
      };
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-gray-100">
      <div className="header__container grid grid-cols-2 md:grid-cols-12 items-center">
        <div className="md:col-span-3 flex items-center justify-start">
          <HeaderLeft />
        </div>
        <div className="md:col-span-6 hidden md:flex items-center justify-center">
          <HeaderCenter />
        </div>
        <div className="md:col-span-3 flex items-center justify-end gap-2">
          <HeaderRight user={user} profile={profile} />
        </div>
      </div>
    </header>
  );
}
