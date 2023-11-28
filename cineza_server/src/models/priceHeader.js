module.exports = (sequelize, DataTypes) => {
  const PriceHeader = sequelize.define(
    "PriceHeader",
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
        allowNull: true,
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
      modelName: "PriceHeader",
      tableName: "PriceHeader",
      timestamps: true,
    }
  );
  return PriceHeader;
};
