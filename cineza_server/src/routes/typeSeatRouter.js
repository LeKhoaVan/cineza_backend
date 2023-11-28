const express = require("express");

const {
    getAllTypeSeatController,
    getTypeSeatByCodeController,
    createTypeSeatController,
} = require("../controller/typeSeatController");

const typeSeatRouter = express.Router();

typeSeatRouter.get(
    "/get-all",
    getAllTypeSeatController
);
typeSeatRouter.get("/get-by-code/:code", getTypeSeatByCodeController);
typeSeatRouter.post("/create", createTypeSeatController);
module.exports = typeSeatRouter;
