const { where } = require("sequelize");
const { db } = require("../models/index.js");

const getHierarchyStructureByValue = async (value) => {
    const hierarchyStructure = await db.HierachyStructure.findOne(
        {
            where: {
                value: value
            }
        }
    )
    return hierarchyStructure;
}

const getHierarchyStructureByCode = async (code) => {
    const hierarchyStructure = await db.HierachyStructure.findOne(
        {
            where: {
                code: code
            }
        }
    )
    return hierarchyStructure;
}
const createHieraryStructureService = (hierarchyStructer) => {
    const newHierarchyStructure = db.HierachyStructure.create(hierarchyStructer);
    return newHierarchyStructure;
}

const updateHierarchyStructureService = async (code, hierachyStructure) => {
    const resultUpdate = await db.HierachyStructure.update(hierachyStructure, {
        where: {
            code: code
        }
    })
    return resultUpdate;
}

module.exports = {
    getHierarchyStructureByValue,
    getHierarchyStructureByCode,
    createHieraryStructureService,
    updateHierarchyStructureService
}