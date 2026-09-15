"use client";

import Link from "next/link";
import { Copy, Check, BarChart3, ExternalLink } from "lucide-react";
import { useState } from "react";

interface ResultCardProps {
  shortUrl: string;
  shortCode: string;
}

export default function ResultCard({
  shortUrl,
  shortCode,
}: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg shadow-blue-500/5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-400">Your shortened URL</p>
          <h3 className="text-xl font-semibold text-white">
            Ready to share
          </h3>
        </div>

        <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
          <ExternalLink className="h-5 w-5" />
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all text-blue-400 hover:underline"
        >
          {shortUrl}
        </a>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-500"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy Link
            </>
          )}
        </button>

        <Link
          href={`/analytics/${shortCode}`}
          className="flex items-center justify-center gap-2 rounded-xl border border-zinc-700 px-4 py-3 font-medium text-zinc-300 transition hover:border-blue-500 hover:text-white"
        >
          <BarChart3 className="h-4 w-4" />
          View Analytics
        </Link>
      </div>
    </div>
  );
}