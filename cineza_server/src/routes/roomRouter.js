const express = require("express");

const {
  createRoomController,
  getAllRoomController,
  getRoomByCodeController,
  getAllRoomByRapCodeController,
  updateRoomController,
} = require("../controller/roomController");
const roomRouter = express.Router();

roomRouter.get("/get-all", getAllRoomController);
roomRouter.get("/get-all-by-code/:codeRap", getAllRoomByRapCodeController);
roomRouter.get("/get-by-code/:code", getRoomByCodeController);
roomRouter.post("/create", createRoomController);
roomRouter.put("/put/:code", updateRoomController);

module.exports = roomRouter;
