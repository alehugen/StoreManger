const productsService = require('../../services/productsService');

const validateName = async (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
    return res.status(422)
    .json({ message: '"name" length must be at least 5 characters long' });
  }
  const product = await productsService.getAll();
  if (product.some((prod) => prod.name === name)) {
    return res.status(409).json({ message: 'Product already exists' });
  }

  next();
};

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;

  if (!quantity && quantity !== 0) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (typeof quantity !== 'number' || quantity <= 0) {
    return res.status(422)
    .json({ message: '"quantity" must be a number larger than or equal to 1' });
  }
  next();
};
module.exports = { validateName, validateQuantity };