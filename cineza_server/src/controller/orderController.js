const {
  createOrderService,
  getOrderServiceByCode,
  getOrderByUserService,
  getTotalPriceByService,
  getAllOrderService,
} = require("../services/orderService");

const createOrderController = async (req, res) => {
  try {
    const { codeTicket, codeUser, description, priceTotal } = req.body;
    const datePay = new Date();
    const newOrder = await createOrderService(
      { datePay, codeUser, description, priceTotal },
      { codeTicket }
    );
    res.status(201).send(newOrder);
  } catch (error) {
    res.status(200).send("save order fail");
    console.log("error save order: " + error);
  }
};

const getOrderByCodeController = async (req, res) => {
  try {
    const { codeOrder } = req.params;
    const dataOrders = await getOrderServiceByCode(codeOrder);
    res.status(200).send(dataOrders);
  } catch (error) {
    res.status(200).send("get data order fail " + error);
  }
};

const getOrderByUserController = async (req, res) => {
  try {
    const { codeUser } = req.params;
    const dataOrder = await getOrderByUserService(codeUser);
    res.status(200).send(dataOrder);
  } catch (error) {
    res.status(200).send("error get data order by user fail: " + error);
  }
};

const getTotalOrderController = async (req, res) => {
  try {
    const { codeOrder } = req.params;
    const totalOrder = await getTotalPriceByService(codeOrder);
    res.status(200).send(totalOrder);
  } catch (error) {
    res.status(200).send("error sum total order: " + error);
  }
};

const getAllOrderController = async (req, res) => {
  const { datePay } = req.query;
  try {
    const Order = await getAllOrderService(datePay);
    res.status(200).send(Order);
  } catch (error) {
    res.status(500).send("Error get all Order: " + error);
  }
};

module.exports = {
  createOrderController,
  getOrderByCodeController,
  getOrderByUserController,
  getTotalOrderController,
  getAllOrderController,
};
