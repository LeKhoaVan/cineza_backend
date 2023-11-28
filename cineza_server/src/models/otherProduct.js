module.exports = (sequelize, DataTypes) => {
  const OtherProduct = sequelize.define(
    "OtherProduct",
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
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Hoạt động",
        validate: {
          isIn: [["Hoạt động", "Khóa tạm thời", "Hủy"]],
        },
      },
    },
    {
      sequelize,
      modelName: "OtherProduct",
      tableName: "OtherProduct",
      timestamps: true,
    }
  );
  return OtherProduct;
};
