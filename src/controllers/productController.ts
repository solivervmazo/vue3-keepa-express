import { Request, Response } from "express";
import { setCache, getCache } from "../lib/redis";
import { productSchema } from "../helpers/validation";
import { fetchDataFromKeepa } from "../services/keepaService";
import { mockData } from "../mockers/mockData";
import { detectProductIdType } from "../helpers/detectProductIdType";
import { generateProductSummary } from "./aiController";
import { Product } from "../types/types";

const REDIS_EXPIRATION_TIME = 3600; // Cache expiration time in seconds (1 hour)

const makeProductSummary = async (product: Product): Promise<any> => {
  if (!product.aiSummary) {
    product.aiSummary = await generateProductSummary(product);
  }
  return product;
};

const fetchProduct = async (id: string): Promise<any> => {
  const idType = detectProductIdType(id);

  if (idType === "unknown") {
    throw new Error("Invalid product ID format");
  }

  // Check mock data
  if (mockData[id]) {
    console.log(`Serving mock data for product ID: ${id}`);
    mockData[id] = await makeProductSummary(mockData[id]);
    await setCache(id, mockData[id], REDIS_EXPIRATION_TIME); // Cache for 1 hour
    return mockData[id];
  }

  // Fetch data from Keepa
  const data = await fetchDataFromKeepa(id, idType);
  if (data) {
    const withSummary = await makeProductSummary(data);
    await setCache(id, withSummary, REDIS_EXPIRATION_TIME); // Cache for 1 hour
    return withSummary;
  } else {
    throw new Error("Product not found");
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    productSchema.parse(id);

    // Check Redis cache
    const cachedData = await getCache(id);
    if (cachedData) {
      console.log(`Serving cached data for product ID: ${id}`);
      return res.json(cachedData);
    }

    const data = await fetchProduct(id);
    return res.json(data);
  } catch (error: any) {
    if (error.message === "Invalid product ID format") {
      return res.status(400).json({ error: "Invalid product ID format" });
    } else if (error.message === "Product not found") {
      return res.status(404).json({ error: "Product not found" });
    } else {
      return res.status(400).json({ error: "Invalid product ID" });
    }
  }
};
