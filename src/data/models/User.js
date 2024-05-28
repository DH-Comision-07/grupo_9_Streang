module.exports = function(sequelize, dataTypes){
    let alias = "Users";
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
        tableName: 'users',
        timestamps: false
    }

    let User = sequelize.define(alias, cols, config);

    User.associate = function(models){
        User.belongsTo(models.Buy, {
            foreignKey: "user_id",
            as: "users"
        })
    }
}