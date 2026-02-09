import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "../../../lib/api";
import { CMS_NAME } from "../../../lib/constants";
import markdownToHtml from "../../../lib/markdownToHtml";
import Alert from "../../_components/alert";
import Container from "../../_components/container";
import Header from "../../_components/header";
import { PostBody } from "../../_components/post-body";
import { PostHeader } from "../../_components/post-header";

type Params = {
  params: {
    slug: string;
  };
};

export default async function Post({ params }: Params) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  // Convert markdown content safely
  const content = await markdownToHtml(post.content || "");

  // Ensure all optional fields have defaults
  const safePost = {
    ...post,
    author: post.author || { name: "Unknown Author", picture: "/images/author-default.png" },
    coverImage: post.coverImage || "/images/cover-default.jpg",
    ogImage: post.ogImage || { url: "/images/og-default.jpg" },
    preview: post.preview || false,
  };

  return (
    <main className="py-16 bg-slate-50 text-slate-900">
      <Alert preview={safePost.preview} />
      <Container>
        <Header />
        <article className="max-w-3xl mx-auto mb-32 prose prose-lg prose-slate">
          <PostHeader
            title={safePost.title}
            coverImage={safePost.coverImage}
            date={safePost.date}
            author={safePost.author}
            className="mb-12"
          />
          <PostBody content={content} />
        </article>
      </Container>
    </main>
  );
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  const safePost = {
    ...post,
    ogImage: post.ogImage || { url: "/images/og-default.jpg" },
  };

  const title = `${safePost.title} | Next.js Blog Example with ${CMS_NAME}`;

  return {
    title,
    openGraph: {
      title,
      images: [safePost.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}