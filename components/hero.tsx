export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_60%)]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
          Redis • BullMQ • PostgreSQL • Prisma
        </div>

        <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
          Distributed URL Shortener
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
          High-performance URL shortening with Redis caching,
          BullMQ background workers, rate limiting, and
          distributed architecture.
        </p>
      </div>
    </section>
  );
}