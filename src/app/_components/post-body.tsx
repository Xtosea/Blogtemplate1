import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: string;
  className?: string; // optional for extra spacing
};

export function PostBody({ content, className }: Props) {
  return (
    <div className={`max-w-2xl mx-auto ${className ?? ""}`}>
      <div
        className={`${markdownStyles["markdown"]} prose prose-lg prose-slate`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}