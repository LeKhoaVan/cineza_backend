
module.exports = (sequelize, DataTypes) => {
    const Rap = sequelize.define("Rap", {
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
        openTime: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        closeTime: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        numberRap: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        countryAddress: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: "Address",
                key: "code"
            }
        },
        cityAddress: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: "Address",
                key: "code"
            }
        },
        districtAddress: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: "Address",
                key: "code"
            }
        },
        wardAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "Address",
                key: "code"
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
            modelName: "Rap",
            tableName: "Rap",
            timestamps: true,
        })
    return Rap;
}