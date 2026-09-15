import { Queue } from "bullmq";

export const analyticsQueue = new Queue("analytics", {
  connection: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});