
const {
    getAllPromotionLineByHeaderService,
    getPromotionLineByCodeService,
    createPromotionLineService } = require("../services/promotionLineService");

const getAllPromotionLineByHeaderController = async (req, res) => {
    const { codeHeader } = req.params
    try {
        const allPromotionLine = await getAllPromotionLineByHeaderService(codeHeader);
        res.status(200).send(allPromotionLine);
    } catch (error) {
        res.status(500).send("error get promotion line by code header: " + error);
    }
}

const getPromotionLineByCodeController = async (req, res) => {
    const { code } = req.params;
    try {
        const promotionLine = await getPromotionLineByCodeService(code);
        res.status(200).send(promotionLine);
    } catch (error) {
        res.status(500).send("error get promotion line by code: " + error);
    }
}

const createPromotionLineController = async (req, res) => {
    const { code, startDay, endDay, promotionLineStatus, typePromotion, promotionHeaderCode, maxMoney, maxTurn } = req.body;
    try {
        const checkCode = await getPromotionLineByCodeService(code);
        if (checkCode == null) {
            const newPromotion = await createPromotionLineService({ code, startDay, endDay, promotionLineStatus, typePromotion, promotionHeaderCode, maxMoney, maxTurn });
            res.status(201).send(newPromotion);
        } else {
            res.status(400).send("code is existed");
        }
    } catch (error) {
        res.status(500).send("error create promotion line: " + error);
    }
}

module.exports = {
    getAllPromotionLineByHeaderController,
    getPromotionLineByCodeController,
    createPromotionLineController
}