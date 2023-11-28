
module.exports = (sequelize, DataTypes) => {
    const PromotionDetail = sequelize.define("PromotionDetail", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        promotionLineCode: {
            type: DataTypes.STRING,
            references: {
                model: "PromotionLine",
                key: "code"
            }
        },
        movieCode: {
            type: DataTypes.STRING,
            references: {
                model: "Movie",
                key: "code"
            }
        },
        purchaseValue: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        promotionValue: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        numberTicket: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        typeTicket: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [["VIP", "THUONG", "DOI"]]
            }
        },
        numberGiftTiket: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
        {
            sequelize,
            modelName: "PromotionDetail",
            tableName: "PromotionDetail",
            timestamps: true,
        }
    )
    return PromotionDetail;
}