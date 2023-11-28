module.exports = (sequelize, DataTypes) => {
  const Seat = sequelize.define(
    "Seat",
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
      codeTypeSeat: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "TypeSeat",
          key: "code"
        }
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      codeRoom: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Room",
          key: "code",
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Hoạt động",
        validate: {
          isIn: [["Hoạt động", "Khóa tạm thời", "Hủy"]],
        },
      },
      isBook: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "NOTSELECTED",
        validate: {
          isIn: [["SELECTED", "NOTSELECTED"]],
        },
      },
    },
    {
      sequelize,
      modelName: "Seat",
      tableName: "Seat",
      timestamps: true,
    }
  );
  return Seat;
};
