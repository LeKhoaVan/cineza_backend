module.exports = (sequelize, DataTypes) => {
  const TypeSeat = sequelize.define(
    "TypeSeat",
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
        validate: {
          isIn: [["SWEET", "Thường", "VIP"]],
        },
      },
    },
    {
      sequelize,
      modelName: "TypeSeat",
      tableName: "TypeSeat",
      timestamps: true,
    }
  );
  return TypeSeat;
};
