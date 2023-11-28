module.exports = (sequelize, DataTypes) => {
    const OrderDetail = sequelize.define(
        "OrderDetail",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            code: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                unique: true,
            },
            quality: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            codeProduct: {
                type: DataTypes.STRING,
                allowNull: true,
                references: {
                    model: "OtherProduct",
                    key: "code"
                }
            },
            codeOder: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "Order",
                    key: "code"
                }
            }
        },
        {
            sequelize,
            modelName: "OrderDetail",
            tableName: "OrderDetail",
            timestamps: true,
        }
    );
    return OrderDetail;
};
