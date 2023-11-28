
module.exports = (sequelize, DataTypes) => {
    const PromotionHeader = sequelize.define("PromotionHeader", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        startDay: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDay: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        promotionStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [["ACTIVE", "TEMPORARY_LOCKED", "DESTROY"]]
            }
        },
    },
        {
            sequelize,
            modelName: "PromotionHeader",
            tableName: "PromotionHeader",
            timestamps: true,
        }
    )
    return PromotionHeader;
}