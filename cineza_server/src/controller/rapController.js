const {
  createRapService,
  getAllRapService,
  getRapByCodeService,
  updateRapService,
  getValueRapByCodeService,
} = require("../services/rapService");

const getAllRapController = async (req, res) => {
  try {
    const allRap = await getAllRapService();
    res.status(200).send(allRap);
  } catch (error) {
    res.status(500).send("error get all rap: " + error);
  }
};
const getRapByCodeController = async (req, res) => {
  const { code } = req.params;
  try {
    const rap = await getRapByCodeService(code);
    res.status(200).send(rap);
  } catch (error) {
    res.status(500).send("error get rap by code: " + error);
  }
};

const createRapController = async (req, res) => {
  const {
    code,
    name,
    openTime,
    closeTime,
    numberRap,
    countryAddress,
    cityAddress,
    districtAddress,
    wardAddress,
    status,
  } = req.body;
  try {
    const checkCode = await getRapByCodeService(code);
    if (checkCode) {
      res.status(400).send("code is exist");
    } else {
      const newRap = await createRapService({
        code,
        name,
        openTime,
        closeTime,
        numberRap,
        countryAddress,
        cityAddress,
        districtAddress,
        wardAddress,
        status,
      });
      res.status(201).send(newRap);
    }
  } catch (error) {
    res.status(500).send("error create new rap: " + error);
  }
};

const updateRapController = async (req, res) => {
  try {
    const { code } = req.params;
    const {
      name,
      openTime,
      closeTime,
      numberRap,
      countryAddress,
      cityAddress,
      districtAddress,
      wardAddress,
      status,
    } = req.body;

    const checkRap = await getValueRapByCodeService(code);
    if (checkRap != null) {
      const updateRap = await updateRapService(code, {
        name,
        openTime,
        closeTime,
        numberRap,
        countryAddress,
        cityAddress,
        districtAddress,
        wardAddress,
        status,
      });
      if (updateRap != 0) {
        res.status(200).send("update success");
      } else {
        res.status(400).sern("update fail");
      }
    } else {
      res.status(400).send("rap not is existed");
    }
  } catch (error) {
    res.status(500).send("error update Rap: " + error);
  }
};

module.exports = {
  createRapController,
  getAllRapController,
  getRapByCodeController,
  updateRapController,
};
