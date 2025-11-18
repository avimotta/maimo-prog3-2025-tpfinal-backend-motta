import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: String,
  comment: String,
  date: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  genre: {
    type: String
  },
  year: {
    type: Number
  },
  cover: {
    type: String 
  },
  rating: {
    type: Number,
    default: 0
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: false
  },
  reviews: [reviewSchema]
});


const Product = mongoose.model("Product", productSchema);

export default Product;
