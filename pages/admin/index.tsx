import Link from "next/link";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md text-center space-y-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <Link
          href="/admin/new-post"
          className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Create New Post
        </Link>
      </div>
    </main>
  );
}