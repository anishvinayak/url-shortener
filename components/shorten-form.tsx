"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import ResultCard from "./result-card";

export default function ShortenForm() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }
      setShortUrl(data.shortUrl);
      setShortCode(data.shortCode);
      setUrl("");
    } catch {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-6 pb-16">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-2xl shadow-blue-500/5 backdrop-blur">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Enter a long URL
            </label>

            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-4 text-white outline-none transition focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Shortening...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Shorten URL
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-5 rounded-xl border border-red-900 bg-red-950/40 p-3 text-red-300">
            {error}
          </div>
        )}

        {shortUrl && (
          <div className="mt-6">
            <ResultCard shortUrl={shortUrl} shortCode={shortCode} />
          </div>
        )}
      </div>
    </section>
  );
}
