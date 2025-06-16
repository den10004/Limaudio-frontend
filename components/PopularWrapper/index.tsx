// app/PopularWrapper.tsx
"use client";
import { Suspense } from "react";
import Popular from "./../Popular";

export default function PopularWrapper() {
  return (
    <Suspense fallback={<div></div>}>
      <div className="container">
        <Popular />
      </div>
    </Suspense>
  );
}
