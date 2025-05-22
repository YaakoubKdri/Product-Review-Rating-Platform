import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product";
import Review from "./models/Review";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || "";

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Product.deleteMany();
    await Review.deleteMany();

    const sampleProducts = [
     { name: "Laptop", description: "Portable computer for work and entertainment.", category: "electronics", price: 250.00 },
     { name: "Smartphone", description: "Mobile device with calling, internet, and app capabilities.", category: "electronics", price: 300.00 },
     { name: "Headphones", description: "Audio device for listening to music and calls.", category: "electronics", price: 20.00 },
     { name: "Mouse", description: "Input device for computer navigation.", category: "electronics", price: 30.00 },
     { name: "Portable Speaker", description: "Compact device for playing audio wirelessly.", category: "electronics", price: 50.00 },
     { name: "Les misérable by Victor Hugo", description: "A French novel from 19th century written by Victor Hugo.", category: "books", price: 28.99 },
      { name: "Risalat al-Ghufran by Abu al-Ala al-Ma'arri", description: "A profound and satirical journey through the afterlife, predating Dante's Divine Comedy.", category: "books", price: 29.99 },      
      { name: "Le Petit Prince by Antoine de Saint-Exupéry", description: "A beloved allegorical novella exploring themes of friendship, love, loss, and the wisdom of childhood.", category: "books", price: 30.99 },
      { name: "L'Étranger by Albert Camus", description: "A philosophical novel about the detached existence of an individual confronted with the absurdity of life.", category: "books", price: 31.99 },
      { name: "Madame Bovary by Gustave Flaubert", description: "A seminal work of realism portraying the disillusionment and tragic fate of a provincial woman seeking romance.", category: "books", price: 32.99},
  { name: "The Shawshank Redemption", description: "A timeless story of hope and survival within prison walls.", category: "movies", price: 9.99 },
  { name: "Pulp Fiction", description: "A non-linear crime masterpiece with iconic characters and dialogue.", category: "movies", price: 12.99 },
  { name: "The Godfather", description: "A classic saga of family, power, and the mafia.", category: "movies", price: 14.99 },
  { name: "Spirited Away", description: "A magical and imaginative animated adventure.", category: "movies", price: 19.99 },
  { name: "Inception", description: "A mind-bending thriller exploring the world of dreams.", category: "movies", price: 11.99 },
  { name: "Casablanca", description: "A romantic wartime drama with unforgettable performances.", category: "movies", price: 10.99 },
  { name: "Seven Samurai", description: "An epic tale of honor and heroism as villagers hire samurai for protection.", category: "movies", price: 16.99 },
    ].map((p) => ({ ...p, dateAdded: new Date() }));

    const products = await Product.insertMany(sampleProducts);

    const sampleReviews = [
      { productId: products[0]._id, author: "Yaakoub", rating: 5, comment: "Works perfectly!" },
      { productId: products[1]._id, author: "Modric", rating: 1, comment: "It has network problems." },
      { productId: products[5]._id, author: "Anna", rating: 5, comment: "nice." },
      { productId: products[8]._id, author: "Yaakoub", rating: 3, comment: "Good book !" },
      { productId: products[12]._id, author: "Cristiano", rating: 4, comment: "Great film!" },
      { productId: products[13]._id, author: "Leo", rating: 3, comment: "Not bad." }
    ];

    await Review.insertMany(sampleReviews);

    console.log("Database seeded successfully...");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seed();

