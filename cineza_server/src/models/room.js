
module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define("Room", {
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
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        codeRap: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "Rap",
                key: "code",
            }
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
            modelName: "Room",
            tableName: "Room",
            timestamps: true,
        })
    return Room;
}