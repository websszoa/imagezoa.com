import AdminMember from "@/components/admin/admin-member";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { Profile } from "@/lib/types";

async function getMembers(): Promise<Profile[]> {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching members:", error);
    return [];
  }

  return data || [];
}

export default async function AdminMemberPage() {
  const members = await getMembers();

  return <AdminMember initialMembers={members} />;
}
