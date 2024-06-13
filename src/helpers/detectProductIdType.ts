export const detectProductIdType = (
  productId: string
): "asin" | "code" | "unknown" => {
  const asinPattern = /^[A-Z0-9]{10}$/;
  const upcPattern = /^\d{12}$/;
  const eanPattern = /^\d{13}$/;

  if (asinPattern.test(productId)) {
    return "asin";
  } else if (upcPattern.test(productId) || eanPattern.test(productId)) {
    return "code";
  } else {
    return "unknown";
  }
};
