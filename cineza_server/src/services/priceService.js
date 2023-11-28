const { QueryTypes } = require("sequelize");
const { db } = require("../models/index");

const getAllPriceByHeaderService = async (codeHeader) => {
  const query = `select pr.code, pr.value, pr.codeTypeSeat, pr.codeHeader, pr.status, ph.description as nameHeader, ts.type as typeSeat from price as pr
        join priceheader as ph on pr.codeHeader = ph.code
        join typeseat as ts on pr.codeTypeSeat = ts.code
        where pr.codeHeader = '${codeHeader}'`;

  const [allPrice, metadata] = await db.sequelize.query(query);
  return allPrice;
};

const getPriceByCodeService = async (code) => {
  const price = await db.Price.findOne({
    where: {
      code: code,
    },
  });
  return price;
};

const createPriceService = async (price) => {
  const priceNew = await db.Price.create(price);
  return priceNew;
};

const getValuePriceByCodeService = async (code) => {
  const valuePrice = await db.Price.findOne({
    where: {
      code: code,
    },
  });
  return valuePrice;
};

const updatePriceService = async (code, price) => {
  const updatePrice = await db.Price.update(price, {
    where: {
      code: code,
    },
  });
  return updatePrice;
};

const checkTimePriceService = async (codeHeader, codeTypeSeat) => {
  const query = `select * from price as p
  where p.codeHeader = "${codeHeader}" and codeTypeSeat="${codeTypeSeat}" and status = "Hoạt đông";`

  const dataCheck = await db.sequelize.query(query, { type: QueryTypes.SELECT });
  return dataCheck;
}

const updateStatusAllByHeaderAndTypeService = async (codeHeader, codeTypeSeat) => {
  const query = `
  UPDATE price as p
  SET p.status = "Khóa tạm thời"
  WHERE p.codeHeader = "${codeHeader}" and p.codeTypeSeat = "${codeTypeSeat}"`;

  const resultData = await db.sequelize.query(query, { type: QueryTypes.UPDATE });
  return resultData;
}


module.exports = {
  getAllPriceByHeaderService,
  getPriceByCodeService,
  createPriceService,
  getValuePriceByCodeService,
  updatePriceService,
  checkTimePriceService,
  updateStatusAllByHeaderAndTypeService,
};
