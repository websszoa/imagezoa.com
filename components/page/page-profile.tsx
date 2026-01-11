"use client";

import { Separator } from "@/components/ui/separator";
import type { Profile } from "@/lib/types";
import PageProfileImage from "./page-profile-image";
import PageProfileItem from "./page-profile-item";

interface PageProfileProps {
  profile: Profile | null;
}

export default function PageProfile({ profile }: PageProfileProps) {
  if (!profile) {
    return null;
  }

  return (
    <div className="contact__container space-y-6 border p-4 md:p-6 rounded-2xl">
      <PageProfileImage profile={profile} />
      <Separator />
      <PageProfileItem profile={profile} />
    </div>
  );
}
