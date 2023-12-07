// app.js
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { check, validationResult } = require('express-validator');
const ProductManager = require('./ProductManager');

const app = express();

// Middleware
app.use(express.json());
app.use(helmet()); 
app.use(cors()); 


const productManager = new ProductManager();

// Rutas
app.get('/products', (req, res) => {
  const limit = req.query.limit;
  let products = productManager.getAllProducts();

  if (limit) {
    products = products.slice(0, parseInt(limit, 10));
  }

  res.json({ products });
});

app.get('/products/:pid', [
  check('pid').isInt().toInt(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const productId = req.params.pid;
  const product = productManager.getProductById(productId);

  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor Express iniciado en http://localhost:${port}`);
});
