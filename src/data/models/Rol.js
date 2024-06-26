module.exports = function(sequelize, dataTypes){
    let alias = "rols";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        name: {
            type: dataTypes.STRING,
            allowNull: false
        }
    }

    let config = {
        tableName: 'rols',
        timestamps: false
    }

    let Rol = sequelize.define(alias, cols, config);
    
    // Rol.associate = function(models){
    //     Rol.hasMany(models.User, {
    //         foreignKey: "rol_id",
    //         as: "users"
    //     })
    // }

    return Rol
}