const {
    getAllTypeSeatService,
    getTypeSeatByCodeService,
    createTypeSeatService,
} = require("../services/typeSeatService");

const getAllTypeSeatController = async (req, res) => {
    try {
        const allTypeSeat = await getAllTypeSeatService();
        res.status(200).send(allTypeSeat);
    } catch (error) {
        res.status(500).send("error get price by code header: " + error);
    }
};

const getTypeSeatByCodeController = async (req, res) => {
    const { code } = req.params;
    try {
        const typeSeat = await getTypeSeatByCodeService(code);
        res.status(200).send(typeSeat);
    } catch (error) {
        res.status(500).send("error get price by code: " + error);
    }
};

const createTypeSeatController = async (req, res) => {
    const { code, type, } = req.body;
    try {
        const checkCode = await getTypeSeatByCodeService(code);
        if (checkCode == null) {
            const newTypeSeat = await createTypeSeatService({
                code,
                type
            });
            res.status(201).send(newTypeSeat);
        } else {
            res.status(400).send("code is existed");
        }
    } catch (error) {
        res.status(500).send("error create price: " + error);
    }
};

module.exports = {
    getAllTypeSeatController,
    getTypeSeatByCodeController,
    createTypeSeatController,
};
