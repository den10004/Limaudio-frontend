"use client";
import styles from "./page.module.css";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import Image from "next/image";
import { JSX } from "react";

interface MarkdownBrandProps {
  content: {
    content: BlocksContent;
  };
  expanded: boolean;
}

export default function MarkdownBrand({
  content,
  expanded,
}: MarkdownBrandProps) {
  if (!content?.content || !Array.isArray(content.content)) {
    return <div>No content available</div>;
  }

  const visibleBlocks = expanded
    ? content.content
    : content.content.slice(0, 6);

  return (
    <div className={styles.markdownContainer}>
      <BlocksRenderer
        content={visibleBlocks}
        blocks={{
          paragraph: ({ children }) => (
            <p className={styles.paragraph}>{children}</p>
          ),
          heading: ({ children, level }) => {
            const Tag = `h${level}` as keyof JSX.IntrinsicElements;
            return <Tag className={styles.heading}>{children}</Tag>;
          },
          list: ({ children, format }) => {
            const Tag = format === "ordered" ? "ol" : "ul";
            return <Tag className={styles.list}>{children}</Tag>;
          },
          "list-item": ({ children }) => <li>{children}</li>,
          image: ({ image }) => (
            <Image
              src={image.url}
              width={image.width || 600}
              height={image.height || 400}
              alt={image.alternativeText || ""}
              className={styles.image}
            />
          ),
          quote: ({ children }) => (
            <blockquote className={styles.embed}>{children}</blockquote>
          ),
          code: ({ children }) => (
            <pre className={styles.embed}>
              <code>{children}</code>
            </pre>
          ),
          link: ({ children, url }) => (
            <a href={url} className={styles.text}>
              {children}
            </a>
          ),
        }}
        modifiers={{
          bold: ({ children }) => (
            <strong style={{ fontWeight: "bold" }}>{children}</strong>
          ),
          italic: ({ children }) => (
            <em style={{ fontStyle: "italic" }}>{children}</em>
          ),
          underline: ({ children }) => (
            <span style={{ textDecoration: "underline" }}>{children}</span>
          ),
          code: ({ children }) => (
            <code
              style={{ fontFamily: "Roboto", fontSize: "18px" }}
              className={styles.text}
            >
              {children}
            </code>
          ),
        }}
      />
    </div>
  );
}
