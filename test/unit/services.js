const sinon = require('sinon');
const { expect } = require('chai');

const { connection } = require('../../models');
const productsService = require('../../services/productsService');
const salesService = require('../../services/salesService');

describe('Testing products and sales services', () => {
  beforeEach(async () => {
    const execute = [[]];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  afterEach(async () => connection.execute.restore());

  describe('testing getAllProducts function', () => {
    it('returns an array', async () => {
      const response = await productsService.getAll();

      expect(response).to.be.an('array');
    });

    it('contains an empty array', async () => {
      const response = await productsService.getAll();

      expect(response).to.be.empty;
    });
  });

  describe('testing addProduct function', async () => {
    it('returns an object', async () => {
      const result = { name: 'Mjölnir', quantity: 1 };
      const response = await productsService.add(result);

      expect(response).to.be.an('object');
    });
  });

  describe('testing getByIdProduct function', async () => {
    it('returns an empty value', async () => {
      const response = await productsService.getById();

      expect(response).to.be.null;
    });
  });

  describe('testing update function', async () => {
    it('returns an object with name undefined', async () => {
      const response = await productsService.update({ id: 1, quantity: 2 });

      expect(response).to.be.an('object');
      expect(response.name).to.be.undefined;
    });
  });

  describe('testing partialUpdate function', async () => {
    it('returns an object', async () => {
      const response = await productsService.partialUpdate({ id: 1, quantity: 2 });

      expect(response).to.be.an('object');
    });
  });

  describe('testing removeProduct function', async () => {
    it('returns an object and getAll is null', async () => {
      const getAll = await productsService.getAll();
      const response = await productsService.remove(1);

      expect(getAll).to.be.an('array');
      expect(getAll).to.be.empty;
      expect(response).to.be.undefined;
    });
  });

  describe('testing getAll function', async () => {
    it('returns an object', async () => {
      const response = await salesService.getAll();

      expect(response).to.be.an('array');
    });
  });

  describe('testing getByIdSales function', async () => {
    it('returns an empty value', async () => {
      const response = await salesService.getById();

      expect(response).to.be.null;
    });
  });

  describe('testing getAllFromSP function', async () => {
    it('returns an array', async () => {
      const response = await salesService.getAllFromSP();

      expect(response).to.be.an('array');
    });
  });

  describe('testing removeSale function', async () => {
    it('returns an object and getAll is null', async () => {
      const getAll = await salesService.getAll();
      const response = await salesService.remove();

      expect(getAll).to.be.an('array');
      expect(getAll).to.be.empty;
      expect(response).to.be.null;
    });
  });

  describe('testing updateQuantity function', async () => {
    it('returns an object undefined', async () => {
      const response = await salesService.update({ id: 1, quantity: 2 });

      expect(response).to.be.undefined;
    });
  });

  describe('testing insert function', async () => {
    it('returns an object', async () => {
      const fakeSale = [
        {
          "product_id": "product_id",
          "quantity": "product_quantity",
        }
      ];
      const response = await salesService.insert(fakeSale);

      expect(response).to.be.an('array');
    });
  });
});