const express = require("express");

const {
  getAllPriceHeaderController,
  createPriceHeaderController,
  getPriceHeaderByCodeController,
  updatePriceHeaderController,
  checkTimePriceHeaderController,
  updateStatusAllController,
} = require("../controller/priceHeaderController");
const priceHeaderRouter = express.Router();

priceHeaderRouter.get("/get-all", getAllPriceHeaderController);
priceHeaderRouter.post("/create", createPriceHeaderController);
priceHeaderRouter.get("/get-code/:code", getPriceHeaderByCodeController);
priceHeaderRouter.put("/put/:code", updatePriceHeaderController);
priceHeaderRouter.get(
  "/check-time/:startDay/:endDay",
  checkTimePriceHeaderController
);
priceHeaderRouter.put(
  "/update-all/:startDay/:endDay",
  updateStatusAllController
);

module.exports = priceHeaderRouter;
