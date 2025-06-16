import Breadcrumbs from "@/components/Breadcrumbs";
import { COMPARION, INDEX } from "@/lib/breadcrumbs";
import Link from "next/link";
import Headline from "../UI/headline";

const breadcrumbs = [
  { label: "Главная", href: INDEX },
  { label: "Бренды", href: "" },
];

export default function Brands() {
  return (
    <>
      <div className="container" style={{ width: "100%" }}>
        <Breadcrumbs items={breadcrumbs} />
        <Headline text={"Бренды"} />
      </div>
    </>
  );
}
