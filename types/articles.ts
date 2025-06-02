type RichTextBlock = {
  __component: "shared.rich-text";
  id: number;
  body: string;
};

type SliderBlock = {
  __component: "shared.slider";
  id: number;
  files: string[];
};

type Block = RichTextBlock | SliderBlock;

export type Articles = {
  blocks: Block[];
  category: {
    documentId: string;
    id: number;
    name: string;
  };
  comments: {
    count: number;
  };
  cover: {
    documentId: string;
    id: number;
    url: string;
  };
  createdAt: string;
  description: string;
  documentId: string;
  id: number;
  publishedAt: string;
  slug: string;
  title: string;
  views: number;
  url: string;
  updatedAt: string;
  date: string;
  type: string;
};
