import type { NextApiRequest, NextApiResponse } from "next";
import { Buffer } from "buffer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ success: false, message: "Method not allowed" });

  try {
    // Using formidable is optional; for simplicity, we can handle text fields only
    const title = req.body.title;
    const content = req.body.content;

    if (!title || !content) return res.status(400).json({ success: false, message: "Missing title or content" });

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

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
      return res.status(500).json({ success: false, message: err.message });
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}