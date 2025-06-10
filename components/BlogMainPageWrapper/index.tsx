"use client";
import { Suspense } from "react";
import BlogMainPage from "../BlogMainPage/index";

export default function BlogMainPageWrapper() {
  return (
    <Suspense fallback={<div className="container"></div>}>
      <BlogMainPage />
    </Suspense>
  );
}
