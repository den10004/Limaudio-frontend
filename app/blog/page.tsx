import PopularArticles from "@/components/PopularArticles";
import Brands from "@/components/Brands";
import Subscription from "@/components/Subscription/Subscription";
import ScrollBtn from "@/components/ScrollBtn";
import BlogPage from "@/components/BlogPage";
import { Suspense } from "react";

export default function Blog() {
  return (
    <>
      <Suspense fallback={<div></div>}>
        <BlogPage />
      </Suspense>
      {/*
      <PopularArticles />*/}
    </>
  );
}
