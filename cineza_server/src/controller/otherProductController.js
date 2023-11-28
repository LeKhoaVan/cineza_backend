const {
  otherProductCreateService,
  getAllOtherProductService,
  getByCodeService,
} = require("../services/otherProductService");

const getAllOtherProduct = async (req, res) => {
  try {
    const otherProducts = await getAllOtherProductService();
    res.status(200).send(otherProducts);
  } catch (error) {
    res.status(500).send("error controller get all: ", error);
  }
};

const getByCodeOtherProduct = async (req, res) => {
  const { code } = req.params;
  try {
    const otherProduct = await getByCodeService(code);
    if (otherProduct) {
      res.status(200).send(otherProduct);
    } else {
      res.status(401).send("not found!");
    }
  } catch (error) {
    res.status(500).send("error cotroller get by code: " + error);
  }
};

const createOtherProduct = async (req, res) => {
  try {
    const { file } = req;
    const filePath = `http://localhost:9000/${file.path}`;
    const image = filePath;
    const { code, title, description, price, status } = req.body;

    const newOtherProduct = await otherProductCreateService({
      code,
      title,
      image,
      description,
      price,
      status,
    });
    res.status(201).send(newOtherProduct);
  } catch (error) {
    res
      .status(500)
      .send("error controller create a new other product: " + error);
  }
};

module.exports = {
  createOtherProduct,
  getAllOtherProduct,
  getByCodeOtherProduct,
};
