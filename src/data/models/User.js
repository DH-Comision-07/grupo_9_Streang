module.exports = function(sequelize, dataTypes){
    let alias = "Users";
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

        last_name: {
            type: dataTypes.STRING(60),
            allowNull: false
        },

        email: {
            type: dataTypes.STRING(45),
            allowNull: false
        },

        password: {
            type: dataTypes.STRING(45),
            allowNull: false
        },

        user_name: {
            
        },

        avatar: {
            type: dataTypes.BOOLEAN,
            allowNull: true
        },

        birthdate: {
            
        }

        // categoria: {
        //     type: dataTypes.ENUM('administrador', 'invitado'),
        //     allowNull: false
        // }
    }
    let config = {
        tableName: 'users',
        timestamps: false
    }

    let User = sequelize.define(alias, cols, config);

    User.associate = function(models){
        User.belongsTo(models.Rol, {
            foreignKey: "rol_id",
            as: "rols"
        })
        User.hasMany(models.Buy, {
            foreignKey: "user_id",
            as: "buys"
        })
    }
}