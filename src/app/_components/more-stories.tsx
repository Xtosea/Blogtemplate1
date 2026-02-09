import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";

type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  return (
    <section className="mb-32">
      <h2 className="mb-12 text-4xl md:text-5xl font-bold tracking-tight leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-16 gap-y-12 md:gap-y-20">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
            className="hover:shadow-lg transition-shadow rounded-lg"
          />
        ))}
      </div>
    </section>
  );
}