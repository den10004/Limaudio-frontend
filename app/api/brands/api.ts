import qs from "qs";

const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 60 * 1000;

if (!process.env.API_URL || !process.env.TOKEN) {
  throw new Error("Missing API_URL or TOKEN in environment variables");
}

export async function getBrandsBySlug(slug: string): Promise<any | null> {
  const cached = cache.get(slug);
  const now = Date.now();

  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const query = qs.stringify(
    {
      filters: { slug: { $eq: slug } },
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(`${process.env.API_URL}/brends?${query}`, {
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error("Error fetching article:", res.status);
    return null;
  }

  const data = await res.json();
  const brand = data?.data?.[0] ?? null;

  // Store in cache
  cache.set(slug, { data: brand, timestamp: now });

  return brand;
}
