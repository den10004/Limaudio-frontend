import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import BlogMainPage from "@/components/BlogMainPage";
import Popular from "@/components/Popular";
import PopularArticles from "@/components/PopularArticles";
import Brands from "@/components/Brands";
import Subscription from "@/components/Subscription/Subscription";
import ScrollBtn from "@/components/ScrollBtn";

export default function Blog() {
  return (
    <>
      <Header />
      <div className="container">
        <h2 className="text-h3-bold" style={{ margin: "40px 0" }}>
          Блог
        </h2>
      </div>
      {/*
      <Popular />*/}
      <BlogMainPage />
      <PopularArticles />
      <Brands />
      <Subscription />
      <Footer />
      <ScrollBtn />
    </>
  );
}
