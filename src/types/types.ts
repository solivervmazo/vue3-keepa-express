export interface Product {
  code: string;
  title: string;
  variationCount: number;
  ratingCount: number;
  averageRating: number;
  buyBoxPrices: {
    last30Days: number;
    last90Days: number;
    last180Days: number;
  };
  inStockRate: {
    last30Days: number;
    last90Days: number;
    last180Days: number;
  };
  salesRankChartData: {
    labels: string[];
    data: number[];
  };
  productImage: string;
  aiSummary?: string;
}
