type MediaFile = {
  documentId: string;
  id: number;
  url?: string;
  createdAt?: string;
};

type BaseBlock = {
  __component: string;
  id: number;
};

interface RichTextBlock extends BaseBlock {
  __component: "shared.rich-text";
  body: string;
}

interface SliderBlock extends BaseBlock {
  __component: "shared.slider";
  files: string[];
}

type Block = RichTextBlock | SliderBlock;

type Topic = {
  createdAt: string;
  documentId: string;
  id: number;
  image: MediaFile;
  publishedAt: string;
  title: string;
  updatedAt: string;
};

type Category = {
  documentId: string;
  id: number;
  name: string;
};

export type Articles = {
  id: number;
  documentId: string;
  slug: string;
  title: string;
  description: string;
  type: string;
  url: string;
  date: string;
  views: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover: MediaFile;
  blocks: Block[];
  category: Category;
  comments: {
    count: number;
  };
  topics: Topic;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaImage?: string;
  };
};

export interface PageProps {
  params: {
    slug: string;
  };
  searchParams?: Record<string, string>;
}
