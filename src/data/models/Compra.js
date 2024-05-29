module.exports = function(sequelize, dataTypes){
    let alias = "Compra";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        fecha: {
            type: dataTypes.DATETIME,
            allowNull: false
        },
    }
    let config = {
        tableName: 'compras',
        timestamps: false
    }

    let Compra = sequelize.define(alias, cols, config);

    Compra.associate = function(models){
        Compra.belongsTo(models.Usuario, {
            foreignKey: "usuarios_id",
            as: "usuarios"
        })

        Compra.belongsToMany(models.Producto, {
            as: "compras",
            through: "productos_compras",
            foreignKey: "compras_id",
            otherKey: "productos_id",
            timestamps: false
        })
    }
}