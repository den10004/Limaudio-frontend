"use client";
import styles from "./page.module.css";

type BlockType =
  | "paragraph"
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "heading5"
  | "heading6"
  | "list"
  | "bullet_list"
  | "image"
  | "embed"
  | "list_item";

interface Block {
  type: BlockType;
  children: Block[] | BlockContent[];
  data?: {
    file?: {
      url: string;
    };
    alternativeText?: string;
    html?: string;
  };
}

interface BlockContent {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
}

interface MarkdownBrandProps {
  content: {
    content: Block[];
  };
  expanded: boolean;
}

const isBlockContentArray = (
  children: Block[] | BlockContent[]
): children is BlockContent[] => {
  return typeof (children[0] as BlockContent)?.text === "string";
};

const renderBlock = (block: Block): React.ReactNode => {
  switch (block.type) {
    case "paragraph":
      return (
        <p className={styles.paragraph}>
          {isBlockContentArray(block.children) &&
            renderChildren(block.children)}
        </p>
      );
    case "heading1":
      return (
        <h1 className={styles.heading}>
          {" "}
          {isBlockContentArray(block.children) &&
            renderChildren(block.children)}
        </h1>
      );
    case "heading2":
      return (
        <h2 className={styles.heading}>
          {isBlockContentArray(block.children) &&
            renderChildren(block.children)}
        </h2>
      );
    case "heading3":
      return (
        <h3 className={styles.heading}>
          {isBlockContentArray(block.children) &&
            renderChildren(block.children)}
        </h3>
      );
    case "heading4":
      return (
        <h4 className={styles.heading}>
          {isBlockContentArray(block.children) &&
            renderChildren(block.children)}
        </h4>
      );
    case "heading5":
      return (
        <h5 className={styles.heading}>
          {isBlockContentArray(block.children) &&
            renderChildren(block.children)}
        </h5>
      );
    case "heading6":
      return (
        <h6 className={styles.heading}>
          {isBlockContentArray(block.children) &&
            renderChildren(block.children)}
        </h6>
      );
    case "list":
      return (
        <ul className={styles.list}>
          {(block.children as Block[]).map((child, i) => (
            <li key={i}>{renderBlock(child)}</li>
          ))}
        </ul>
      );
    case "bullet_list":
      return (
        <ul className={styles.list}>
          {(block.children as Block[]).map((child, i) => (
            <li key={i}>{renderBlock(child)}</li>
          ))}
        </ul>
      );
    case "image":
      return (
        <img
          src={block.data?.file?.url || ""}
          alt={block.data?.alternativeText || ""}
          className={styles.image}
        />
      );
    case "embed":
      return (
        <div
          className={styles.embed}
          dangerouslySetInnerHTML={{ __html: block.data?.html || "" }}
        />
      );
    default:
      return (
        <div>
          {isBlockContentArray(block.children) &&
            renderChildren(block.children)}
        </div>
      );
  }
};

const renderChildren = (children: BlockContent[]): React.ReactNode => {
  return children.map((child, index) => {
    const { text, bold, italic, underline, code } = child;

    return (
      <span
        key={index}
        className={styles.text}
        style={{
          fontWeight: bold ? "bold" : "normal",
          fontStyle: italic ? "italic" : "normal",
          textDecoration: underline ? "underline" : "none",
          fontFamily: code ? "monospace" : "inherit",
        }}
      >
        {text}
      </span>
    );
  });
};

export default function MarkdownBrand({
  content,
  expanded,
}: MarkdownBrandProps) {
  const visibleBlocks = expanded
    ? content.content
    : content.content.slice(0, 6);

  return (
    <div className={styles.markdownContainer}>
      {visibleBlocks.map((block, index) => (
        <div key={index}>{renderBlock(block)}</div>
      ))}
    </div>
  );
}
