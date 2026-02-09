export const posts = [
  {
    slug: "dynamic-routing-and-static-generation",
    title: "Dynamic Routing and Static Generation",
    excerpt: "Learn how to use dynamic routing and static generation in Next.js to create fast, SEO-friendly pages.",
    coverImage: "/assets/blog/dynamic-routing/cover.jpg",
    date: "2020-03-16T05:35:07.322Z",
    author: {
      name: "JJ Kasper",
      picture: "/assets/blog/authors/jj.jpeg"
    },
    ogImage: "/assets/blog/dynamic-routing/cover.jpg",
    content: `
Dynamic routing in Next.js allows you to create pages with URLs based on data. For example, each blog post can have its own URL like /posts/post-slug. Combining dynamic routing with static generation lets your site serve pre-rendered pages quickly while still supporting dynamic content.

Using functions like getStaticPaths and getStaticProps (or the App Router equivalents), you can define which pages to generate at build time. This ensures your pages are fast, SEO-friendly, and ready to serve to users without waiting for server responses.

Static generation is ideal for blog posts, documentation, and any content that doesn’t change frequently. When combined with dynamic routing, you get the best of both worlds: flexibility and performance.
    `
  },
  {
    slug: "hello-world",
    title: "Hello World in Next.js",
    excerpt: "A beginner’s guide to creating your first Next.js app and understanding the project structure.",
    coverImage: "/assets/blog/hello-world/cover.jpg",
    date: "2020-03-20T10:00:00.000Z",
    author: {
      name: "Alice Johnson",
      picture: "/assets/blog/authors/alice.jpeg"
    },
    ogImage: "/assets/blog/hello-world/cover.jpg",
    content: `
Next.js is a React framework that simplifies building modern web applications. Getting started is easy: run create-next-app, explore the project structure, and learn how pages, components, and API routes work.

This guide walks you through creating your first "Hello World" app. You'll understand key concepts such as file-based routing, static and server-side rendering, and how to build scalable Next.js applications.
    `
  },
  {
    slug: "preview-feature-nextjs",
    title: "Using Preview Mode in Next.js",
    excerpt: "Discover how to enable Preview Mode in Next.js to view draft content before publishing.",
    coverImage: "/assets/blog/preview/cover.jpg",
    date: "2020-03-25T12:00:00.000Z",
    author: {
      name: "Michael Lee",
      picture: "/assets/blog/authors/michael.jpeg"
    },
    ogImage: "/assets/blog/preview/cover.jpg",
    content: `
Preview Mode in Next.js allows editors to see draft content on a live site before publishing. This is useful for reviewing changes and ensuring accuracy.

To use Preview Mode, create an API route that sets preview cookies. Then use getStaticProps with the preview flag to fetch draft content. This method maintains performance while giving content editors full control over unpublished content.
    `
  }
];