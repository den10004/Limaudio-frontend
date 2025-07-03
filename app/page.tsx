import Hero from "@/components/Hero";
import Subscription from "@/components/Subscription/Subscription";
import Brands from "@/components/Brands";
import PopularArticles from "@/components/PopularArticles";
import ScrollBtn from "@/components/ScrollBtn";
import BlogMainWrapper from "@/components/BlogMainPageWrapper";
import PopularWrapper from "@/components/PopularWrapper";
import { Metadata } from "next";
import { getGlobal } from "./api/getGlobal/api";

export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobal();
  return {
    title: global.data.siteName || "Главная",
    description: global.data.siteDescription || "",
    keywords: global.data.defaultSeo.metaKeys || [],
    openGraph: {
      title: global.data.siteName || "Главная",
      description: global.data.siteDescription || "",
    },
  };
}

export default function Home() {
  return (
    <>
      <Hero />
      <PopularWrapper />
      <BlogMainWrapper />
      <PopularArticles />
      <Brands />
      <Subscription />
      <ScrollBtn />
    </>
  );
}
