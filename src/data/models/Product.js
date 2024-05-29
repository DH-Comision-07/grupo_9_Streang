module.exports = function(sequelize, dataTypes){
    let alias = "Product";
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
            type: dataTypes.STRING(60),
            allowNull: false
        },

        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },

        available: {
            type: dataTypes.BOOLEAN,
            allowNull: false
        },

        main_image: {
            type: dataTypes.BOOLEAN,
            allowNull: true
        },

        categoria: {
            type: dataTypes.ENUM('videojuegos', 'consolas', 'accesorios'),
            allowNull: false
        }
    }
    let config = {
        tableName: 'productos',
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