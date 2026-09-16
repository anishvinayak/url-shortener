import { headers } from "next/headers";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  MousePointerClick,
  Link2,
  ExternalLink,
} from "lucide-react";

export const runtime = "nodejs";

interface AnalyticsData {
  shortCode: string;
  originalUrl: string;
  clicks: number;
  createdAt: string;
}

async function getAnalytics(code: string): Promise<AnalyticsData> {
  const h = await headers();
  const host = h.get("host");

  if (!host) {
    throw new Error("Host header not found");
  }

  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  const res = await fetch(`${protocol}://${host}/api/analytics/${code}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch analytics");
  }

  return res.json();
}

export default async function AnalyticsPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const data = await getAnalytics(code);

  const h = await headers();
  const host = h.get("host")!;
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const shortUrl = `${protocol}://${host}/${data.shortCode}`;

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">URL Analytics</h1>
          <p className="mt-2 text-zinc-400">
            Performance and usage statistics for your shortened link.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-4 inline-flex rounded-xl bg-blue-500/10 p-3 text-blue-400">
              <MousePointerClick className="h-6 w-6" />
            </div>

            <p className="text-sm text-zinc-400">Total Clicks</p>

            <h2 className="mt-2 text-4xl font-bold">{data.clicks}</h2>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 md:col-span-2">
            <div className="mb-4 inline-flex rounded-xl bg-blue-500/10 p-3 text-blue-400">
              <CalendarDays className="h-6 w-6" />
            </div>

            <p className="text-sm text-zinc-400">Created</p>

            <h2 className="mt-2 text-xl font-semibold">
              {new Date(data.createdAt).toLocaleString()}
            </h2>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-4 flex items-center gap-3">
              <Link2 className="h-5 w-5 text-blue-400" />
              <h3 className="text-lg font-semibold">Short URL</h3>
            </div>

            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-blue-400 hover:underline"
            >
              {shortUrl}
            </a>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-4 flex items-center gap-3">
              <ExternalLink className="h-5 w-5 text-blue-400" />
              <h3 className="text-lg font-semibold">Original URL</h3>
            </div>

            <a
              href={data.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-zinc-300 hover:text-white hover:underline"
            >
              {data.originalUrl}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}