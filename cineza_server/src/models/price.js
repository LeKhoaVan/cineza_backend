module.exports = (sequelize, DataTypes) => {
  const Price = sequelize.define(
    "Price",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      codeHeader: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "PriceHeader",
          key: "code",
        },
      },
      codeTypeSeat: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "TypeSeat",
          key: "code"
        }
      },

      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["Hoạt động", "Khóa tạm thời", "Hủy"]],
        },
      },
    },
    {
      sequelize,
      modelName: "Price",
      tableName: "Price",
      timestamps: true,
    }
  );
  return Price;
};
