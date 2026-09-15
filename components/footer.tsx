export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-zinc-500 md:flex-row">
        <p>Distributed URL Shortener</p>

        <p>Built with Next.js · Redis · BullMQ · PostgreSQL · Prisma</p>
      </div>
    </footer>
  );
}