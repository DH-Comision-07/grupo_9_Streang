module.exports = function(sequelize, dataTypes){
    let alias = "Products";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        marca: {
            type: dataTypes.STRING(45),
            allowNull: false
        },

        nombre: {
            type: dataTypes.STRING(60),
            allowNull: false
        },

        precio: {
            type: dataTypes.INTEGER,
            allowNull: false
        },

        disponible: {
            type: dataTypes.BOOLEAN,
            allowNull: false
        },

        imagenes: {
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

    let Producto = sequelize.define(alias, cols, config);

    Producto.associate = function(models){
        Producto.belongsToMany(models.Compra, {
            as: "compras",
            through: "productos_compras",
            foreignKey: "productos_id",
            otherKey: "compras_id",
            timestamps: false
        })
    }
}