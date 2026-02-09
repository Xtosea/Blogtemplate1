// app/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

// Define Post type
type Post = {
  title: string;
  slug: string;
  date: string;
  excerpt?: string;
};

// Read all posts from _posts
function getAllPosts(): Post[] {
  const postsDir = path.join(process.cwd(), "_posts");
  const filenames = fs.readdirSync(postsDir);

  return filenames.map((filename) => {
    const filePath = path.join(postsDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
      title: data.title,
      slug: data.slug,
      date: data.date,
      excerpt: content.slice(0, 120) + "...", // optional short preview
    };
  });
}

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Globelynks Blog</h1>
      <div className="max-w-3xl mx-auto space-y-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="block p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <p className="text-gray-500 text-sm">{new Date(post.date).toLocaleDateString()}</p>
            <p className="mt-2 text-gray-700">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}