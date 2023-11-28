const { db } = require("../models/index");
const { QueryTypes } = require("sequelize");

const getAddressByLevelService = async (level) => {

    const query = `select ad.id, ad.code, ad.fullName, ad.level, ad.type, ad.parentId, ad.status, pavs.fullName as fullNameParent, hc.value 
        from Address as ad 
        left join Address as pavs on ad.parentId = pavs.code
        join HierachyStructure as hc on hc.code = ad.type
        where ad.level = "${level}";`;
    const dataAddress = await db.sequelize.query(query, { type: QueryTypes.SELECT })
    return dataAddress;
}

const checkIsExistService = async (code) => {
    const data = await db.Address.findOne({
        where: {
            "code": code
        }
    })
    return data;
}

const getAddressByCode = async (code) => {
    const query = `select ad.id, ad.code, ad.fullName, ad.level, ad.type, ad.parentId, ad.status, pavs.fullName as fullNameParent, hc.value 
        from Address as ad 
        left join Address as pavs on ad.parentId = pavs.code
        join HierachyStructure as hc on hc.code = ad.type
        where ad.code = "${code}";`;
    const [dataAddress, metadata] = await db.sequelize.query(query, { type: QueryTypes.SELECT });

    return dataAddress;

}

const getAddressAllService = async () => {
    const query = `select ad.id, ad.code, ad.fullName, ad.level, ad.type, ad.parentId, ad.status, pavs.fullName as fullNameParent, hc.value 
        from Address as ad 
        left join Address as pavs on ad.parentId = pavs.code
        join HierachyStructure as hc on hc.code = ad.type;`
    const dataAddress = await db.sequelize.query(query, { type: QueryTypes.SELECT });

    return dataAddress;
}

const createAddressService = async (address) => {
    const newAddres = await db.Address.create(address);
    return newAddres;
}

const updateAddressByCodeService = async (code, address) => {
    const updateAddress = await db.Address.update(address, {
        where: {
            code: code,
        },
    });
    return updateAddress;
}

const getAddressByParentService = async (codeParent) => {
    const query = `select ad.code, ad.type, ad.parentId, ad.level, ad.fullName, ad.status
    from address as ad
    where ad.parentId = "${codeParent}";`
    const dataAddress = await db.sequelize.query(query, { type: QueryTypes.SELECT });
    return dataAddress;
}

module.exports = {
    getAddressByLevelService,
    getAddressByCode,
    createAddressService,
    checkIsExistService,
    getAddressAllService,
    updateAddressByCodeService,
    getAddressByParentService
}