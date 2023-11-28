const {
  getAllSeatController,
  getAllSeatByRoomController,
  getAllSeatByRoomAndTypeController,
  createSeatController,
  getSeatByCodeController,
  updateSeatController,
  getPriceSeatController,
} = require("../controller/seatController");

const express = require("express");

const seatRouter = express.Router();

seatRouter.get("/get-all", getAllSeatController);
seatRouter.get("/get-all-by-room/:codeRoom", getAllSeatByRoomController);
seatRouter.get(
  "/get-all-by-room-type/:codeTypeSeat/:codeRoom",
  getAllSeatByRoomAndTypeController
);
seatRouter.post("/create", createSeatController);
seatRouter.get("/get-by-code/:code", getSeatByCodeController);
seatRouter.get("/get-price/:codeTypeSeat", getPriceSeatController);
seatRouter.put("/put/:code", updateSeatController);

module.exports = seatRouter;
