module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "Address",
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
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "HierachyStructure",
          key: "code",
        },
      },
      parentId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "Address",
          key: "code",
        },
      },
      level: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [
            [
              "QUOCGIA",
              "TINH/TP",
              "HUYEN/QUAN",
              "XA/PHUONG",
            ],
          ],
        },
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: true,
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
      modelName: "Address",
      tableName: "Address",
      timestamps: true,
    }
  );
  return Address;
};
