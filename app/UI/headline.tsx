import { CSSProperties } from "react";

type HeadlineProps = {
  text: string;
  stylecss?: CSSProperties;
};

export default function Headline({ text, stylecss }: HeadlineProps) {
  return (
    <h2 className="text-h3-bold" style={stylecss}>
      {text}
    </h2>
  );
}
