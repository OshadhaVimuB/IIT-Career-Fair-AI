"use client";

import { useEffect } from "react";

export default function LucideInit() {
  useEffect(() => {
    // @ts-ignore
    if (window.lucide) {
      // @ts-ignore
      window.lucide.createIcons();
    }
  }, []);

  return null;
}
