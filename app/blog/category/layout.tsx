import Brands from "@/components/Brands";
import PopularArticles from "@/components/PopularArticles";
import PopularWrapper from "@/components/PopularWrapper";
import ScrollBtn from "@/components/ScrollBtn";
import Subscription from "@/components/Subscription/Subscription";

export default function CategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PopularWrapper />
      {children}
      <PopularArticles />
      <ScrollBtn />
    </>
  );
}
