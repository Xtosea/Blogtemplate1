"use client"; // optional if using React hooks in Pages Router
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    images.forEach((img) => formData.append("images", img));

    const res = await fetch("/api/admin/new-post", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      alert("Post saved!");
      setTitle("");
      setContent("");
      setImages([]);
    } else {
      alert("Error: " + (data.error || "Unknown"));
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