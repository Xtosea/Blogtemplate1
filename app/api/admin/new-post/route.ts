import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: "Missing title or content" },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const markdown = `---
title: "${title}"
date: "${new Date().toISOString()}"
---

${content}
`;

    const encodedContent = Buffer.from(markdown).toString("base64");

    const githubRes = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/${process.env.POSTS_PATH}/${slug}.md`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Add post: ${title}`,
          content: encodedContent,
        }),
      }
    );

    if (!githubRes.ok) {
      const err = await githubRes.json();
      return NextResponse.json(
        { success: false, error: err.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}