import { type NextPage } from "next";
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

// Define the API response type for better type safety
interface Category {
  name: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeys?: string;
  };
}

interface CategoryResponse {
  data: Category[];
}

async function getMatchingCategory(): Promise<CategoryResponse> {
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
  return res.json();
}

// Define PageProps with params as a Promise
interface PageProps {
  params: Promise<CategoryPageParams>;
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params; // Await the params
  const decodedCategory = decodeURIComponent(category);
  const displayCategory =
    categoryMap[decodedCategory as keyof CategoryMap] || decodedCategory;

  let metaTitle = displayCategory;
  let metaDescription = "";
  let metaKeys = "";

  try {
    const categoryData = await getMatchingCategory();
    const matchingCategory = categoryData?.data?.find(
      (cat: Category) => cat.name === displayCategory
    );
    if (matchingCategory?.seo) {
      metaTitle = matchingCategory.seo.metaTitle || displayCategory;
      metaDescription = matchingCategory.seo.metaDescription || "";
      metaKeys = matchingCategory.seo.metaKeys || "";
    }
  } catch (error) {
    console.error("generateMetadata Error:", error);
  }

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeys || "",
    openGraph: {
      title: metaTitle || "",
      description: metaDescription || "",
      keywords: metaKeys || "",
    },
  };
}

const CategoryPage: NextPage<PageProps> = async ({ params }) => {
  const { category } = await params; // Await the params
  const decodedCategory = decodeURIComponent(category);
  const displayCategory =
    categoryMap[decodedCategory as keyof CategoryMap] || decodedCategory;

  let categoryData: CategoryResponse | null = null;
  try {
    categoryData = await getMatchingCategory();
  } catch (error) {
    console.error("CategoryPage Error:", error);
  }

  return (
    <div className="container2">
      <br />
      <Headline text={displayCategory} left={true} />
      <br />
      <ClientCategoryPage displayCategory={displayCategory} />
    </div>
  );
};

export default CategoryPage;
