import Hero from "@/components/Hero";
import Subscription from "@/components/Subscription/Subscription";
import Brands from "@/components/Brands";
import PopularArticles from "@/components/PopularArticles";
import ScrollBtn from "@/components/ScrollBtn";
import BlogMainWrapper from "@/components/BlogMainPageWrapper";
import PopularWrapper from "@/components/PopularWrapper";


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
