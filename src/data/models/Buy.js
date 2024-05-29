module.exports = function(sequelize, dataTypes) {
    let alias = "Buys"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        date: {
            type: dataTypes.DATE,
            allowNull: false,
        },
        buyscol: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        user_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        total: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };

    let config = {
        tableName: 'buys',
        timestamps: false
    }

    let Buy = sequelize.define(alias, cols, config);

    /*Buy.associate = function(models){

        Buy.belongsToMany(models.Product, {
            as: 'products',
            through: 'products_buys',
            foreignKey: "buy_id",
            otherkey: "product_id",
            timestamps: false
        })

        Buy.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "user"
        })

    }*/


    return Buy; 
}