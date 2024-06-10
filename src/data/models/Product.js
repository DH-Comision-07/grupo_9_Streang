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

        more_images_1: {
            type: dataTypes.STRING(45),
            allowNull: true
        },

        more_images_2: {
            type: dataTypes.STRING(45),
            allowNull: true
        },

        more_images_3: {
            type: dataTypes.STRING(45),
            allowNull: true
        },

        banner_image: {
            type: dataTypes.STRING(45),
            allowNull: true
        },

        description: {
            type: dataTypes.TEXT,
            allowNull: false
        },

        category_id: {
            type: dataTypes.STRING(45),
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
        },

        final_price: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }

    let config = {
        tableName: 'products',
        timestamps: false
    }

    let Product = sequelize.define(alias, cols, config);

    // Product.associate = function(models){
    //     Product.belongsTo(models.Format, {
    //         foreignKey: "format_id",
    //         as: "format"
    //     })

    //     Product.belongsTo(models.Categorie, {
    //         foreignKey: "category_id",
    //         as: "categorie"
    //     })

    //     Product.belongsToMany(models.Platform, {
    //         as: "platforms",
    //         through: "products_platforms",
    //         foreignKey: "product_id",
    //         otherKey: "platform_id",
    //         timestamps: false
    //     })

    //     Product.belongsToMany(models.Buy, {
    //         as: "buys",
    //         through: "products_buys",
    //         foreignKey: "product_id",
    //         otherKey: "buy_id",
    //         timestamps: false
    //     })
    // }

    return Product;
}