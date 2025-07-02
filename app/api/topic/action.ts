import qs from "qs";

export async function getMatchingTopics(topicLabel: string) {
  const query = qs.stringify(
    {
      populate: {
        image: {
          fields: ["url"],
        },
        articles: { populate: "*" },
        seo: { populate: "*" },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(`${process.env.API_URL}/topics?${query}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Ошибка при загрузке данных");
  }
  const topicsData: any = await res.json();
  return topicsData.data.filter(
    (topic: { title: string }) => topic.title === topicLabel
  );
}
