const { getValueStructureByCodeService,
    getValueStructureByTypeService,
    getValueStructureByLevelService,
    getAddressByCodeService,
    getValueAddressByLevelQuocGiaService,
    getValueAddressByLevelService,
    createAddressStructerService,
    updateAddressService,
    getAllAddressService,
    getValueUserByCodeService,
    getAllUserService,
    createUserStructureService,
    updateUserStructuerService,
    createTicketStructService,
    updateTicketStructerService,
    getUserByLevelService } = require("../services/valueStructerService.js");


// dung chung
const getValueStructureByCodeController = async (req, res) => {
    const { code } = req.params;
    try {
        const valueStructure = await getValueStructureByCodeService(code);
        if (valueStructure != null) {
            res.status(200).send(valueStructure);
        } else {
            res.status(400).send("not found");
        }
    } catch (error) {
        res.status(500).send("error get value structer by code: " + error);
    }
}

const getValueStructureByType = async (req, res) => {
    const { type } = req.params;
    try {
        const valueStructure = await getValueStructureByTypeService(type);
        if (valueStructure != null) {
            res.status(200).send(valueStructure);
        } else {
            res.status(400).send("get not found");
        }
    } catch (error) {
        res.status(500).send("error get value structure by type: " + error);
    }
}

const getValueStructureByLevel = async (req, res) => {
    const { level } = req.query;
    try {
        if (level == "QUOCGIA") {
            const valueStructure = await getValueAddressByLevelQuocGiaService(level);
            if (valueStructure != null) {
                res.status(200).send(valueStructure);
            } else {
                res.status(400).send("get not found");
            }
        } else {
            const valueStructure = await getValueAddressByLevelService(level);
            if (valueStructure != null) {
                res.status(200).send(valueStructure);
            } else {
                res.status(400).send("get not found");
            }
        }
    } catch (error) {
        res.status(500).send("error get value structure: " + error);
    }
}


// controller address
const createAddressStructerController = async (req, res) => {
    const { code, type, parentId, level, fullName, status } = req.body;
    try {
        const chekCode = await getValueStructureByCodeService(code);
        if (chekCode == null) {
            const newAddress = await createAddressStructerService({ code, type, parentId, level, fullName, status });
            res.status(201).send(newAddress);
        } else {
            res.status(400).send("code is existed");
        }

    } catch (error) {
        res.status(500).send("error create address: " + error);
    }
}

const getValueAddressByCodeController = async (req, res) => {
    const { code } = req.params;
    try {
        const checkQuocGia = await getValueStructureByCodeService(code);
        if (checkQuocGia.level == "QUOCGIA") {
            res.status(200).send(checkQuocGia);
        } else {
            const address = await getAddressByCodeService(code);
            if (address != null) {
                res.status(200).send(address);
            } else {
                res.status(400).send("get not found");
            }
        }
    } catch (error) {
        res.status(500).send("error get address by code: " + error);
    }
}

const updateAddressController = async (req, res) => {
    try {
        const { code } = req.params;
        const { type, parentId, level, fullName, status } = req.body;
        const checkAddress = await getValueStructureByCodeService(code);
        if (checkAddress != null) {
            const checkUpdate = await updateAddressService(code, { type, parentId, level, fullName, status });
            if (checkUpdate != 0) {
                res.status(200).send("update success");
            } else {
                res.status(400).send("update fail");
            }
        } else {
            res.status(400).send("get not found");
        }
    } catch (error) {
        res.status(500).send("error update address: " + error);
    }
}
const getAllAddressController = async (req, res) => {
    try {
        const addressList = await getAllAddressService();
        res.status(200).send(addressList);
    } catch (error) {
        res.status(500).send("error get all address");
    }
}

//controller user

const getUserControllerByCode = async (req, res) => {
    const { code } = req.params;
    try {
        const user = await getValueUserByCodeService(code);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send("Error get all user: " + error);
    }
}

const getAllUserController = async (req, res) => {
    try {
        const allUser = await getAllUserService();
        res.status(200).send(allUser);
    } catch (error) {
        res.status(500).send("Error get all user: " + error);
    }
}

const createUserStructController = async (req, res) => {
    const { code, type, level, fullName, numberPhone, password, dateOfBirth, countryAddress, cityAddress, districtAddress, wardAddress, numberHome, status } = req.body;
    try {
        const checkCode = await getValueStructureByCodeService(code);
        if (checkCode == null) {
            const newUser = await createUserStructureService({ code, type, level, fullName, numberPhone, password, dateOfBirth, countryAddress, cityAddress, districtAddress, wardAddress, numberHome, status });
            res.status(201).send(newUser);
        } else {
            res.status(400).send("code is existed");
        }
    } catch (error) {
        res.status(500).send("error create user: " + error);
    }
}

const updateUserStructerController = async (req, res) => {
    const { code } = req.params;
    const { type, parentId, level, fullName, numberPhone, passsword, dateOfBirth, addressId, status } = req.body;
    try {
        const checkUser = await getValueStructureByCodeService(code);
        if (checkUser != null) {
            const updateUser = await updateUserStructuerService(code, { type, parentId, level, fullName, numberPhone, passsword, dateOfBirth, addressId, status });
            if (updateUser != 0) {
                res.status(200).send("update success");
            } else {
                res.status(400).sern("update fail");
            }
        } else {
            res.status(400).send("user not is existed");
        }
    } catch (error) {
        res.status(500).send("error update User: " + error);
    }
}

const getUserByLevelController = async (req, res) => {
    const { level } = req.query;
    try {
        const user = await getUserByLevelService(level);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send("error get user by level: " + error);
    }
}

//controller ticket
const createTicketStructController = async (req, res) => {
    const { code, type, level, buyAt, ticketEffecticeAt, ticketExpiryAt, status } = req.body
    try {
        const checkTicket = await getValueStructureByCodeService(code);
        if (checkTicket == null) {
            const newTicket = await createTicketStructService({ code, type, level, buyAt, ticketEffecticeAt, ticketExpiryAt, status });
            res.status(201).send(newTicket);
        } else {
            res.status(400).send("ticket is existed");
        }
    } catch (error) {
        res.status(500).send("error create ticket: " + error);
    }
}

const updateTicketStructerController = async (req, res) => {
    const { code } = req.params;
    const { type, level, buyAt, ticketEffecticeAt, ticketExpiryAt, status } = req.body;
    try {
        const checkTicket = await getValueStructureByCodeService(code);
        if (checkTicket != null) {
            const checkUpdate = await updateTicketStructerService(code, { type, level, buyAt, ticketEffecticeAt, ticketExpiryAt, status });
            if (checkUpdate != 0) {
                res.status(200).send("update ticket success");
            } else {
                res.status(500).send("update ticket fail");
            }
        } else {
            res.status(500).send("ticket is not existed");
        }
    } catch (error) {
        res.status(500).send("error update ticket: " + error);
    }
}

module.exports = {
    getValueStructureByCodeController,
    getValueStructureByType,
    getValueStructureByLevel,
    getValueAddressByCodeController,
    createAddressStructerController,
    updateAddressController,
    getAllAddressController,
    getUserControllerByCode,
    getAllUserController,
    createUserStructController,
    updateUserStructerController,
    createTicketStructController,
    updateTicketStructerController,
    getUserByLevelController
}