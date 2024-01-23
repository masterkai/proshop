import express from "express";
import DotEnv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

DotEnv.config();
const PORT = process.env.PORT || 5000;
connectDB();
const app = express();
app.use(cors("*"));
app.get("/", (req, res) => {
  res.send("API is available");
});
app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
