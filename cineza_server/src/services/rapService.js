const { db } = require("../models/index");

const getRapByCodeService = async (code) => {
  const query = `select r.code, r.name, r.openTime, r.closeTime, r.countryAddress, r.cityAddress, r.districtAddress, r.wardAddress, r.status, r.numberRap, px.fullName as nameWard, qh.fullName as nameDistrict, ttp.fullName as nameCity, qg.fullName as nameCountry from Rap as r
    join Address as px on r.wardAddress = px.code
    join Address as qh on r.districtAddress = qh.code
    join Address as ttp on r.cityAddress = ttp.code
    join Address as qg on r.countryAddress = qg.code
    where r.code = '${code}'`;
  const [rap, metadata] = await db.sequelize.query(query);
  return rap[0];
};
const getAllRapService = async () => {
  const query = `select r.code, r.name, r.openTime, r.closeTime, r.countryAddress, r.cityAddress, r.districtAddress, r.wardAddress, r.status, r.numberRap, px.fullName as nameWard, qh.fullName as nameDistrict, ttp.fullName as nameCity, qg.fullName as nameCountry from rap as r
        join Address as px on r.wardAddress = px.code
        join Address as qh on r.districtAddress = qh.code
        join Address as ttp on r.cityAddress = ttp.code
        join Address as qg on r.countryAddress = qg.code
        where r.status="Hoạt động" || r.status="Khóa hoạt động"`;
  const [allRap, metadata] = await db.sequelize.query(query);
  return allRap;
};

const createRapService = async (rap) => {
  const newRap = await db.Rap.create(rap);
  return newRap;
};

const getValueRapByCodeService = async (code) => {
  const valueRap = await db.Rap.findOne({
    where: {
      code: code,
    },
  });
  return valueRap;
};

const updateRapService = async (code, rap) => {
  const updateRap = await db.Rap.update(rap, {
    where: {
      code: code,
    },
  });
  return updateRap;
};

module.exports = {
  getAllRapService,
  createRapService,
  getRapByCodeService,
  updateRapService,
  getValueRapByCodeService,
};
