const { db } = require("../models/index");

const getAllSeatService = async () => {
  const query = `select s.code, s.codeTypeSeat, s.position, s.codeRoom, s.status, s.isBook , r.name as nameRoom, ts.type as typeSeat
    from seat as s
    join room as r on r.code = s.codeRoom
    join typeSeat as ts on ts.code = s.codeTypeSeat;`;
  const [allSeat, setAllSeat] = await db.sequelize.query(query);
  return allSeat;
};

const getAllSeatByCodeRoomService = async (codeRoom) => {
  const query = `select s.code, s.codeTypeSeat, s.position, s.codeRoom, s.status, s.isBook , r.name as nameRoom, ts.type as typeSeat
  from seat as s
  join room as r on r.code = s.codeRoom
  join typeSeat as ts on ts.code = s.codeTypeSeat
    where s.codeRoom = '${codeRoom}'
    order by s.position asc`;
  const [allSeat, setAllSeat] = await db.sequelize.query(query);
  return allSeat;
};

const getAllSeatByCodeRoomAndCodeTypeService = async (codeRoom, codeType) => {
  const query = `select s.code, s.codeTypeSeat, s.position, s.codeRoom, s.status, s.isBook , r.name as nameRoom, ts.type as typeSeat, p.value
  from seat as s
  join room as r on r.code = s.codeRoom
  join typeSeat as ts on ts.code = s.codeTypeSeat
  join price as p on p.codeTypeSeat = ts.code
  join priceheader as ph on ph.code = p.codeHeader
    where s.codeRoom = '${codeRoom}' and s.codeTypeSeat = '${codeType}' and ph.status="Hoạt động" and p.status = "Hoạt động"
    order by s.position asc`;
  const [allSeat, setAllSeat] = await db.sequelize.query(query);
  return allSeat;
};

const getPriceSeatService = async (codeTypeSeat) => {
  const query = `select p.value, p.codeTypeSeat, ph.status from price as p
  join priceheader as ph on ph.code = p.codeHeader
  where p.codeTypeSeat = '${codeTypeSeat}' and ph.status = 'Hoạt động'  and p.status = "Hoạt động"`;
  const [price, metadata] = await db.sequelize.query(query);
  return price[0];
};

const getAllSeatByCodeService = async (code) => {
  const query = `select s.code, s.codeTypeSeat, s.position, s.codeRoom, s.status, s.isBook , r.name as nameRoom, ts.type as typeSeat
  from seat as s
  join room as r on r.code = s.codeRoom
  join typeSeat as ts on ts.code = s.codeTypeSeat
    where s.code = '${code}'`;
  const [seat, setSeat] = await db.sequelize.query(query);
  return seat[0];
};

const createSeatService = async (seat) => {
  const newSeat = await db.Seat.create(seat);
  return newSeat;
};

const getValueSeatByCodeService = async (code) => {
  const valueSeat = await db.Seat.findOne({
    where: {
      code: code,
    },
  });
  return valueSeat;
};

const updateSeatService = async (code, seat) => {
  const updateSeat = await db.Seat.update(seat, {
    where: {
      code: code,
    },
  });
  return updateSeat;
};

module.exports = {
  getAllSeatService,
  getAllSeatByCodeRoomService,
  getAllSeatByCodeRoomAndCodeTypeService,
  createSeatService,
  getAllSeatByCodeService,
  getValueSeatByCodeService,
  updateSeatService,
  getPriceSeatService,
};
