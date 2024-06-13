import { z } from "zod";

export const productSchema = z.union([
  z.string().regex(/^B[\dA-Z]{9}$/), // ASIN
  z.string().regex(/^\d{12,14}$/), // UPC/EAN
]);
