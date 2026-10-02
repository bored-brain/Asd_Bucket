const { readData, writeData, delayReadData } = require("../database/db");

async function getAllProducts() {
  return await delayReadData();
}

async function getProductById(id) {
  let products = await delayReadData();
  let product = products.find((item) => item.id === id);
  return product || null;
}

async function createProduct(productData) {
  let products = await readData();
  let newId =
    products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
  let newProduct = { id: newId, ...productData };
  products.push(newProduct);
  await writeData(products);
  return newProduct;
}

async function updateProduct(id, productData) {
  let products = await readData();
  let index = products.findIndex((item) => item.id === id);
  if (index === -1) return null;
  products[index] = { id, ...productData };
  await writeData(products);
  return products[index];
}

async function patchProduct(id, productData) {
  let products = await readData();
  let index = products.findIndex((item) => item.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...productData };
  await writeData(products);
  return products[index];
}

async function deleteProduct(id) {
  let products = await readData();
  let index = products.findIndex((item) => item.id === id);
  if (index === -1) return null;
  let deleted = products.splice(index, 1)[0];
  await writeData(products);
  return deleted;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
};
