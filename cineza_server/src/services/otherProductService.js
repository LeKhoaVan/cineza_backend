const { Op, where } = require("sequelize");

const { db } = require("../models/index");

const getAllOtherProductService = async () => {
  const otherProducts = await db.OtherProduct.findAll();
  return otherProducts;
};

const getByCodeService = async (code) => {
  const otherProduct = db.OtherProduct.findOne({
    where: {
      code: code,
    },
  });

  return otherProduct;
};

const otherProductCreateService = async (otherProduct) => {
  return await db.OtherProduct.create(otherProduct);
};

module.exports = {
  otherProductCreateService,
  getByCodeService,
  getAllOtherProductService,
};
