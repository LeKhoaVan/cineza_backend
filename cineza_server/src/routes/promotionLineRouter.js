const express = require("express");

const {
    getAllPromotionLineByHeaderController,
    getPromotionLineByCodeController,
    createPromotionLineController,
} = require("../controller/promotionLineController");


const promotionLineRouter = express.Router();

promotionLineRouter.get("/get-all-by-header/:codeHeader", getAllPromotionLineByHeaderController);
promotionLineRouter.get("/get-by-code/:code", getPromotionLineByCodeController);
promotionLineRouter.post("/create", createPromotionLineController);
module.exports = promotionLineRouter