const { default: axios } = require("axios");
const { getAllPromtionHeaderService,
    getPromotionHeaderByCodeService,
    createPromotionHeaderService } = require("../services/promotionHeaderService");

const getAllPromotionHeaderController = async (req, res) => {
    try {
        const promotion = await getAllPromtionHeaderService();
        res.status(200).send(promotion);
    } catch (error) {
        res.status(500).send("Error get all promotion: " + error);
    }
}

const createPromotionHeaderController = async (req, res) => {
    const { code, startDay, endDay, description, promotionStatus } = req.body;
    try {
        const checkCode = await getPromotionHeaderByCodeService(code);
        if (checkCode == null) {
            const newPromotion = await createPromotionHeaderService({ code, startDay, endDay, description, promotionStatus });
            res.status(201).send(newPromotion);
        } else {
            res.status(400).send("code is existed");
        }
    } catch (error) {
        res.status(500).send("error create promotion: " + error);
    }
}

const getPromotionHeaderByCodeController = async (req, res) => {
    const { code } = req.params;
    try {
        const promotionHeader = await getPromotionHeaderByCodeService(code);
        res.status(200).send(promotionHeader)
    } catch (error) {
        res.status(500).send("error get promotion header: " + error);
    }
}

module.exports = {
    getAllPromotionHeaderController,
    createPromotionHeaderController,
    getPromotionHeaderByCodeController,
}