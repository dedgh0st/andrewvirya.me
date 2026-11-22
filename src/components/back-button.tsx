"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      className="w-full sm:w-auto"
      variant="outline"
      onClick={() => router.back()}
    >
      Back
    </Button>
  );
}
