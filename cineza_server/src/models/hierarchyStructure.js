module.exports = (sequelize, DataTypes) => {
    const HierachyStructure = sequelize.define('HierachyStructure', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        code: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false
        },

    },
        {
            timestamps: true,
            tableName: "HierachyStructure",
            modelName: "HierachyStructure"
        }
    );
    return HierachyStructure;
};