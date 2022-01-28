const connection = require('./connection');

const add = async (name, quantity) => {
  const [row] = await connection.query(
    'INSERT INTO products (name, quantity) VALUES (?,?)',
    [name, quantity],
  );

  return { id: row.insertId, name, quantity };
};

const getAll = async () => {
  const [row] = await connection.query(
    'SELECT * FROM products',
  );

  return row;
};

const getById = async (id) => {
  const [row] = await connection.query(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );

  if (!row.length) return null;

  return row;
};

const update = async (id, name, quantity) => {
  await connection.query(
    'UPDATE products SET name = ?, quantity = ? WHERE id = ?',
    [name, quantity, id],
  );
};

const remove = async (id) => {
  const product = await getById(id);
  if (!product) return null;
  await connection.query('DELETE FROM products WHERE id = ?', [id]);
  return product;
};

module.exports = { add, getAll, getById, update, remove };