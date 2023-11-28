const { getPromotionDetailByLineCode, createPromotionDetail } = require("../services/promotionDetailService");

const getPromotionDetailByLineCodeController = async (req, res) => {
    const { codeLine } = req.params;
    try {
        const getPromotionAll = await getPromotionDetailByLineCode(codeLine);
        res.status(200).send(getPromotionAll);
    } catch (error) {
        res.status(500).send("error get promotion detail: " + error);
    }
}

const createPromotionDetailController = async (req, res) => {
    const { promotionLineCode, movieCode, purchaseValue, promotionValue, numberTicket, typeTicket, numberGiftTiket } = req.body;
    try {
        const newPromotionDetail = await createPromotionDetail({ promotionLineCode, movieCode, purchaseValue, promotionValue, numberTicket, typeTicket, numberGiftTiket });
        res.status(201).send(newPromotionDetail);
    } catch (error) {
        res.status(500).send("error create promotion detail: " + error);
    }
}

module.exports = {
    getPromotionDetailByLineCodeController,
    createPromotionDetailController
}