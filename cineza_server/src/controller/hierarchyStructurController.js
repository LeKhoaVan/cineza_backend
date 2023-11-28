const { getHierarchyStructureByValue,
    getHierarchyStructureByCode,
    createHieraryStructureService,
    updateHierarchyStructureService } = require("../services/hierarchyStructerService");

const getHierarchyStructureController = async (req, res) => {
    const { value } = req.params;
    try {
        const hierachyStructure = await getHierarchyStructureByValue(value);
        if (hierachyStructure != null) {
            res.status(200).send(hierachyStructure);
        } else {
            res.status(400).send("get not found");
        }

    } catch (error) {
        res.status(500).send("error get hierarchy structure" + error);
    }
}

const getHierarchyStructureByCodeController = async (req, res) => {
    const { code } = req.params;
    try {
        const hierachyStructure = await getHierarchyStructureByCode(code);
        if (hierachyStructure != null) {
            res.status(200).send(hierachyStructure);
        } else {
            res.status(400).send("not found");
        }
    } catch (error) {
        res.status.send("error is get hierarchy structer by code: " + error);
    }
}

const createHierarchyStructerController = async (req, res) => {
    const { code, value } = req.body;
    try {
        const newHierarchyStructure = await createHieraryStructureService({ code, value });
        res.status(201).send(newHierarchyStructure);
    } catch (error) {
        res.status(500).send("error create hierarchy structure");
    }
}

const updateHierarchyStructureController = async (req, res) => {
    const { code } = req.params;
    const { value } = req.body;
    try {
        const checkHierarchyStructer = await getHierarchyStructureByCode(code);
        const newHierarchyStructure = { ...checkHierarchyStructer, value: value };
        if (checkHierarchyStructer != null) {
            const checkUpdate = await updateHierarchyStructureService(code, newHierarchyStructure);
            if (checkUpdate != 0) {
                res.status(200).send("update success");
            } else {
                res.status(400).send("update fail");
            }
        } else {
            res.status(400).send("not found")
        }

    } catch (error) {
        res.status(500).send("error update hierarchy stucture: " + error);
    }
}

module.exports = {
    getHierarchyStructureController,
    getHierarchyStructureByCodeController,
    createHierarchyStructerController,
    updateHierarchyStructureController,

}