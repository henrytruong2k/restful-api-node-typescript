import { checkProductData } from "./../middleware/validate";
import express from "express";
import productCtrl from "../controllers/productCtrl";

const router = express.Router();
// C.R.U.D (Create, Read, Update, Delete)

router.get("/products", productCtrl.getProducts);

router.get("/products/:id", productCtrl.getProduct);

router.post("/products", checkProductData, productCtrl.addProduct);

router.put("/products/:id", checkProductData, productCtrl.updateProduct);

router.delete("/products/:id", productCtrl.deleteProduct);

export default router;
