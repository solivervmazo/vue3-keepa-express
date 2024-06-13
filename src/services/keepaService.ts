import axios from "axios";

const KEEP_API_KEY = process.env.KEEP_API_KEY;

export async function fetchDataFromKeepa(
  identifier: string,
  type: "asin" | "code" | "unknown"
) {
  const params: any = {
    key: KEEP_API_KEY,
    domain: "1", // for Amazon.com
    [type]: identifier,
    stats: 180, // Example parameter, you can adjust as needed
  };

  const response = await axios.get("https://api.keepa.com/product", { params });
  return response.data;
}
