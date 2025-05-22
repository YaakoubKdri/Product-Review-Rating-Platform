import Product from "../models/Product";
import Review from "../models/Review";
import { Request, Response } from "express";

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category = "", page = 1, q = "" } = req.query;
    const limit = 10;
    const skip = (Number(page) - 1) * limit;
    const filter: any = {};

    if (category) filter.category = category;
    if (q) filter.name = { $regex: q, $options: "i" };

    const totalCount = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort({ dateAdded: -1 })
      .skip(skip)
      .limit(limit);

    const productsWithRatings = await Promise.all(
      products.map(async (product) => {
        const reviews = await Review.find({ productId: product._id });
        const avg =
          reviews.reduce((sum, r) => sum + (r.rating ?? 0), 0) /
          (reviews.length || 1);
        return {
          ...product.toObject(),
          id: product._id.toString(),
          averageRating: Number(avg.toFixed(1)),
          reviewCount: reviews.length,
        };
      })
    );

    res.json({
      products: productsWithRatings,
      totalCount,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const searchProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q = "" } = req.query;
    const products = await Product.find({ name: { $regex: q, $options: "i" } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error searching products" });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const reviews = await Review.find({ productId: product._id });
    const avg =
      reviews.reduce((sum, r) => sum + (r.rating ?? 0), 0) /
      (reviews.length || 1);

    res.json({
      ...product.toObject(),
      id: product._id.toString(),
      averageRating: Number(avg.toFixed(1)),
      reviewCount: reviews.length,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, category, price } = req.body;
    const newProduct = new Product({ name, description, category, price });
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Failed to add product", error: err });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update product", error: err });
  }
};

