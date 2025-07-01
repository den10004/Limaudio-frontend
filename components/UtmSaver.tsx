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
      "utm_campaign_name",
      "utm_content",
      "utm_term",
      "utm_placement",
      "utm_device",
      "utm_region_name",
      "utm_position",
      "utm_position_type",
      "utm_source_type",
      "yclid",
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
