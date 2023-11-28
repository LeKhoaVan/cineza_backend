const {
  getAllPriceByHeaderService,
  getPriceByCodeService,
  createPriceService,
  getValuePriceByCodeService,
  updatePriceService,
  checkTimePriceService,
  updateStatusAllByHeaderAndTypeService,
} = require("../services/priceService");

const getAllPriceByHeaderController = async (req, res) => {
  const { codeHeader } = req.params;
  try {
    const allPrice = await getAllPriceByHeaderService(codeHeader);
    res.status(200).send(allPrice);
  } catch (error) {
    res.status(500).send("error get price by code header: " + error);
  }
};

const getPriceByCodeController = async (req, res) => {
  const { code } = req.params;
  try {
    const Price = await getPriceByCodeService(code);
    res.status(200).send(Price);
  } catch (error) {
    res.status(500).send("error get price by code: " + error);
  }
};

const createPriceController = async (req, res) => {
  const { code, value, codeHeader, codeTypeSeat, status } = req.body;
  try {
    const checkCode = await getPriceByCodeService(code);
    if (checkCode == null) {
      const newPrice = await createPriceService({
        code,
        value,
        codeHeader,
        codeTypeSeat,
        status,
      });
      res.status(201).send(newPrice);
    } else {
      res.status(400).send("code is existed");
    }
  } catch (error) {
    res.status(500).send("error create price: " + error);
  }
};

const updatePriceController = async (req, res) => {
  try {
    const { code } = req.params;
    const { value, codeHeader, codeTypeSeat, status } = req.body;

    const checkPrice = await getValuePriceByCodeService(code);
    if (checkPrice != null) {
      const updatePrice = await updatePriceService(code, {
        value, codeHeader, codeTypeSeat, status
      });
      if (updatePrice != 0) {
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

const checkTimePriceController = async (req, res) => {
  const { codeHeader, codeTypeSeat } = req.params;
  try {
    const dataCheck = await checkTimePriceService(codeHeader, codeTypeSeat);
    res.status(200).send(dataCheck);
  } catch (error) {
    res.status(200).send("error check time price: " + error);
  }
}

const updateStatusAllByHeaderAndTypeController = async (req, res) => {
  const { codeHeader, codeTypeSeat } = req.params;
  try {
    const dataUpdate = await updateStatusAllByHeaderAndTypeService(codeHeader, codeTypeSeat);
    res.status(200).send(dataUpdate);
  } catch (error) {
    res.status(200).send("error update all status price: " + error);
  }
}

module.exports = {
  getAllPriceByHeaderController,
  getPriceByCodeController,
  createPriceController,
  updatePriceController,
  checkTimePriceController,
  updateStatusAllByHeaderAndTypeController,

};
