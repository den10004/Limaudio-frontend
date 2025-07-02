import { CardsResponse } from "@/types/card";
import Headline from "@/app/UI/headline";
import ClientCategoryPage from "./ClientCategoryPage";
import qs from "qs";

type CategoryPageParams = {
  category: string;
};

type CategoryMap = {
  obzory: string;
  sravneniya: string;
  topy: string;
  "gaydy-i-sovety": string;
  [key: string]: string;
};

const categoryMap: CategoryMap = {
  obzory: "Обзоры",
  sravneniya: "Сравнения",
  topy: "Топы",
  "gaydy-i-sovety": "Гайды и советы",
};

async function getMatchingCategory() {
  const query = qs.stringify(
    {
      populate: {
        seo: { populate: "*" },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(`${process.env.API_URL}/categories?${query}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Ошибка при загрузке данных");
  }
  const categoryData: any = await res.json();
  return categoryData;
}

export async function generateMetadata({
  params,
}: {
  params: CategoryPageParams;
}) {
  const { category } = params;
  const decodedCategory = decodeURIComponent(category);
  const displayCategory =
    categoryMap[decodedCategory as keyof CategoryMap] || decodedCategory;

  let metaTitle = displayCategory;
  let metaDescription = "";

  try {
    const categoryData = await getMatchingCategory();
    const matchingCategory = categoryData?.data?.find(
      (cat: any) => cat.name === displayCategory
    );
    if (matchingCategory?.seo) {
      metaTitle = matchingCategory.seo.metaTitle || displayCategory;
      metaDescription = matchingCategory.seo.metaDescription || "";
    }
  } catch (error) {
    console.error("generateMetadata Error:", error);
  }

  return {
    title: metaTitle,
    description: metaDescription,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: CategoryPageParams;
}) {
  const { category } = params;
  const decodedCategory = decodeURIComponent(category);
  const displayCategory =
    categoryMap[decodedCategory as keyof CategoryMap] || decodedCategory;

  let categoryData = null;
  try {
    categoryData = await getMatchingCategory();
    const matchingCategory = categoryData?.data?.find(
      (cat: any) => cat.name === displayCategory
    );
    console.log("displayCategory", displayCategory);
    console.log(
      "Matching Category Data:",
      JSON.stringify(matchingCategory, null, 2)
    );
  } catch (error) {
    console.error("CategoryPage Error:", error);
  }

  return (
    <div className="container2">
      <br />
      <Headline text={displayCategory} />
      <br />
      <ClientCategoryPage displayCategory={displayCategory} />
    </div>
  );
}
