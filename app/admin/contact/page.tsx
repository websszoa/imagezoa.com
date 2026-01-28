import AdminContact from "@/components/admin/admin-contact";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { Contact } from "@/lib/types";

async function getContacts(): Promise<Contact[]> {
  const { data, error } = await supabaseAdmin
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }

  return data || [];
}

export default async function AdminContactPage() {
  const contacts = await getContacts();

  return <AdminContact initialContacts={contacts} />;
}
