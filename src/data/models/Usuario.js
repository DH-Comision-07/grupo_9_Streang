module.exports = function(sequelize, dataTypes){
    let alias = "Usuario";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        nombre: {
            type: dataTypes.STRING(45),
            allowNull: false
        },

        apellido: {
            type: dataTypes.STRING(60),
            allowNull: false
        },

        email: {
            type: dataTypes.STRING(45),
            allowNull: false
        },

        imagen: {
            type: dataTypes.BOOLEAN,
            allowNull: true
        },

        contraseña: {
            type: dataTypes.STRING(45),
            allowNull: false
        },

        categoria: {
            type: dataTypes.ENUM('administrador', 'invitado'),
            allowNull: false
        }
    }
    let config = {
        tableName: 'usuarios',
        timestamps: false
    }

    let Usuario = sequelize.define(alias, cols, config);

    Usuario.associate = function(models){
        Usuario.belongsTo(models.Compra, {
            foreignKey: "usuarios_id",
            as: "usuarios"
        })
    }
}