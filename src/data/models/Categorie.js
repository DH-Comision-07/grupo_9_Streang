module.exports = function(sequelize, dataTypes) {
    let alias = "Categories";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            allownull: false,
            autoIncrement: true, 
            primaryKey: true, 
        },
        name: {
            type: dataTypes.STRING(45),
            allownull: false,
        }
    }


    let config = {
        tableName: 'categories',
        timestamps: false
    }

    let Categorie = sequelize.define(alias, cols, config);

    // Categorie.associate = function(models) {

    //     Categorie.hasMany(models.Product, {
    //         foreignKey: "category_id" ,
    //         as: "product"
    //     })

    // }

    return Categorie;
}