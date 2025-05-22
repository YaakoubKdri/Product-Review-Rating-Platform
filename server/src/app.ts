import express from "express";
import cors from "cors";
import productRoutes from "./routes/products";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;

