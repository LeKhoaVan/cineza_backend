const express = require("express");
const { getAddressByLevelController, createAddressController, getAddressByCodeController, getAddressAllController,
    updateAddressByCodeController, getAddressByParentController } = require("../controller/addressController");

const addressRouter = express.Router();

addressRouter.get("/get-by-level", getAddressByLevelController);
addressRouter.post("/create", createAddressController)
addressRouter.get("/get-by-code/:code", getAddressByCodeController);
addressRouter.get("/get-all", getAddressAllController);
addressRouter.put("/update/:code", updateAddressByCodeController)
addressRouter.get("/get-by-parent/:parentCode", getAddressByParentController);

module.exports = addressRouter;