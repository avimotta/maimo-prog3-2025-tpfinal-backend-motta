import express from "express";
import Product from "../models/products.js";

const router = express.Router();

/* ------------------------------------------------------
   GET TODOS LOS PRODUCTOS (también soporta ?categoryId=)
------------------------------------------------------ */
router.get("/", async (req, res) => {
  try {
    const { categoryId } = req.query;
    const filter = {};

    if (categoryId) {
      filter.category = categoryId;
    }

    const products = await Product.find(filter).populate("category");
    res.json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error al obtener productos" });
  }
});

/* -------------------------------
     GET PRODUCTO POR ID
-------------------------------- */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "No encontrado" });

    res.json(product);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({ message: "Error al obtener el producto" });
  }
});

/* -------------------------------
      CREAR PRODUCTO
-------------------------------- */
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(400).json({ message: "Error al crear el producto" });
  }
});

/* -------------------------------
      EDITAR PRODUCTO
-------------------------------- */
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(400).json({ error: error.message });
  }
});

/* ------------------------------------------------
      AGREGAR REVIEW A UN PRODUCTO
------------------------------------------------- */
router.post("/:id/reviews", async (req, res) => {
  try {
    const { user, comment, rating } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });

    const newReview = {
      user,
      comment,
      rating,
      date: new Date(),
    };

    product.reviews.push(newReview);
    await product.save();

    res.json({
      message: "Review agregada correctamente",
      review: newReview,
    });
  } catch (error) {
    console.error("Error agregando review:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

export default router;
