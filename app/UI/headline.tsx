export default function Headline({ text }: { text: string }) {
  return (
    <h2 className="text-h3-bold" style={{ margin: "20px 0 0 0" }}>
      {text}
    </h2>
  );
}
