
module.exports = (sequelize, DataTypes) => {
    const PromotionLine = sequelize.define("PromotionLine", {
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
        }, promotionLineStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [["ACTIVE", "TEMPORARY_LOCKED", "DESTROY"]]
            }
        },
        typePromotion: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [["DISCOUNT", "PROMOTION", "FREEBIES"]]
            }
        },
        maxMoney: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        maxTurn: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        promotionHeaderCode: {
            type: DataTypes.STRING,
            references: {
                model: "PromotionHeader",
                key: "code"
            }
        }
    },
        {
            sequelize,
            modelName: "PromotionLine",
            tableName: "PromotionLine",
            timestamps: true,
        }
    )
    return PromotionLine;
}