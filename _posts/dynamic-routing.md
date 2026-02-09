export const posts = [
  {
    slug: "dynamic-routing-and-static-generation",
    title: "Dynamic Routing and Static Generation in Next.js",
    excerpt: "Learn how to combine dynamic routing and static generation to build fast, SEO-friendly Next.js sites.",
    coverImage: "/assets/blog/dynamic-routing/cover.jpg",
    date: "2020-03-16T05:35:07.322Z",
    author: {
      name: "JJ Kasper",
      picture: "/assets/blog/authors/jj.jpeg"
    },
    ogImage: "/assets/blog/dynamic-routing/cover.jpg",
    content: `
Dynamic routing in Next.js allows you to create pages with URLs that depend on data. For example, each blog post can have a URL like /posts/post-slug. Static generation improves performance by pre-rendering pages at build time, making your site faster and SEO-friendly.

You can combine dynamic routing with static generation using Next.js’s getStaticPaths and getStaticProps (or the App Router equivalents). This approach ensures that your pages are ready to serve without waiting for server requests, while still supporting dynamic content.
    `
  },
  {
    slug: "hello-world",
    title: "Hello World with Next.js",
    excerpt: "A beginner’s guide to creating your first Next.js project and understanding its folder structure.",
    coverImage: "/assets/blog/hello-world/cover.jpg",
    date: "2020-03-20T10:00:00.000Z",
    author: {
      name: "Alice Johnson",
      picture: "/assets/blog/authors/alice.jpeg"
    },
    ogImage: "/assets/blog/hello-world/cover.jpg",
    content: `
Next.js is a React framework that makes building modern web applications easier. Starting a new project is simple: run create-next-app, explore the folder structure, and understand how pages, components, and API routes work.

This guide walks you through creating your first "Hello World" app and explains the key concepts you need to know to build more complex applications.
    `
  },
  {
    slug: "preview-feature-nextjs",
    title: "Using Preview Mode in Next.js",
    excerpt: "Discover how to enable Preview Mode in Next.js to see draft content before publishing it.",
    coverImage: "/assets/blog/preview/cover.jpg",
    date: "2020-03-25T12:00:00.000Z",
    author: {
      name: "Michael Lee",
      picture: "/assets/blog/authors/michael.jpeg"
    },
    ogImage: "/assets/blog/preview/cover.jpg",
    content: `
Preview Mode in Next.js allows you to view unpublished or draft content on your live site. It’s especially useful for content editors who need to review changes before publishing.

To enable Preview Mode, create an API route that sets preview cookies, and use getStaticProps with the preview flag to fetch draft content. This ensures your production site stays fast while providing flexibility for content previews.
    `
  }
];