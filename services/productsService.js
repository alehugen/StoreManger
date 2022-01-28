const productsModel = require('../models/productModel');

const getAll = async () => productsModel.getAll();

const getById = async (id) => {
  const product = await productsModel.getById(id);

  return product;
};

const add = async ({ name, quantity }) => productsModel.add(name, quantity);

const update = async ({ id, name, quantity }) => {
  await getById(id);

  const updatedProduct = await productsModel.update(id, name, quantity);

  return updatedProduct;
};

const partialUpdate = async (id, data) => {
  const currentProduct = await getById(id);

  const newProductData = {
    ...currentProduct,
    ...data,
  };

  const updatedProduct = await productsModel.update({ id, ...newProductData });

  return updatedProduct;
};

const remove = async (id) => {
  await productsModel.remove(id);
};

module.exports = { getAll, getById, add, update, partialUpdate, remove };