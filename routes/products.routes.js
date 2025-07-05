import { Router } from "express";
import { promises as fs } from 'fs';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const router = Router();
 
// Get the current file's directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load the JSON data
const data = JSON.parse(readFileSync(join(__dirname, '../data/products.json'), 'utf8'));

// Helper function to find similar products
function findSimilarProducts(currentProductId, maxResults = 4) {
  const currentProduct = data.products[currentProductId];
  if (!currentProduct) return []; 

  // Find which category and classification this product belongs to
  let productCategory = null;
  let productClassification = null;
  
  // Search through categories
  for (const [categoryId, category] of Object.entries(data.categories)) {
    // Check if product is directly in category
    if (category.products && category.products.includes(currentProductId)) {
      productCategory = categoryId;
      break;
    }
    
    // Check if product is in a classification
    if (category.classifications) {
      for (const [classificationId, classification] of Object.entries(category.classifications)) {
        if (classification.products && classification.products.includes(currentProductId)) {
          productCategory = categoryId;
          productClassification = classificationId;
          break;
        }
      }
      if (productCategory) break;
    }
  }

  let similarProducts = [];
  
  if (productCategory) {
    const category = data.categories[productCategory];
    
    // If product is in a classification, get other products from same classification first
    if (productClassification && category.classifications) {
      const classification = category.classifications[productClassification];
      const classificationProducts = classification.products
        .filter(id => id !== currentProductId && data.products[id])
        .map(id => ({ key: id, ...data.products[id] }));
      
      similarProducts.push(...classificationProducts);
    }
    
    // Then get other products from the same category
    if (category.products) {
      const categoryProducts = category.products
        .filter(id => id !== currentProductId && data.products[id])
        .map(id => ({ key: id, ...data.products[id] }));
      
      similarProducts.push(...categoryProducts);
    }
    
    // If we still need more products, get from other classifications in the same category
    if (similarProducts.length < maxResults && category.classifications) {
      for (const [classId, classification] of Object.entries(category.classifications)) {
        if (classId !== productClassification) {
          const otherClassProducts = classification.products
            .filter(id => id !== currentProductId && data.products[id])
            .map(id => ({ key: id, ...data.products[id] }));
          
          similarProducts.push(...otherClassProducts);
        }
      }
    }
  }
  
  // Remove duplicates and limit results
  const uniqueProducts = similarProducts.filter((product, index, self) => 
    index === self.findIndex(p => p.key === product.key)
  );
  
  return uniqueProducts.slice(0, maxResults);
}

// Main products page - shows all categories and 6 random products
router.get('/', (req, res) => {
  const categories = data.categories;
  const products = data.products;

  // Filter: Only products with a non-empty description of reasonable length
  let allProducts = Object.entries(products)
    .filter(([key, p]) => p.description && p.description.trim().length > 40)
    .map(([key, p]) => ({ key, ...p }));

  // Sort by description length for uniformity
  allProducts.sort((a, b) => a.description.length - b.description.length);

  // Pick a "center" window of products with similar description lengths
  const mid = Math.floor(allProducts.length / 2);
  const windowSize = Math.min(12, allProducts.length);
  const start = Math.max(0, mid - Math.floor(windowSize / 2));
  const candidates = allProducts.slice(start, start + windowSize);

  // Shuffle and pick 6 random products from the candidates
  const shuffled = candidates.sort(() => 0.5 - Math.random());
  const randomProducts = shuffled.slice(0, 6);

  res.render('products/index', {
    title: 'Products',
    categories,
    randomProducts
  });
});

// Category page - shows category details with classifications or products
router.get('/category/:categoryId', (req, res) => {
  const categoryId = req.params.categoryId;
  const category = data.categories[categoryId];
  
  if (!category) {
    return res.status(404).render('404', { message: 'Category not found' });
  }
  
  let categoryData = {
    id: categoryId,
    ...category
  };
  
  // If category has classifications
  if (category.hasClassifications && category.classifications) {
    // Process each classification
    const processedClassifications = {};
    
    Object.keys(category.classifications).forEach(classificationId => {
      const classification = category.classifications[classificationId];
      const classificationProducts = [];
      
      // Get products for this classification
      classification.products.forEach(productId => {
        if (data.products[productId]) {
          classificationProducts.push({
            key: productId,
            ...data.products[productId]
          });
        }
      });
      
      processedClassifications[classificationId] = {
        id: classificationId,
        ...classification,
        products: classificationProducts,
        displayType: classificationProducts.length > 6 ? 'slider' : 'grid'
      };
    });
    
    categoryData.processedClassifications = processedClassifications;
  } else {
    // No classifications - get all products directly
    const categoryProducts = [];
    category.products.forEach(productId => {
      if (data.products[productId]) {
        categoryProducts.push({
          key: productId,
          ...data.products[productId]
        });
      }
    });
    categoryData.products = categoryProducts;
  }
  
  res.render('products/category', {
    title: category.title,
    category: categoryData
  });
});

// Classification products page - shows all products in a classification
router.get('/category/:categoryId/classification/:classificationId', (req, res) => {
  const { categoryId, classificationId } = req.params;
  const category = data.categories[categoryId];
  
  if (!category || !category.classifications || !category.classifications[classificationId]) {
    return res.status(404).render('404', { message: 'Classification not found' });
  }
  
  const classification = category.classifications[classificationId];
  const products = [];
  
  classification.products.forEach(productId => {
    if (data.products[productId]) {
      products.push({
        key: productId,
        ...data.products[productId]
      });
    }
  });
  
  res.render('products/classification', {
    title: classification.title,
    category: {
      id: categoryId,
      title: category.title
    },
    classification: {
      id: classificationId,
      ...classification
    },
    products
  });
});

// Individual product page
router.get('/product/:productId', (req, res) => {
  const productId = req.params.productId;
  const product = data.products[productId];
  
  if (!product) {
    return res.status(404).render('404', { message: 'Product not found' });
  }
  
  // Get similar products
  const similarProducts = findSimilarProducts(productId, 4);
  
  res.render('products/product', {
    title: product.title,
    product: {
      key: productId,
      ...product
    },
    similarProducts
  });
});

export default router;