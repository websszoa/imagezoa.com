"use client";

import { Button } from "@/components/ui/button";

export default function HeaderRight() {
  return (
    <div className="header__right">
      <div className="flex items-center gap-2">
        <Button variant="default" className="rounded-full">
          Get started
        </Button>
      </div>
    </div>
  );
}
