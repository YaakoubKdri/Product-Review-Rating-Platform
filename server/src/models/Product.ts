import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  price: Number,
  dateAdded: { type: Date, default: Date.now }
});

export default mongoose.model("Product", ProductSchema);

