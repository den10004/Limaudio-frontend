import Breadcrumbs from "@/components/Breadcrumbs";
import { INDEX } from "@/lib/breadcrumbs";
import Link from "next/link";
import Headline from "../UI/headline";
import BrandSearch from "@/components/BrandSearch";

const breadcrumbs = [
  { label: "Главная", href: INDEX },
  { label: "Бренды", href: "" },
];

export default function Brands() {
  return (
    <>
      <div className="container" style={{ width: "100%", flex: 1 }}>
        <Breadcrumbs items={breadcrumbs} />
        <BrandSearch />
      </div>
    </>
  );
}
