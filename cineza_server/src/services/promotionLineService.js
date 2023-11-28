const { db } = require("../models/index")

const getAllPromotionLineByHeaderService = async (codeHeader) => {
    const query = `select pl.code, pl.startDay, pl.endDay, pl.promotionLineStatus, pl.typePromotion, pl.promotionHeaderCode, pl.maxMoney, pl.maxTurn, ph.code as codeHeader 
        from PromotionLine as pl join PromotionHeader as ph on pl.promotionHeaderCode = ph.code
        where ph.code = '${codeHeader}'`;
    const [allPromotionLine, metadata] = await db.sequelize.query(query);
    return allPromotionLine;
}

const getPromotionLineByCodeService = async (code) => {
    const promotionLine = await db.PromotionLine.findOne({
        where: {
            code: code
        }
    })
    return promotionLine;
}

const createPromotionLineService = async (promotionLine) => {
    const promotionLineNew = await db.PromotionLine.create(promotionLine);
    return promotionLineNew
}

module.exports = {
    getAllPromotionLineByHeaderService,
    getPromotionLineByCodeService,
    createPromotionLineService
}