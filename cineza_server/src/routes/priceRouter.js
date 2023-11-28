const express = require("express");

const {
  getAllPriceByHeaderController,
  getPriceByCodeController,
  createPriceController,
  updatePriceController,
  checkTimePriceController,
  updateStatusAllByHeaderAndTypeController
} = require("../controller/priceController");

const priceRouter = express.Router();

priceRouter.get(
  "/get-all-by-header/:codeHeader",
  getAllPriceByHeaderController
);
priceRouter.get("/get-by-code/:code", getPriceByCodeController);
priceRouter.post("/create", createPriceController);
priceRouter.put("/put/:code", updatePriceController);
priceRouter.get("/check-time/:codeHeader/:codeTypeSeat", checkTimePriceController);
priceRouter.put("/update-status-all/:codeHeader/:codeTypeSeat", updateStatusAllByHeaderAndTypeController);

module.exports = priceRouter;
