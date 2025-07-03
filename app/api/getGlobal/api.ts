export async function getGlobal() {
  const res = await fetch(`${process.env.API_URL}/global?populate=*`, {
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
    next: { revalidate: 60 },
  });

  console.log("Fetch status:", res.status);
  if (!res.ok) {
    const errorData = await res.text();
    console.error("Global fetch error:", errorData);
    throw new Error("Failed to fetch global data");
  }

  const data = await res.json();
  return data;
}
