import Hero from "@/components/Hero";
import Subscription from "@/components/Subscription/Subscription";
import Brands from "@/components/Brands";
import PopularArticles from "@/components/PopularArticles";
import ScrollBtn from "@/components/ScrollBtn";
import BlogMainWrapper from "@/components/BlogMainPageWrapper";
import PopularWrapper from "@/components/PopularWrapper";
import { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  return {
    title: "Главная",
    description: "",
    keywords: [""],
    openGraph: {
      title: "Главная",
      description: "",
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
