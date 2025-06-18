import { Articles, PageProps } from "@/types/articles";
import { Metadata } from "next";

type MetadataParams = {
  params: any;
  searchParams?: Record<string, string>;
};

type ContentWithSeo = {
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaImage?: string;
  };
  title?: string;
  description?: string;
  image?: string;
};

export function generateDynamicMetadata(
  fetchContent: (params: { slug: string }) => Promise<Articles | null>,
  defaultMetadata: Metadata = {}
): ({ params }: PageProps) => Promise<Metadata> {
  return async ({ params }) => {
    const content = await fetchContent(params);
    if (!content) return defaultMetadata;

    return {
      ...defaultMetadata,
      title: content.seo?.metaTitle || content.title || defaultMetadata.title,
      description:
        content.seo?.metaDescription ||
        content.description ||
        defaultMetadata.description,
      openGraph: {
        ...defaultMetadata.openGraph,
        title: content.seo?.metaTitle || content.title,
        description: content.seo?.metaDescription || content.description,
        images: content.cover?.url ? [{ url: content.cover.url }] : undefined,
      },
    };
  };
}
