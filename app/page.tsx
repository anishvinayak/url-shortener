import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import ShortenForm from "@/components/shorten-form";
import FeatureCard from "@/components/feature-card";
import Footer from "@/components/footer";

import {
  Database,
  Workflow,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Database,
    title: "Redis Cache",
    description:
      "Cache-aside architecture delivers fast redirects after the first request.",
  },
  {
    icon: Workflow,
    title: "BullMQ Worker",
    description:
      "Click analytics are processed asynchronously without slowing redirects.",
  },
  {
    icon: ShieldCheck,
    title: "Distributed Design",
    description:
      "Rate limiting, distributed locking, and shared Redis prepare the app for multiple API instances.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <Hero />

      <ShortenForm />

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">
            Built for Scale
          </h2>

          <p className="mt-3 text-zinc-400">
            Production-inspired backend architecture with Redis,
            BullMQ, PostgreSQL, and Prisma.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}