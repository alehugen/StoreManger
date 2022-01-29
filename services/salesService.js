const salesModel = require('../models/salesModel');
const productsService = require('./productsService');

const add = async (sales) => salesModel.add(sales);

const getAll = async () => salesModel.getAll();

const getById = async (id) => {
  const sale = await salesModel.getById(id);

  return sale;
};

const getAllFromSP = async () => salesModel.getAllFromSP();

const updateProductQuantity = async (sales) => {
  const updateQuantity = sales.map(async (sale) => {
    const { product_id: id, quantity: saleQuantity } = sale;

    const product = await productsService.getById(id);
    product.quantity -= saleQuantity;

    await productsService.update(product);
  });
  await Promise.all(updateQuantity);

  const createSale = await add(sales);

  return createSale;
};

const update = async ({ product_id: id, quantity }) => {
  const updatedSale = await salesModel.update(id, quantity);

  return updatedSale;
};

const remove = async (id) => {
  if (!id) return null;
  const [sale] = await getById(id);

  const product = await productsService.getById(sale.product_id);
  product.quantity += sale.quantity;

  const removeSale = await salesModel.remove(id);

  await productsService.update(product);

  return removeSale;
};

module.exports = {
  add: updateProductQuantity,
  insert: add,
  getAll,
  getById,
  getAllFromSP,
  update,
  remove,
};