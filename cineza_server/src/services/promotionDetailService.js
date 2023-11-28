const { db } = require("../models/index");
const promotionDetail = require("../models/promotionDetail");

const getPromotionDetailByLineCode = async (codeLine) => {
    const query = `select id, promotionLineCode, movieCode, purchaseValue, promotionValue, numberTicket, typeTicket, numberGiftTiket
    from promotiondetail
    where promotionLineCode = '${codeLine}';`
    const [allPromotionDetail, metadata] = await db.sequelize.query(query);
    return allPromotionDetail;
}

const createPromotionDetail = async (promotionDetail) => {
    const newPromotionDetail = await db.PromotionDetail.create(promotionDetail);
    return newPromotionDetail;
}

module.exports = {
    getPromotionDetailByLineCode,
    createPromotionDetail
}