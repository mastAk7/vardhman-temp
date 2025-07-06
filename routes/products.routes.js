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

// Helper function to get all products with filtering
function getFilteredProducts(filters = {}) {
  const { sector, category, classification, market, type, search } = filters;
  
  let filteredProducts = Object.entries(data.products)
    .map(([key, product]) => ({ key, ...product }));

  // Filter by sector
  if (sector) {
    filteredProducts = filteredProducts.filter(product => {
      if (Array.isArray(product.sector)) {
        return product.sector.includes(sector);
      }
      return product.sector === sector;
    });
  }

  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(product => 
      product.category === category
    );
  }

  // Filter by classification (subcategory)
  if (classification) {
    filteredProducts = filteredProducts.filter(product => 
      product.subcategory === classification
    );
  }

  // Filter by market
  if (market) {
    filteredProducts = filteredProducts.filter(product => {
      if (Array.isArray(product.market)) {
        return product.market.includes(market);
      }
      return product.market === market;
    });
  }

  // Filter by type
  if (type) {
    filteredProducts = filteredProducts.filter(product => 
      product.type === type
    );
  }

  // Filter by search term
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(product => 
      product.title.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower)
    );
  }

  return filteredProducts;
}

// Helper function to get sidebar data
function getSidebarData() {
  const sectors = new Set();
  const categories = {};
  const markets = new Set();
  const types = new Set();

  // Collect all unique sectors, markets, and types from products
  Object.values(data.products).forEach(product => {
    // Sectors
    if (Array.isArray(product.sector)) {
      product.sector.forEach(s => sectors.add(s));
    } else {
      sectors.add(product.sector);
    }

    // Markets
    if (Array.isArray(product.market)) {
      product.market.forEach(m => markets.add(m));
    } else {
      markets.add(product.market);
    }

    // Types
    types.add(product.type);
  });

  // Process categories with their classifications
  Object.entries(data.categories).forEach(([categoryId, category]) => {
    categories[categoryId] = {
      title: category.title,
      hasClassifications: category.hasClassifications,
      classifications: category.classifications || {}
    };
  });

  return {
    sectors: Array.from(sectors),
    categories,
    markets: Array.from(markets),
    types: Array.from(types)
  };
}

// Main products page - shows all products with sidebar filtering
router.get('/', (req, res) => {
  const filters = {
    sector: req.query.sector,
    category: req.query.category,
    classification: req.query.classification,
    market: req.query.market,
    type: req.query.type,
    search: req.query.search
  };

  const filteredProducts = getFilteredProducts(filters);
  const sidebarData = getSidebarData();

  res.render('products/index', {
    title: 'Products',
    products: filteredProducts,
    sidebar: sidebarData,
    filters,
    totalResults: filteredProducts.length
  });
});

// Sector filter route - /products/airports, /products/defense, etc.
router.get('/:sector', (req, res) => {
  const sector = req.params.sector;
  const filters = {
    sector,
    category: req.query.category,
    classification: req.query.classification,
    market: req.query.market,
    type: req.query.type,
    search: req.query.search
  };

  const filteredProducts = getFilteredProducts(filters);
  const sidebarData = getSidebarData();

  res.render('products/index', {
    title: `${sector.charAt(0).toUpperCase() + sector.slice(1)} Products`,
    products: filteredProducts,
    sidebar: sidebarData,
    filters,
    totalResults: filteredProducts.length
  });
});

// Category filter route - /products/category/air_traffic_management
router.get('/category/:categoryId', (req, res) => {
  const categoryId = req.params.categoryId;
  const category = data.categories[categoryId];
  
  if (!category) {
    return res.status(404).render('404', { message: 'Category not found' });
  }
  
  const filters = {
    sector: req.query.sector,
    category: categoryId,
    classification: req.query.classification,
    market: req.query.market,
    type: req.query.type,
    search: req.query.search
  };

  const filteredProducts = getFilteredProducts(filters);
  const sidebarData = getSidebarData();

  res.render('products/index', {
    title: `${category.title} Products`,
    products: filteredProducts,
    sidebar: sidebarData,
    filters,
    totalResults: filteredProducts.length
  });
});

// Classification filter route - /products/classification/led_technology
router.get('/classification/:classificationId', (req, res) => {
  const classificationId = req.params.classificationId;
  
  // Find the classification across all categories
  let foundClassification = null;
  let parentCategory = null;
  
  Object.entries(data.categories).forEach(([categoryId, category]) => {
    if (category.classifications && category.classifications[classificationId]) {
      foundClassification = category.classifications[classificationId];
      parentCategory = category;
    }
  });
  
  if (!foundClassification) {
    return res.status(404).render('404', { message: 'Classification not found' });
  }
  
  const filters = {
    sector: req.query.sector,
    category: req.query.category,
    classification: classificationId,
    market: req.query.market,
    type: req.query.type,
    search: req.query.search
  };

  const filteredProducts = getFilteredProducts(filters);
  const sidebarData = getSidebarData();

  res.render('products/index', {
    title: `${foundClassification.title} Products`,
    products: filteredProducts,
    sidebar: sidebarData,
    filters,
    totalResults: filteredProducts.length
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