const express = require("express");
const { getHierarchyStructureController,
    createHierarchyStructerController,
    updateHierarchyStructureController,
    getHierarchyStructureByCodeController } = require("../controller/hierarchyStructurController.js");

const hierarchyStructureRouter = express.Router();

// vi tri dia ly
hierarchyStructureRouter.get("/get/:value", getHierarchyStructureController);
hierarchyStructureRouter.get("/get-code/:code", getHierarchyStructureByCodeController)
hierarchyStructureRouter.post("/create", createHierarchyStructerController);
hierarchyStructureRouter.put("/put/:code", updateHierarchyStructureController);

module.exports = hierarchyStructureRouter;