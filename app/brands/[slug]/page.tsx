import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ScrollBtn from "@/components/ScrollBtn";
import { INDEX, COMPARION } from "@/lib/breadcrumbs";
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
    { label: "Бренды", href: COMPARION },
    {
      label: `${content.title}`,
      href: "",
      isActive: true,
    },
  ];
  return (
    <>
      <Header />
      <Breadcrumbs items={breadcrumbs} />
      <BrandText content={content} />

      <div style={{ display: "none" }}>
        <BlogMainPageWrapper />
      </div>
      <PopularArticles />
      <Subscription />
      <Footer />
      <ScrollBtn />
    </>
  );
}
