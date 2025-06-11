import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import ScrollBtn from "@/components/ScrollBtn";
import { INDEX } from "@/lib/breadcrumbs";
import styles from "./page.module.css";
import Comments from "@/components/Comments";
import Tags from "@/components/Tags";
import ApplicationForm from "@/components/ApplicationForm";
import Share from "@/components/Share";
import { getArticleBySlug } from "@/app/api/article/api";
import { Articles } from "@/types/articles";
import MarkdownBlog from "@/components/MarkdownBlog";
import { FormatDate } from "@/utils/formatDate";
import BlockSimilarCard from "@/components/BlogSimilar/BlockSimilarCard";

interface PageProps {
  params: { slug: string };
}

type Bloc = RichTextBloc | SliderBloc | UnknownBloc;

interface RichTextBloc {
  __component: "shared.rich-text";
  body: string;
  id: number;
}

interface SliderBloc {
  __component: "shared.slider";
  files: Array<{
    url: string;
  }>;
}

interface UnknownBloc {
  __component: string;
  [key: string]: any;
}

export default async function BlogPostPage({ params }: any) {
  const content: Articles | null = await getArticleBySlug(params.slug);

  const breadcrumbs = [
    { label: "Акустика", href: INDEX },
    { label: "Сравнения", href: "" },
    {
      label: content?.title ?? "",
      href: "",
      isActive: true,
    },
  ];
  console.log(content);
  const tags: any = content?.topics;
  const blocs: any = content?.blocks;

  //if (!content) return notFound();
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section>
        <div className="container">
          <h3 className="text-h3-bold">Топик</h3>
        </div>
      </section>
      <ScrollBtn />
    </>
  );
}
