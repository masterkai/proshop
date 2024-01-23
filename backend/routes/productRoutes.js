import express from "express";
import {
  getProductByID,
  getProducts,
} from "../controller/productController.js";

const router = express.Router();
router.route("/").get(getProducts);
router.route("/:id").get(getProductByID);
export default router;
