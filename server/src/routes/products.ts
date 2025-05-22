import express from "express";
import * as productController from "../controllers/productController";
import * as reviewController from "../controllers/reviewController";

const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/search", productController.searchProducts);
router.get("/:id", productController.getProductById);
router.post("/", productController.addProduct);          
router.put("/:id", productController.updateProduct);     
router.get("/:id/reviews", reviewController.getReviews);
router.post("/:id/reviews", reviewController.addReview);
router.put("/:productId/reviews/:id", reviewController.updateReview);
router.delete("/:productId/reviews/:id", reviewController.deleteReview);

export default router;
