module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
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
                defaultValue: DataTypes.UUIDV4
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isIn: [["USER", "ADMIN"]]
                }
            },
            fullName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            numberPhone: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true,
            },
            dateOfBirth: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            countryAddress: {
                type: DataTypes.STRING,
                allowNull: true,
                references: {
                    model: "Address",
                    key: "code",
                },
            },
            cityAddress: {
                type: DataTypes.STRING,
                allowNull: true,
                references: {
                    model: "Address",
                    key: "code",
                },
            },
            districtAddress: {
                type: DataTypes.STRING,
                allowNull: true,
                references: {
                    model: "Address",
                    key: "code",
                },
            },
            wardAddress: {
                type: DataTypes.STRING,
                allowNull: true,
                references: {
                    model: "Address",
                    key: "code",
                },
            },
            numberHome: {
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
            modelName: "User",
            tableName: "User",
            timestamps: true,
        }
    );
    return User;
};
