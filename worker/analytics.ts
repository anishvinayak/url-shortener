import "dotenv/config";
import { Worker } from "bullmq";

import { db } from "@/lib/db";
import { configDotenv } from "dotenv";

const worker = new Worker(
  "analytics",
  async (job) => {
    const { shortCode } = job.data;

    await db.url.update({
      where: {
        shortCode,
      },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    console.log(`Processed click for ${shortCode}`);
  },
  {
    connection: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    },
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed`, err);
});