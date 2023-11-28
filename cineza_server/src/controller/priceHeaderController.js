const { default: axios } = require("axios");
const {
  getAllPriceHeaderService,
  getPriceHeaderByCodeService,
  createPriceHeaderService,
  getValuePriceHeaderByCodeService,
  updatePriceHeaderService,
  checkTimePriceHeader,
  updateStatusAllService,
} = require("../services/priceHeaderService");

const getAllPriceHeaderController = async (req, res) => {
  try {
    const Price = await getAllPriceHeaderService();
    res.status(200).send(Price);
  } catch (error) {
    res.status(500).send("Error get all Price: " + error);
  }
};

const createPriceHeaderController = async (req, res) => {
  const { code, startDay, endDay, description, type, status } = req.body;
  try {
    const checkCode = await getPriceHeaderByCodeService(code);
    if (checkCode == null) {
      const newPrice = await createPriceHeaderService({
        code,
        startDay,
        endDay,
        description,
        status,
      });
      res.status(201).send(newPrice);
    } else {
      res.status(400).send("code is existed");
    }
  } catch (error) {
    res.status(500).send("error create Price: " + error);
  }
};

const getPriceHeaderByCodeController = async (req, res) => {
  const { code } = req.params;
  try {
    const priceHeader = await getPriceHeaderByCodeService(code);
    res.status(200).send(priceHeader);
  } catch (error) {
    res.status(500).send("error get Price header: " + error);
  }
};

const updatePriceHeaderController = async (req, res) => {
  try {
    const { code } = req.params;
    const { startDay, endDay, description, status } = req.body;

    const checkPriceHeader = await getValuePriceHeaderByCodeService(code);
    if (checkPriceHeader != null) {
      const updatePriceHeader = await updatePriceHeaderService(code, {
        startDay,
        endDay,
        description,
        status,
      });
      if (updatePriceHeader != 0) {
        res.status(200).send("update success");
      } else {
        res.status(400).sern("update fail");
      }
    } else {
      res.status(400).send("price header not is existed");
    }
  } catch (error) {
    res.status(500).send("error update Price Header: " + error);
  }
};

const checkTimePriceHeaderController = async (req, res) => {
  const { startDay, endDay } = req.params;
  try {
    const dataCheck = await checkTimePriceHeader(startDay, endDay);
    res.status(200).send(dataCheck);
  } catch (error) {
    res.status(200).send("error check time price header: " + error);
  }
};

const updateStatusAllController = async (req, res) => {
  const { startDay, endDay } = req.params;
  try {
    const dataCheck = await updateStatusAllService(startDay, endDay);
    res.status(200).send(dataCheck);
  } catch (error) {
    res.status(200).send("error update all time price header: " + error);
  }
};

module.exports = {
  getAllPriceHeaderController,
  createPriceHeaderController,
  getPriceHeaderByCodeController,
  updatePriceHeaderController,
  checkTimePriceHeaderController,
  updateStatusAllController,
};
