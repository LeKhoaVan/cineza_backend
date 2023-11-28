const { db } = require("../models/index.js");

const getAllPromtionHeaderService = async () => {
    const allPromtion = await db.PromotionHeader.findAll();
    return allPromtion;
}

const getPromotionHeaderByCodeService = async (code) => {
    const promotionHeader = await db.PromotionHeader.findOne({
        where: {
            code: code
        }
    })
    return promotionHeader;
}

const createPromotionHeaderService = async (promotion) => {
    const newPromotion = await db.PromotionHeader.create(promotion);
    return newPromotion;
}

module.exports = {
    getAllPromtionHeaderService,
    getPromotionHeaderByCodeService,
    createPromotionHeaderService,

}