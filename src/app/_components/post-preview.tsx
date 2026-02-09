import { type Author } from "@/interfaces/author";
import Link from "next/link";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import cn from "classnames";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
  className?: string; // optional for card-level styling
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  className,
}: Props) {
  return (
    <article
      className={cn(
        "flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 bg-white",
        className
      )}
    >
      {/* Cover image */}
      <CoverImage slug={slug} title={title} src={coverImage} className="h-60 md:h-72 w-full object-cover" />

      {/* Post content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-2xl md:text-3xl font-bold mb-3 leading-snug">
          <Link
            href={`/posts/${slug}`}
            className="hover:underline text-gray-900"
          >
            {title}
          </Link>
        </h3>

        <div className="text-sm text-gray-500 mb-4">
          <DateFormatter dateString={date} />
        </div>

        <p className="text-gray-700 mb-4 flex-1">{excerpt}</p>

        {/* Author */}
        <div className="mt-auto flex items-center">
          <Avatar name={author.name} picture={author.picture} />
          <span className="ml-3 text-gray-600 text-sm">{author.name}</span>
        </div>
      </div>
    </article>
  );
}