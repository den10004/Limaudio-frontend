import Brands from "@/components/Brands";
import Subscription from "@/components/Subscription/Subscription";
import ScrollBtn from "@/components/ScrollBtn";
import PopularWrapper from "@/components/PopularWrapper";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Brands />
      <Subscription />
      <ScrollBtn />
    </>
  );
}
