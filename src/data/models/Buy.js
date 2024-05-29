module.exports = function(sequelize, dataTypes) {
    let alias = "Buys"
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        buyscol: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };

    let config = {
        tableName: 'buys',
        timestamps: false
    }

    let Buy = sequelize.define(alias, cols, config);

    return Buy; 
}