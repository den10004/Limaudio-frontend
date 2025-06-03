import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import Popular from "@/components/Popular/Popular";
import Subscription from "@/components/Subscription/Subscription";
import Brands from "@/components/Brands/Brands";
import PopularArticles from "@/components/PopularArticles";
import BlogMainPage from "@/components/BlogMainPage";
import ScrollBtn from "@/components/ScrollBtn";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Popular />
      <BlogMainPage />
      <PopularArticles />
      <Brands />
      <Subscription />
      <Footer />
      <ScrollBtn />
    </>
  );
}

export const revalidate = 60;
