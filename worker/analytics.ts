import "dotenv/config";
import { Worker } from "bullmq";
import Redis from "ioredis";
import { db } from "@/lib/db";

const connection = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  "analytics",
  async (job) => {
    const { shortCode } = job.data;

    await db.url.update({
      where: { shortCode },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    console.log(`Processed click for ${shortCode}`);
  },
  { connection }
);