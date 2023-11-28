const express = require("express");

const {
  createOrderController,
  getOrderByCodeController,
  getOrderByUserController,
  getTotalOrderController,
  getAllOrderController,
} = require("../controller/orderController");

const orderRouter = express.Router();

orderRouter.post("/save", createOrderController);
orderRouter.get("/get-by-code/:codeOrder", getOrderByCodeController);
orderRouter.get("/get-by-user/:codeUser", getOrderByUserController);
orderRouter.get("/total/:codeOrder", getTotalOrderController);
orderRouter.get("/get-all", getAllOrderController);

module.exports = orderRouter;
