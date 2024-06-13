import { Product } from "../types/types";
export const mockData: Record<string, Product> = {
  B07HGTZSZY: {
    code: "B07HGTZSZY",
    title: "Example Product 1",
    variationCount: 3,
    ratingCount: 100,
    averageRating: 4.5,
    buyBoxPrices: {
      last30Days: 25.5,
      last90Days: 24.8,
      last180Days: 23.9,
    },
    inStockRate: {
      last30Days: 0.95,
      last90Days: 0.92,
      last180Days: 0.9,
    },
    salesRankChartData: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      data: [5000, 4800, 4600, 4500, 4600],
    },
    productImage: "https://example.com/product-image1.jpg",
  },
  B08JG8J5JP: {
    code: "B08JG8J5JP",
    title: "Example Product 2",
    variationCount: 2,
    ratingCount: 50,
    averageRating: 4.2,
    buyBoxPrices: {
      last30Days: 30.0,
      last90Days: 29.5,
      last180Days: 29.0,
    },
    inStockRate: {
      last30Days: 0.97,
      last90Days: 0.93,
      last180Days: 0.91,
    },
    salesRankChartData: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      data: [6000, 5800, 5600, 5500, 5600],
    },
    productImage: "https://example.com/product-image2.jpg",
  },
  B09XYZ1234: {
    code: "B09XYZ1234",
    title: "Example Product 3",
    variationCount: 4,
    ratingCount: 200,
    averageRating: 4.7,
    buyBoxPrices: {
      last30Days: 40.0,
      last90Days: 39.0,
      last180Days: 38.0,
    },
    inStockRate: {
      last30Days: 0.98,
      last90Days: 0.96,
      last180Days: 0.95,
    },
    salesRankChartData: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      data: [7000, 6800, 6600, 6500, 6600],
    },
    productImage: "https://example.com/product-image3.jpg",
  },
};
