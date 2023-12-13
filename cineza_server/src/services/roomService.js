const { db } = require("../models/index");

const getAllRoomService = async () => {
  const query = `select ro.code, ro.name, ro.codeRap, ro.status, r.name as nameRap from Room as ro
        join Rap as r on ro.codeRap = r.code
        where ;`;

  const [allRoom, metadata] = await db.sequelize.query(query);
  return allRoom;
};
const getAllRoomByRapCodeService = async (codeRap) => {
  const query = `select ro.code, ro.name, ro.codeRap, ro.status, r.name as nameRap from Room as ro
        join Rap as r on ro.codeRap = r.code
        where ro.codeRap = '${codeRap}' and ro.status IN('Hoạt động', 'Khóa tạm thời');`;

  const [allRoom, metadata] = await db.sequelize.query(query);
  return allRoom;
};
const getRoomByCodeService = async (code) => {
  const query = `select ro.code, ro.name, ro.codeRap, ro.status, r.name as nameRap from Room as ro
    join Rap as r on ro.codeRap = r.code
    where ro.code = '${code}'`;
  const [room, metadata] = await db.sequelize.query(query);
  return room[0];
};
const createRoomService = async (room) => {
  const newRoom = await db.Room.create(room);
  // save seat  (24 ghe thuong, 16 ghe vip)
  // "code": "a05",
  // "type" : "VIP",
  // "position" : "a01 h02",
  // "codeRoom" : "room01",
  // "status": "ACTIVE"
  let seat = {
    code: "",
    codeTypeSeat: "",
    position: "",
    codeRoom: "",
    status: "",
  };
  let positionA = 1;
  let positionB = 1;
  let positionC = 1;
  let positionD = 1;
  let positionE = 1;

  for (let index = 0; index < 40; index++) {
    if (index < 8) {
      seat.code = `seat${index + 1}-${newRoom.code}`;
      seat.codeTypeSeat = "ts01";
      seat.position = `A${positionA}`;
      seat.codeRoom = newRoom.code;
      seat.status = "Hoạt động";

      await db.Seat.create(seat);
      positionA++;
    } else if (index < 16) {
      seat.code = `seat${index + 1}-${newRoom.code}`;
      seat.codeTypeSeat = "ts01";
      seat.position = `B${positionB}`;
      seat.codeRoom = newRoom.code;
      seat.status = "Hoạt động";

      await db.Seat.create(seat);
      positionB++;
    } else if (index < 24) {
      seat.code = `seat${index + 1}-${newRoom.code}`;
      seat.codeTypeSeat = "ts01";
      seat.position = `C${positionC}`;
      seat.codeRoom = newRoom.code;
      seat.status = "Hoạt động";

      await db.Seat.create(seat);
      positionC++;
    } else if (index < 32) {
      seat.code = `seat${index + 1}-${newRoom.code}`;
      seat.codeTypeSeat = "ts02";
      seat.position = `D${positionD}`;
      seat.codeRoom = newRoom.code;
      seat.status = "Hoạt động";

      await db.Seat.create(seat);
      positionD++;
    } else if (index < 40) {
      seat.code = `seat${index + 1}-${newRoom.code}`;
      seat.codeTypeSeat = "ts02";
      seat.position = `E${positionE}`;
      seat.codeRoom = newRoom.code;
      seat.status = "Hoạt động";

      await db.Seat.create(seat);
      positionE++;
    }
  }
  return newRoom;
};

const getValueRoomByCodeService = async (code) => {
  const valueRoom = await db.Room.findOne({
    where: {
      code: code,
    },
  });
  return valueRoom;
};

const updateRoomService = async (code, room) => {
  const updateRoom = await db.Room.update(room, {
    where: {
      code: code,
    },
  });
  return updateRoom;
};

module.exports = {
  createRoomService,
  getAllRoomService,
  getRoomByCodeService,
  getAllRoomByRapCodeService,
  getValueRoomByCodeService,
  updateRoomService,
};
