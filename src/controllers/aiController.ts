import { getOpenAiClient } from "../lib/openai";
import { Product } from "../types/types";

export const generateProductSummary = async (
  product: Product
): Promise<string> => {
  const sampleSummary = `Amazon has been in stock for this product more than 60% of the time over the past 90 days. The sales rank has shown a consistent pattern, maintaining a relatively low and stable position, indicating steady demand. There is no clear seasonality observed in the sales rank data. The buy box price has fluctuated moderately over the last 90 days, with noticeable variations between the FBA, FBM, and Amazon prices, suggesting competitive pricing dynamics among different sellers.`;

  const productDescription = `
      Code: ${product.code}
      Title: ${product.title}
      Variation Count: ${product.variationCount}
      Rating Count: ${product.ratingCount}
      Average Rating: ${product.averageRating}
      Buy Box Prices (last 30 days): ${product.buyBoxPrices.last30Days}
      Buy Box Prices (last 90 days): ${product.buyBoxPrices.last90Days}
      Buy Box Prices (last 180 days): ${product.buyBoxPrices.last180Days}
      In Stock Rate (last 30 days): ${product.inStockRate.last30Days}
      In Stock Rate (last 90 days): ${product.inStockRate.last90Days}
      In Stock Rate (last 180 days): ${product.inStockRate.last180Days}
      Sales Rank Data: ${product.salesRankChartData.data.join(", ")}
    `;

  const prompt = `Generate a summary for the following product data:\n\n${productDescription}.\n\nThe summary should be similar like this:\n\n${sampleSummary} `;

  try {
    const openai = getOpenAiClient();
    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "babbage-002",
    });

    const summary = response.choices[0]?.message?.content?.trim();
    return summary || "";
  } catch (error) {
    console.error("Error generating summary:", error);
    return "";
  }
};
