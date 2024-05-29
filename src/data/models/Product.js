module.exports = function(sequelize, dataTypes){
    let alias = "Products";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },

        video: {
            type: dataTypes.STRING(45),
            allowNull: true
        },

        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },

        available: {
            type: dataTypes.TINYINT,
            allowNull: true
        },

        main_image: {
            type: dataTypes.STRING(45),
            allowNull: true
        },

        description: {
            type: dataTypes.TEXT,
            allowNull: false
        },

        category_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },

        stock: {
            type: dataTypes.INTEGER,
            allowNull: false
        },

        platform_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },

        format_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },

        discount: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }

    let config = {
        tableName: 'products',
        timestamps: false
    }

    let Product = sequelize.define(alias, cols, config);

    Product.associate = function(models){
        Product.belongsToMany(models.Compra, {
            as: "buys",
            through: "products_buys",
            foreignKey: "product_id",
            otherKey: "buy_id",
            timestamps: false
        })
    }
}