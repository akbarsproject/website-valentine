"use client";

import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

type SoundControlProps = {
  enabled: boolean;
  onToggle: () => void;
};

export default function SoundControl({ enabled, onToggle }: SoundControlProps) {
  return (
    <Button
      variant={enabled ? "primary" : "ghost"}
      size="md"
      onClick={onToggle}
      className="rounded-full px-4"
    >
      {enabled ? (
        <>
          <Volume2 className="h-4 w-4" />
          Sound On
        </>
      ) : (
        <>
          <VolumeX className="h-4 w-4" />
          Sound Off
        </>
      )}
    </Button>
  );
}
