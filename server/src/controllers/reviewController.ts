import Review from "../models/Review";
import { Request, Response } from "express";

export const getReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ productId: req.params.id });

    const formattedReviews = reviews.map((review) => {
      const obj = review.toObject();
      return {
        ...obj,
        id: obj._id.toString(),
      };
    });

    res.json(formattedReviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ message: "Error fetching reviews" });
  }
};



export const addReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const newReview = new Review({ ...req.body, productId: req.params.id });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: "Error adding review" });
  }
};

export const updateReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      res.status(404).json({ message: "Review not found" });
      return;
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Error updating review" });
  }
};

export const deleteReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Review not found" });
      return;
    }
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting review" });
  }
};

