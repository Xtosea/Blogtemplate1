// app/admin/new-post/route.ts
import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req: NextRequest) => {
  try {
    const form = new formidable.IncomingForm();
    form.multiples = true; // allow multiple images

    // Wrap formidable parse in a promise
    const data = await new Promise<{ fields: Record<string, any>; files: Record<string, any> }>(
      (resolve, reject) => {
        form.parse(req as any, (err: any, fields: any, files: any) => {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      }
    );

    const { fields, files } = data;

    // Generate slug
    const slug = (fields.slug as string) || (fields.title as string).toLowerCase().replace(/\s+/g, "-");

    // Upload images to Cloudinary
    const uploadedImages: string[] = [];
    if (files.images) {
      const fileArray = Array.isArray(files.images) ? files.images : [files.images];
      for (const file of fileArray) {
        const result = await cloudinary.uploader.upload(file.filepath, {
          folder: "blog-images",
        });
        uploadedImages.push(result.secure_url);
        fs.unlinkSync(file.filepath); // delete temp local file
      }
    }

    // Replace inline image placeholders in Markdown
    let mdContent = fields.content as string;
    uploadedImages.forEach((img, idx) => {
      mdContent = mdContent.replace(`![](image${idx + 1})`, `![](${img})`);
    });

    // Markdown frontmatter
    const finalContent = `---
title: "${fields.title}"
slug: "${slug}"
date: "${new Date().toISOString()}"
---

${mdContent}
`;

    // Save markdown file in _posts folder
    fs.writeFileSync(`_posts/${slug}.md`, finalContent);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};