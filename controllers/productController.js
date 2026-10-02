const productService = require("../services/productService");
const { setCache, invalidateCache } = require("../middleware/cache");

async function getAllProducts(req, res) {
  try {
    let products = await productService.getAllProducts();
    if (res.cacheKey) {
      setCache(res.cacheKey, products);
    }
    return res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
}

async function getProductById(req, res) {
  try {
    let id = Number(req.params.id);
    let product = await productService.getProductById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    if (res.cacheKey) {
      setCache(res.cacheKey, product);
    }
    return res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
}

async function createProduct(req, res) {
  try {
    let newProduct = await productService.createProduct(req.body);
    invalidateCache();
    res.status(201).json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
}

async function updateProduct(req, res) {
  try {
    let id = Number(req.params.id);
    let updated = await productService.updateProduct(id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Product not found" });
    }
    invalidateCache();
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
}

async function patchProduct(req, res) {
  try {
    let id = Number(req.params.id);
    let patched = await productService.patchProduct(id, req.body);
    if (!patched) {
      return res.status(404).json({ error: "Product not found" });
    }
    invalidateCache();
    res.json(patched);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
}

async function deleteProduct(req, res) {
  try {
    let id = Number(req.params.id);
    let deleted = await productService.deleteProduct(id);
    if (!deleted) {
      return res.status(404).json({ error: "Product not found" });
    }
    invalidateCache();
    res.json({ message: "Product deleted", product: deleted });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
};
