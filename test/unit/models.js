const sinon = require('sinon');
const { expect } = require('chai');
const { connection, productsModel, salesModel } = require('../../models');

describe('Testing the products table', () => {
  const product = {
    name: 'Mjölnir',
    quantity: 1,
  };

  beforeEach(async () => {
    const execute = [{ insertId: 1 }];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  afterEach(async () => {
    connection.execute.restore();
  });

  describe('Testing the request', () => {
    it('will be validated that the "name" field is mandatory', async () => {
      
    });
  });
});