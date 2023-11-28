module.exports = (sequelize, DataTypes) => {
  const Showing = sequelize.define(
    "Showing",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      codeMovie: {
        type: DataTypes.STRING,
        references: {
          model: "Movie",
          key: "code",
        },
      },
      codeRap: {
        type: DataTypes.STRING,
        references: {
          model: "Rap",
          key: "code",
        },
      },
      codeRoom: {
        type: DataTypes.STRING,
        references: {
          model: "Room",
          key: "code",
        },
      },
      showDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      showStart: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      showEnd: {
        type: DataTypes.DATE,
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
      modelName: "Showing",
      tableName: "Showing",
      timestamps: true,
    }
  );
  return Showing;
};
