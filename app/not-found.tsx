import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white px-6">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-blue-500">404</h1>

        <h2 className="mt-4 text-3xl font-bold">
          Link not found
        </h2>

        <p className="mt-3 text-zinc-400">
          This short URL doesn't exist or has been removed.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 hover:bg-blue-500"
        >
          Back Home
        </Link>
      </div>
    </main>
  );
}