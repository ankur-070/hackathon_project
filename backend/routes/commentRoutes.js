import express from "express";
import { addComment, getComments } from "../controllers/commentcontroller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:id/comments", protect, addComment);
router.get("/:id/comments", getComments);

export default router;
