import qs from "qs";

if (!process.env.API_URL || !process.env.TOKEN) {
  throw new Error("Missing API_URL or TOKEN in environment variables");
}

export async function getBrandsBySlug(slug: string): Promise<any | null> {
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
    next: { revalidate: 1 },
  });

  if (!res.ok) {
    console.error("Error fetching article:", res.status);
    return null;
  }

  const data = await res.json();
  const brand = data?.data?.[0] ?? null;

  return brand;
  // return data?.data?.[0] ?? null;
}
