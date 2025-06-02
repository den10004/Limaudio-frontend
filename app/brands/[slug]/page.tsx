import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ScrollBtn from "@/components/ScrollBtn";
import { INDEX, COMPARION } from "@/lib/breadcrumbs";
import { getCards } from "@/lib/cardsData";
import { brandLogos } from "@/lib/brands";

import { notFound } from "next/navigation";
import Subscription from "@/components/Subscription/Subscription";
//import PopularArticles from "@/components/PopularArticles";
import BlogMainPage from "@/components/BlogMainPage";
import BrandText from "@/components/BrandText";

function sanitizeSlug(slug: string | undefined): string {
  if (!slug) return "";
  return slug
    .toLowerCase()
    .replace(/[^а-яёa-z0-9\s-]/g, "")
    .replace(/[\s-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function BrandsPage({ params }: any) {
  const cleanSlug = sanitizeSlug(params.slug?.toLowerCase());

  const brand = brandLogos.find((b) => sanitizeSlug(b.slug) === cleanSlug);
  if (!brand) return notFound();

  const breadcrumbs = [
    { label: "Главная", href: INDEX },
    { label: "Бренды", href: COMPARION },
    {
      label: cleanSlug,
      href: cleanSlug,
      isActive: true,
    },
  ];
  const cards = await getCards();
  const similarCard = cards.slice(0, 4);

  return (
    <>
      <Header />
      <Breadcrumbs items={breadcrumbs} />
      <BrandText brand={brand} />

      <div style={{ display: "none" }}>
        <BlogMainPage />
      </div>
      {/*
      <PopularArticles />*/}
      <Subscription />
      <Footer />
      <ScrollBtn />
    </>
  );
}
