
const fs = require('fs');

class ProductManager {
  constructor() {
    this.filePath = './productos.json';
    this.products = this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error al cargar productos:', error.message);
      return [];
    }
  }

  getAllProducts() {
    return this.products;
  }

  getProductById(productId) {
    return this.products.find(product => product.id === productId);
  }
}

module.exports = ProductManager;
