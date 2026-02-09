import type { NextApiRequest, NextApiResponse } from "next";
import { Buffer } from "buffer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ success: false, message: "Method not allowed" });

  try {
    const { title, content, images } = req.body as {
      title: string;
      content: string;
      images?: string[];
    };

    if (!title || !content)
      return res.status(400).json({ success: false, message: "Missing title or content" });

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    // Append images as markdown
    let markdownContent = content;
    if (images && images.length > 0) {
      const imagesMarkdown = images
        .map((img, i) => `![image-${i}](data:image/png;base64,${img.split(",")[1]})`)
        .join("\n\n");
      markdownContent += "\n\n" + imagesMarkdown;
    }

    const markdown = `---
title: "${title}"
date: "${new Date().toISOString()}"
---

${markdownContent}
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
      return res.status(500).json({ success: false, message: err.message });
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}