import { CardsResponse } from "@/types/card";
import Headline from "@/app/UI/headline";
import ClientCategoryPage from "./ClientCategoryPage";

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

export async function generateMetadata({
  params,
}: {
  params: CategoryPageParams;
}) {
  const { category } = params;
  const decodedCategory = decodeURIComponent(category);
  const displayCategory =
    categoryMap[decodedCategory as keyof CategoryMap] || decodedCategory;

  return {
    title: `${displayCategory}`,
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

  return (
    <div className="container2">
      <br />
      <Headline text={displayCategory} />
      <br />
      <ClientCategoryPage displayCategory={displayCategory} />
    </div>
  );
}
