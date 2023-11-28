const express = require("express");

const { getPromotionDetailByLineCodeController,
    createPromotionDetailController } = require("../controller/promotionDetailController");

const promotionDetailRouter = express.Router();

promotionDetailRouter.get("/get-all/:codeLine", getPromotionDetailByLineCodeController);
promotionDetailRouter.post("/create", createPromotionDetailController)
module.exports = promotionDetailRouter;