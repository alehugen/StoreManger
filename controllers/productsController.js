const rescue = require('express-rescue');
const Products = require('express').Router();

const productsService = require('../services/productsService');
const { validateName, validateQuantity } = require('./middlewares/validateProducts');

Products.post(
  '/',
  validateName,
  validateQuantity,
  rescue(async (req, res) => {
    const { name, quantity } = req.body;

    const newProduct = await productsService.add({ name, quantity });

    res.status(201).json(newProduct);
  }),
);

Products.get(
  '/',
  rescue(async (_req, res) => {
    const products = await productsService.getAll();

    res.status(200).json(products);
  }),
);

Products.get(
  '/:id',
  rescue(async (req, res) => {
    const product = await productsService.getById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(product);
  }),
);

Products.put(
  '/:id',
  validateQuantity,
  rescue(async (req, res) => {
    const { id } = req.params;

    const { name, quantity } = req.body;

    if (!name) return res.status(400).json({ message: '"name" is required' });
    if (name.length < 5) {
      return res.status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
    }

    const product = await productsService.getById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const updatedProduct = await productsService.update({ id, name, quantity });

    res.status(200).json(updatedProduct);
  }),
);

Products.delete(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;

    const product = await productsService.getById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await productsService.remove(id);

    res.status(200).json(product);
  }),
);

module.exports = Products;