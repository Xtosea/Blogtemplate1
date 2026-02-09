"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert images to Base64
    const imagesBase64 = await Promise.all(images.map((img) => toBase64(img)));

    const res = await fetch("/api/admin/new-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, images: imagesBase64 }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Post saved!");
      setTitle("");
      setContent("");
      setImages([]);
    } else {
      alert("Error: " + (data.message || "Unknown"));
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
        />
        <ReactQuill value={content} onChange={setContent} />
        <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2">
          Save Post
        </button>
      </form>
    </div>
  );
}