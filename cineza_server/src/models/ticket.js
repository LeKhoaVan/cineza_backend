module.exports = (sequelize, DataTypes) => {
    const Ticket = sequelize.define(
        "Ticket",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: false,
            },
            code: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            bookAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            ticketEffecticeAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            ticketExpiryAt: {
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
            codeShowing: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: "Showing",
                    key: "code"
                }
            },
            codeSeat: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: "Seat",
                    key: "code"
                }
            },
            codeUser: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: "User",
                    key: "code"
                }
            }
        },
        {
            sequelize,
            modelName: "Ticket",
            tableName: "Ticket",
            timestamps: true,
        }
    );
    return Ticket;
};
