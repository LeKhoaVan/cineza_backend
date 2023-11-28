
module.exports = (sequelize, DataTypes) => {
    const MovieType = sequelize.define("MovieType", {
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

        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
        {
            sequelize,
            modelName: "MovieType",
            tableName: "MovieType",
            timestamps: true,
        }
    )
    return MovieType;
}

