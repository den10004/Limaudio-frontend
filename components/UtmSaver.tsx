"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function UtmSaver() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
    ];
    params.forEach((param) => {
      const value = searchParams.get(param);
      if (value) {
        localStorage.setItem(param, value);
      }
    });
  }, [pathname, searchParams]);

  return null;
}
