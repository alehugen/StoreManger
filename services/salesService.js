const salesModel = require('../models/salesModel');

const add = async (...sales) => salesModel.add(sales);

const getAll = async () => salesModel.getAll();

const getById = async (id) => {
  const sale = await salesModel.getById(id);

  if (!sale) {
    throw new ReferenceError('Sale not found');
  }
};

const update = async ({ id, quantity }) => {
  await getById(id);

  const updatedSale = await salesModel.update(id, quantity);

  return updatedSale;
};

const remove = async (id) => {
  await salesModel.remove(id);
};

module.exports = { add, getAll, getById, update, remove };