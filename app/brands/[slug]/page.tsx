import Breadcrumbs from "@/components/Breadcrumbs";
import ScrollBtn from "@/components/ScrollBtn";
import { INDEX, BRANDS } from "@/lib/breadcrumbs";
import { notFound } from "next/navigation";
import Subscription from "@/components/Subscription/Subscription";
import BrandText from "@/components/BrandText";
import PopularArticles from "@/components/PopularArticles";
import { getBrandsBySlug } from "@/app/api/brands/api";
import BlogMainPageWrapper from "@/components/BlogMainPageWrapper";

export default async function BrandsPage({ params }: any) {
  const content: any = await getBrandsBySlug(params.slug);

  if (!content) return notFound();

  const breadcrumbs = [
    { label: "Главная", href: INDEX },
    { label: "Бренды", href: BRANDS },
    {
      label: `${content.title}`,
      href: "",
      isActive: true,
    },
  ];
  return (
    <>
      <div className="container" style={{ width: "100%" }}>
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <BrandText content={content} />
      <div style={{ display: "none" }}>
        <BlogMainPageWrapper />
      </div>
      <PopularArticles />
      <Subscription />
      <ScrollBtn />
    </>
  );
}
