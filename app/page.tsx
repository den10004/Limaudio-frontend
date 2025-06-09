import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
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
      <Header />
      <Hero />
      <PopularWrapper />
      <BlogMainWrapper />
      <PopularArticles />
      <Brands />
      <Subscription />
      <Footer />
      <ScrollBtn />
    </>
  );
}
