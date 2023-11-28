
const { getAddressByLevelService, createAddressService, getAddressByCode, checkIsExistService,
    getAddressAllService, updateAddressByCodeService, getAddressByParentService } = require("../services/addressService");

const getAddressByLevelController = async (req, res) => {
    try {
        const { levelAddress } = req.query
        const addressData = await getAddressByLevelService(levelAddress);
        res.status(200).send(addressData);
    } catch (error) {
        res.status(200).send("error get address by level: " + error);
    }
}

const createAddressController = async (req, res) => {
    const { code, type, parentId, level, fullName, status } = req.body;
    try {
        const chekCode = await checkIsExistService(code);
        if (chekCode == null) {
            const newAddress = await createAddressService({ code, type, parentId, level, fullName, status });
            res.status(201).send(newAddress);
        } else {
            res.status(200).send("code is existed");
        }

    } catch (error) {
        res.status(200).send("error create address: " + error);
    }
}

const getAddressByCodeController = async (req, res) => {
    try {
        const { code } = req.params;
        const dataAddress = await getAddressByCode(code);
        res.status(200).send(dataAddress);
    } catch (error) {
        res.status(200).send("error get address by code: " + error);
    }
}

const getAddressAllController = async (req, res) => {
    try {
        const dataAddress = await getAddressAllService();
        res.status(200).send(dataAddress);
    } catch (error) {
        res.status(200).send("error get all address: " + error);
    }
}

const updateAddressByCodeController = async (req, res) => {
    try {
        const { code } = req.params;
        const { type, parentId, level, fullName, status } = req.body;
        const checkAddress = await checkIsExistService(code);
        if (checkAddress != null) {
            const updateAddress = await updateAddressByCodeService(code, { type, parentId, level, fullName, status });
            if (updateAddress != 0) {
                res.status(200).send({ code, type, parentId, level, fullName, status })
            } else {
                res.status(200).send("update fail")
            }
        } else {
            res.status(200).send("code address not is exist")
        }
    } catch (error) {
        res.status(200).send("error update address: " + error);
    }
}

const getAddressByParentController = async (req, res) => {
    try {
        const { parentCode } = req.params;
        const dataAddress = await getAddressByParentService(parentCode);
        res.status(200).send(dataAddress);
    } catch (error) {
        res.status(200).send("error get address by parent: " + error);
    }
}


module.exports = {
    getAddressByLevelController,
    createAddressController,
    getAddressByCodeController,
    getAddressAllController,
    updateAddressByCodeController,
    getAddressByParentController,
}