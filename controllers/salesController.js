const rescue = require('express-rescue');
const Sales = require('express').Router();

const salesService = require('../services/salesService');
const {
  validateProductId,
  validateSales,
  validateProductQuantity,
} = require('./middlewares/validateSales');

Sales.post(
  '/',
  validateProductId,
  validateSales,
  validateProductQuantity,
  rescue(async (req, res) => {
    const newSale = await salesService.add(req.body);
    res.status(201).json({
      id: newSale.insertId,
      itemsSold: req.body,
    });
  }),
);

Sales.get(
  '/',
  rescue(async (_req, res) => {
    const sales = await salesService.getAll();
    res.status(200).json(sales);
  }),
);

Sales.get(
  '/:id',
  rescue(async (req, res) => {
    const sale = await salesService.getById(req.params.id);
    if (!sale) return res.status(404).json({ message: 'Sale not found' });
    res.status(200).json(sale);
  }),
);

Sales.put(
  '/:id',
  validateProductId,
  validateSales,
  validateProductQuantity,
  rescue(async (req, res) => {
    const { id } = req.params;
    const [product] = req.body;

    const sale = await salesService.getById(id);
    if (!sale) return res.status(404).json({ message: 'Sale not found' });

    await salesService.update(product);

    res.status(200).json({ saleId: id, itemUpdated: req.body });
  }),
);

Sales.delete(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;

    const sale = await salesService.getById(id);
    if (!sale) return res.status(404).json({ message: 'Sale not found' });

    await salesService.remove(id);

    res.status(200).json(sale);
  }),
);

module.exports = Sales;