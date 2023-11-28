const {
  getAllSeatService,
  getAllSeatByCodeRoomService,
  getAllSeatByCodeRoomAndCodeTypeService,
  createSeatService,
  getAllSeatByCodeService,
  getValueSeatByCodeService,
  updateSeatService,
  getPriceSeatService,
} = require("../services/seatService");

const getAllSeatController = async (req, res) => {
  try {
    const allSeat = await getAllSeatService();
    res.status(200).send(allSeat);
  } catch (error) {
    res.status(500).send("error get all seat: " + error);
  }
};

const getAllSeatByRoomController = async (req, res) => {
  const { codeRoom } = req.params;
  try {
    const allSeat = await getAllSeatByCodeRoomService(codeRoom);
    res.status(200).send(allSeat);
  } catch (error) {
    res.status(500).send("error get all seat by room: " + error);
  }
};

const getAllSeatByRoomAndTypeController = async (req, res) => {
  const { codeRoom } = req.params;
  const { codeTypeSeat } = req.params;
  try {
    const allSeat = await getAllSeatByCodeRoomAndCodeTypeService(
      codeRoom,
      codeTypeSeat
    );
    res.status(200).send(allSeat);
  } catch (error) {
    res.status(500).send("error get all seat by room and type: " + error);
  }
};

const getSeatByCodeController = async (req, res) => {
  const { code } = req.params;
  try {
    const seat = await getAllSeatByCodeService(code);
    res.status(200).send(seat);
  } catch (error) {
    res.status(500).send("error get seat by code: " + error);
  }
};

const getPriceSeatController = async (req, res) => {
  const { codeTypeSeat } = req.params;
  try {
    const price = await getPriceSeatService(codeTypeSeat);
    res.status(200).send(price);
  } catch (error) {
    res.status(400).send("error price seat: " + error);
  }
};

const createSeatController = async (req, res) => {
  const { code, codeTypeSeat, position, codeRoom, status, isBook } = req.body;
  try {
    const newSeat = await createSeatService({
      code,
      codeTypeSeat,
      position,
      codeRoom,
      status,
      isBook,
    });
    res.status(201).send(newSeat);
  } catch (error) {
    res.status(500).send("error save seat: " + error);
  }
};

const updateSeatController = async (req, res) => {
  try {
    const { code } = req.params;
    const { codeTypeSeat, position, codeRoom, status, isBook } = req.body;

    const checkSeat = await getValueSeatByCodeService(code);
    if (checkSeat != null) {
      const updateSeat = await updateSeatService(code, {
        codeTypeSeat,
        position,
        codeRoom,
        status,
        isBook,
      });
      if (updateSeat != 0) {
        res.status(200).send("update success");
      } else {
        res.status(400).sern("update fail");
      }
    } else {
      res.status(400).send("seat not is existed");
    }
  } catch (error) {
    res.status(500).send("error update Seat: " + error);
  }
};

module.exports = {
  getAllSeatController,
  getAllSeatByRoomController,
  getAllSeatByRoomAndTypeController,
  getSeatByCodeController,
  createSeatController,
  updateSeatController,
  getPriceSeatController,
};
