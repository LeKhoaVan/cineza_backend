const express = require("express");
const { getValueStructureByCodeController,
    getValueAddressByCodeController,
    createAddressStructerController,
    updateAddressController,
    getUserControllerByCode,
    getAllUserController,
    createUserStructController,
    updateUserStructerController,
    createTicketStructController,
    updateTicketStructerController,
    getAllAddressController,
    getValueStructureByType,
    getValueStructureByLevel,
    getUserByLevelController } = require("../controller/ValueStructuerController.js");

const valueStructure = express.Router();

// // dung chung
// valueStructure.get("/get/:code", getValueStructureByCodeController);
// valueStructure.get("/get-type/:type", getValueStructureByType);
// valueStructure.get("/get-level", getValueStructureByLevel);

//address
// valueStructure.get("/address/get-all", getAllAddressController);
// valueStructure.get("/address/get-code/:code", getValueAddressByCodeController)
// valueStructure.post("/address/create", createAddressStructerController);
// valueStructure.put("/address/put/:code", updateAddressController);

//user
// valueStructure.get("/user/get-code/:code", getUserControllerByCode)
// valueStructure.get("/user/get-all", getAllUserController)
// valueStructure.post("/user/create", createUserStructController);
// valueStructure.put("/user/put/:code", updateUserStructerController);
// valueStructure.get("/user/get-by-level", getUserByLevelController)

//ticket
// valueStructure.post("/ticket/create", createTicketStructController);
// valueStructure.put("/ticket/put/:code", updateTicketStructerController);

//san pham khac (bap, nuoc)


module.exports = valueStructure;