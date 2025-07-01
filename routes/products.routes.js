import { Router } from "express";
import { promises as fs } from 'fs';
const router = Router();

// Helper function to convert JSON keys to URL-friendly slugs
const keyToSlug = (key) => {
    return key.replace(/_/g, '-');
};

// Helper function to convert URL slugs back to JSON keys
const slugToKey = (slug) => {
    return slug.replace(/-/g, '_');
};

// Main products page
router.get("/", async (req, res) => {
    try {
        const data = await fs.readFile('./public/data/products.json', 'utf8');
        const products = JSON.parse(data);
        res.render("products.ejs", { products });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error loading products");
    }
});

// Dynamic route for all products
router.get("/:productSlug", async (req, res) => {
    try {
        const data = await fs.readFile('./public/data/products.json', 'utf8');
        const products = JSON.parse(data);
        const productKey = slugToKey(req.params.productSlug);
        const product = products[productKey];
        
        if (!product) {
            return res.status(404).render("404.ejs", { 
                message: "Product not found" 
            });
        }
        
        res.render("product.ejs", { 
            product,
            productKey,
            productSlug: req.params.productSlug
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error loading product");
    }
});

export default router;