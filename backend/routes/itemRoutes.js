import express from "express";
import { createItem, getItemById, getItems, updateItem } from "../controllers/itemcontroller.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", protect, upload.array('images', 5), createItem);
router.get("/", getItems);
router.get("/:id", getItemById);
router.put("/:id", protect, updateItem);

export default router;
