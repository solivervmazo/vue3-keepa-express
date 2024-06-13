// src/lib/redisClient.ts

import { createClient, RedisClientType } from "redis";

let redisClient: RedisClientType | null = null;

const MAX_RETRIES = 5; // Maximum number of retries before giving up

const getRedisClient = () => {
  if (!redisClient) {
    redisClient = createClient({
      url: "redis://default:bIpc7r8UY67mKr3AazjWvNtdqcX3aWvc@redis-10140.c302.asia-northeast1-1.gce.redns.redis-cloud.com:10140",
      socket: {
        reconnectStrategy: (retries: number) => {
          console.error(`Redis reconnect attempt #${retries}`);
          if (retries >= MAX_RETRIES) {
            console.error(
              "Max retries reached. Giving up on reconnecting to Redis."
            );
            return 0; // Stop retrying
          }
          return Math.min(retries * 100, 3000); // Exponential backoff with max delay of 3 seconds
        },
      },
    });

    redisClient.on("error", (err) => {
      console.error("Redis Client Error:", err);
    });

    redisClient.on("connect", () => {
      console.log("Connected to Redis");
    });

    redisClient.on("reconnecting", (delay) => {
      console.log(`Reconnecting to Redis in ${delay}ms`);
    });

    redisClient.on("ready", () => {
      console.log("Redis client is ready");
    });

    redisClient.connect().catch((err) => {
      console.error("Failed to connect to Redis:", err);
    });
  }
  return redisClient;
};

export const setCache = async (key: string, value: any, ttl: number) => {
  const client = getRedisClient();
  try {
    await client.set(key, JSON.stringify(value), { EX: ttl });
  } catch (error) {
    console.error(`Failed to set cache for key ${key}:`, error);
  }
};

export const getCache = async (key: string) => {
  const client = getRedisClient();
  try {
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Failed to get cache for key ${key}:`, error);
    return null;
  }
};
