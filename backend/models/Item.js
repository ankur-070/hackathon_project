import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    category: String, // electronics, furniture, clothing
    condition: String, // broken, needs repair, usable parts
    mode: { type: String, enum: ["repair-request", "offer-free"], required: true },
    images: [String],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["open", "in-progress", "fixed", "taken"], default: "open" },
    ecoScore: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
