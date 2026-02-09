// app/admin/new-post/route.ts
import { NextRequest, NextResponse } from "next/server";
import formidable, { Fields, Files } from "formidable";
import fs from "fs";
import path from "path";

// Optional: configure Cloudinary if you plan to use cloud storage
// import { v2 as cloudinary } from "cloudinary";
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

export const POST = async (req: NextRequest) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), "public/images");
  form.keepExtensions = true;
  form.multiples = true;

  try {
    // Wrap parse in a Promise for async/await
    const data = await new Promise<{ fields: Fields; files: Files }>((resolve, reject) => {
      form.parse(req as any, (err: Error | null, fields: Fields, files: Files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const { fields, files } = data;

    // Generate slug
    const slug = (fields.slug as string) || (fields.title as string).toLowerCase().replace(/\s+/g, "-");

    // Markdown file path
    const postPath = path.join(process.cwd(), `_posts/${slug}.md`);

    // Process uploaded images
    const uploadedImages: string[] = [];
    if (files.images) {
      const fileArray = Array.isArray(files.images) ? files.images : [files.images];
      for (const file of fileArray) {
        const filename = path.basename((file as any).filepath);
        uploadedImages.push("/images/" + filename);
      }
    }

    // Replace inline placeholders in Markdown
    let mdContent = fields.content as string;
    uploadedImages.forEach((img, idx) => {
      mdContent = mdContent.replace(`![](image${idx + 1})`, `![](${img})`);
    });

    // Create frontmatter + content
    const finalContent = `---
title: "${fields.title}"
slug: "${slug}"
date: "${new Date().toISOString()}"
---

${mdContent}
`;

    // Write file to _posts
    fs.writeFileSync(postPath, finalContent);

    return NextResponse.json({ success: true, slug });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};