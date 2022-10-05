import { Router } from "express";
import { body } from "express-validator";
import { validateUserInput } from "../middleware";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../services/product";
import {
  createUpdate,
  deleteUpdate,
  getUpdates,
  updateUpdate,
} from "../services/update";

const router = Router();

/***
 * product
 */
router.get("/product", getProducts);
router.get("/product/:id", getProduct);
router.put(
  "/product/:id",
  body("name").exists(),
  validateUserInput,
  updateProduct
);
router.post(
  "/product",
  body("name").exists().notEmpty(),
  validateUserInput,
  createProduct
);
router.delete("/product/:id", deleteProduct);

/**
 * update
 */
router.get("/updates", getUpdates);
router.put(
  "/update/:id",
  body("title").optional(),
  body("status").isIn(["in_progress", "shipped", "deprecated"]).optional(),
  body("body").optional(),
  body("version").optional(),
  validateUserInput,
  updateUpdate
);
router.post(
  "/update",
  body("productId").exists(),
  body("title").exists(),
  body("status").isIn(["in_progress", "shipped", "deprecated"]).optional(),
  body("body").exists(),
  body("version").optional(),
  validateUserInput,
  createUpdate
);
router.delete("/update/:id", deleteUpdate);
/**
 * updatepoints
 */
router.get("/updatepoints", () => {});
router.put(
  "/updatepoints/:id",
  body("name").optional(),
  body("description").optional(),
  validateUserInput,
  () => {}
);
router.post(
  "/updatepoints",
  body("name").exists(),
  body("description").exists(),
  body("updateId"),
  validateUserInput,
  () => {}
);
router.delete("/updatepoints/:id", () => {});

export default router;
