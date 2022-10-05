import { Router } from "express";
import { body } from "express-validator";
import { validateUserInput } from "../middleware";
const router = Router();
/***
 * product
 */
router.get("/product", (req, res) => res.send("hi"));

router.put(
  "/product/:id",
  body("name").exists(),
  validateUserInput,
  (req, res) => {}
);
router.post("/product", body("name").exists(), validateUserInput, () => {});
router.delete("/product/:id", () => {});

/**
 * update
 */
router.get("/update", () => {});
router.put("/update/:id", () => {});
router.post("/update", () => {});
router.delete("/update/:id", () => {});
/**
 * updatepoints
 */
router.get("/updatepoints", () => {});
router.get("/updatepoints/:id", () => {});
router.put("/updatepoints/:id", () => {});
router.post("/updatepoints", () => {});
router.delete("/updatepoints/:id", () => {});

export default router;
