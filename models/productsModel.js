const connection = require('./connection');

const add = async (name, quantity) => {
  const [row] = await connection.execute(
    'INSERT INTO products (name, quantity) VALUES (?,?)',
    [name, quantity],
  );

  return { id: row.insertId, name, quantity };
};

const getAll = async () => {
  const [row] = await connection.execute(
    'SELECT * FROM products',
  );

  return row;
};

const getById = async (id) => {
  const [row] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );

  if (!row.length) return null;

  return row[0];
};

const update = async (id, name, quantity) => {
  await connection.execute(
    'UPDATE products SET name = ?, quantity = ? WHERE id = ?',
    [name, quantity, id],
  );

  return { id, name, quantity };
};

const remove = async (id) => {
  const product = await getById(id);
  if (!product) return null;
  await connection.execute('DELETE FROM products WHERE id = ?', [id]);
  return product;
};

module.exports = { add, getAll, getById, update, remove };