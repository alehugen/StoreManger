const connection = require('./connection');

const add = async (sales) => {
  sales.forEach(async ({ productId, quantity }) => {
    if (!productId || !quantity.length) return null;

    const [row] = await connection.query(
      'INSERT INTO sales (date) VALUES (NOW())',
    );

    await connection.query(
      `INSERT INTO sales_products
        (sale_id, product_id, quantity)
        VALUES (?, ?, ?)
      `,
      [row.insertId, productId, quantity],
    );
  });
};

const getAll = async () => {
  const [row] = await connection.query('SELECT * FROM sales');
  return row;
};

const getById = async (id) => {
  const [row] = await connection.query('SELECT * FROM sales WHERE id = ?', [id]);
  if (!row.length) return null;
  return row[0];
};

const update = async (id, quantity) => {
  if (!(Number.isInteger(quantity)) || !quantity.length) return null;
  await connection.query(
    'UPDATE sales_products SET quantity = ? WHERE product_id = ?',
    [quantity, id],
  );
};

const remove = async (id) => {
  await connection.query(
    'DELETE FROM sales WHERE id = ?', [id],
  );
};

module.exports = { add, getAll, getById, update, remove };