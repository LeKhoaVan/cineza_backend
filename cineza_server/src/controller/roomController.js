const {
  createRoomService,
  getAllRoomService,
  getRoomByCodeService,
  getAllRoomByRapCodeService,
  getValueRoomByCodeService,
  updateRoomService,
} = require("../services/roomService");

const getAllRoomController = async (req, res) => {
  try {
    const allRoom = await getAllRoomService();
    res.status(200).send(allRoom);
  } catch (error) {
    res.status(500).send("error get all room controller: " + error);
  }
};

const getAllRoomByRapCodeController = async (req, res) => {
  const { codeRap } = req.params;
  try {
    const allRoom = await getAllRoomByRapCodeService(codeRap);
    res.status(200).send(allRoom);
  } catch (error) {
    res.status(500).send("error get all room by code rap: " + error);
  }
};
const getRoomByCodeController = async (req, res) => {
  const { code } = req.params;
  try {
    const room = await getRoomByCodeService(code);
    res.status(200).send(room);
  } catch (error) {
    res.status(500).send("error get room by code: " + error);
  }
};

const createRoomController = async (req, res) => {
  const { code, name, codeRap, status } = req.body;
  try {
    const newRoom = await createRoomService({ code, name, codeRap, status });
    res.status(201).send(newRoom);
  } catch (error) {
    res.status(500).send("error create a new room: " + error);
  }
};

const updateRoomController = async (req, res) => {
  try {
    const { code } = req.params;
    const { name, codeRap, status } = req.body;

    const checkRoom = await getValueRoomByCodeService(code);
    if (checkRoom != null) {
      const updateRoom = await updateRoomService(code, {
        name,
        codeRap,
        status,
      });
      if (updateRoom != 0) {
        res.status(200).send("update success");
      } else {
        res.status(400).sern("update fail");
      }
    } else {
      res.status(400).send("room not is existed");
    }
  } catch (error) {
    res.status(500).send("error update Room: " + error);
  }
};

module.exports = {
  createRoomController,
  getAllRoomController,
  getRoomByCodeController,
  getAllRoomByRapCodeController,
  updateRoomController,
};
