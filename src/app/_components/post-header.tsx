import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
  className?: string; // optional spacing/styling
};

export function PostHeader({ title, coverImage, date, author, className }: Props) {
  return (
    <header className={`mb-12 ${className ?? ""}`}>
      {/* Post title */}
      <PostTitle>{title}</PostTitle>

      {/* Desktop avatar */}
      <div className="hidden md:flex items-center mt-4 mb-12">
        <Avatar name={author.name} picture={author.picture} />
        <span className="ml-3 text-gray-600 text-sm md:text-base">
          {author.name} • <DateFormatter dateString={date} />
        </span>
      </div>

      {/* Cover image */}
      <div className="mb-8 md:mb-16">
        <CoverImage
          title={title}
          src={coverImage}
          className="w-full h-auto rounded-xl shadow-md object-cover"
        />
      </div>

      {/* Mobile avatar + date */}
      <div className="md:hidden flex items-center mb-6">
        <Avatar name={author.name} picture={author.picture} />
        <span className="ml-3 text-gray-600 text-sm">
          {author.name} • <DateFormatter dateString={date} />
        </span>
      </div>
    </header>
  );
}