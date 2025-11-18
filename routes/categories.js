import { Router } from "express";
import Category from "../models/category.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, slug } = req.body;

    const category = new Category({ name, slug });
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating category" });
  }
});

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting categories" });
  }
});

export default router;
