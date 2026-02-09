import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req: NextRequest) => {
  const form = formidable({ multiples: true });

  const data = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
    form.parse(req as any, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const { fields, files } = data;

  // Upload images to Cloudinary
  const uploadedImages: string[] = [];
  if (files.images) {
    const fileArray = Array.isArray(files.images) ? files.images : [files.images];
    for (const file of fileArray) {
      const result = await cloudinary.uploader.upload(file.filepath);
      uploadedImages.push(result.secure_url);
    }
  }

  // Replace placeholders in markdown content
  let mdContent = fields.content as string;
  uploadedImages.forEach((img, idx) => {
    mdContent = mdContent.replace(`![](image${idx + 1})`, `![](${img})`);
  });

  // Slug for the markdown file
  const slug = (fields.slug as string) || (fields.title as string).toLowerCase().replace(/\s+/g, "-");

  // Markdown frontmatter
  const finalContent = `---
title: "${fields.title}"
slug: "${slug}"
date: "${new Date().toISOString()}"
---

${mdContent}
`;

  const postPath = path.join(process.cwd(), `_posts/${slug}.md`);
  fs.writeFileSync(postPath, finalContent);

  return NextResponse.json({ success: true, slug });
};
