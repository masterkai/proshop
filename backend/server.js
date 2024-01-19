import express from "express";
import products from "./data/products.js";
import DotEnv from "dotenv";
import cors from "cors";

DotEnv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors("*"));
app.get("/", (req, res) => {
  res.send("API is available");
});
app.get("/api/products", (req, res) => {
  res.send(products);
});
app.get("/api/products/:ID", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  res.send(product);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
