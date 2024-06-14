import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { getProduct } from "./controllers/productController";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Define your API endpoints
app.get("/api/product/:id", getProduct);
app.get("/api/summary/:id", getProduct);

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
