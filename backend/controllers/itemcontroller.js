import mongoose from "mongoose";
import Item from "../models/Item.js";

export const createItem = async (req, res) => {
  try {
    // Handle image uploads
    const imagePaths = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
    
    const itemData = {
      ...req.body,
      owner: req.user._id,
      images: imagePaths
    };
    
    const item = await Item.create(itemData);
    const populatedItem = await Item.findById(item._id).populate("owner", "name city");
    res.status(201).json(populatedItem);
  } catch (err) {
    res.status(500).json({ message: "Failed to create item", error: err.message });
  }
};

export const getItems = async (req, res) => {
  try {
    const { category, mode, status, city } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (mode) filter.mode = mode;
    if (status) filter.status = status;
    if (city) filter.city = city;

    const items = await Item.find(filter).populate("owner", "name city");
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch items", error: err.message });
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate("owner", "name city");
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Error fetching item", error: err.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    if (item.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update item", error: err.message });
  }
};
