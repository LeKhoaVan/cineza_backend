const express = require("express");

const {
  createOtherProduct,
  getAllOtherProduct,
  getByCodeOtherProduct,
} = require("../controller/otherProductController");
const {
  handUploadFile,
} = require("../middlewares/upload/uploadImageOtherProduct/index");

const otherProductRouter = express.Router();

otherProductRouter.get("/get-all", getAllOtherProduct);
otherProductRouter.get("/get-by-code/:code", getByCodeOtherProduct);
otherProductRouter.post("/create", handUploadFile, createOtherProduct);

module.exports = otherProductRouter;
