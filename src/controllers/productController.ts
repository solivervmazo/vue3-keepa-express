import { Request, Response } from "express";
import { setCache, getCache } from "../lib/redis";
import { productSchema } from "../helpers/validation";
import { fetchDataFromKeepa } from "../services/keepaService";
import { mockData } from "../mockers/mockData";
import { detectProductIdType } from "../helpers/detectProductIdType";

const REDIS_EXPIRATION_TIME = 3600; // Cache expiration time in seconds (1 hour)

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    productSchema.parse(id);

    const idType = detectProductIdType(id);

    if (idType === "unknown") {
      return res.status(400).json({ error: "Invalid product ID format" });
    }

    // Check Redis cache
    const cachedData = await getCache(id);
    if (cachedData) {
      console.log(`Serving cached data for product ID: ${id}`);
      return res.json(cachedData);
    }

    // Check mock data
    if (mockData[id]) {
      console.log(`Serving mock data for product ID: ${id}`);
      await setCache(id, mockData[id], REDIS_EXPIRATION_TIME); // Cache for 1 hour
      return res.json(mockData[id]);
    }

    // Fetch data from Keepa
    const data = await fetchDataFromKeepa(id, idType);
    if (data) {
      await setCache(id, data, 3600); // Cache for 1 hour
      return res.json(data);
    } else {
      return res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid product ID" });
  }
};
