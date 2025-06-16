import Link from "next/link";
import { CSSProperties } from "react";

type HeadlineProps = {
  text: string;
  stylecss?: CSSProperties;
  link?: string;
};

export default function Headline({ text, stylecss, link }: HeadlineProps) {
  return (
    <>
      {link ? (
        <Link href={link} style={{ color: "var( --color-black1C)" }}>
          <h2 className="text-h3-bold" style={stylecss}>
            {text}
          </h2>
        </Link>
      ) : (
        <h2 className="text-h3-bold" style={stylecss}>
          {text}
        </h2>
      )}
    </>
  );
}
