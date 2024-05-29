module.exports = function(sequelize, dataTypes){
    let alias = "Buys";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        date: {
            type: dataTypes.DATE,
            allowNull: false
        },

        buyscol: {
            type: dataTypes.STRING,
            allowNull: false
        },

        total: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }

    let config = {
        tableName: 'buys',
        timestamps: false
    }

    let Buy = sequelize.define(alias, cols, config);

    // Buy.associate = function(models){
    //     Buy.belongsTo(models.User, {
    //         foreignKey: "user_id",
    //         foreignKey: "product_id",
    //         as: "users"
    //     })

    //     Buy.belongsToMany(models.Product, {
    //         as: "compras",
    //         through: "products_buys",
    //         foreignKey: "user_id",
    //         otherKey: "product_id",
    //         timestamps: false
    //     })
    // }

    return Buy;
}
