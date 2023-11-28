const { db } = require("../models/index");

const getAllTypeSeatService = async () => {
    const allTypeSeat = await db.TypeSeat.findAll();
    return allTypeSeat;
};

const getTypeSeatByCodeService = async (code) => {
    const price = await db.TypeSeat.findOne({
        where: {
            code: code,
        },
    });
    return price;
};

const createTypeSeatService = async (TypeSeat) => {
    const priceNew = await db.TypeSeat.create(TypeSeat);
    return priceNew;
};

module.exports = {
    getAllTypeSeatService,
    getTypeSeatByCodeService,
    createTypeSeatService,
};
