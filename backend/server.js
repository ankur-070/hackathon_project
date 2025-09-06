import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

// ROUTES IMPORTS
import authRoutes from "./routes/authRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";

dotenv.config();

// CREATE APP
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/items", commentRoutes); // nested comments under items

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

// CONNECT MONGODB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
