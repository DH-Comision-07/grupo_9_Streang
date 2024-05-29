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
            type: dataTypes.STRING(45),
            allowNull: false
        },

        email: {
            type: dataTypes.STRING(45),
            allowNull: false
        },

        avatar: {
            type: dataTypes.STRING(45),
            allowNull: true
        },

        password: {
            type: dataTypes.STRING(100),
            allowNull: false
        },

        rol_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },

        birthdate:{
            type: dataTypes.DATEONLY,
            allowNull: false
        }
    }
    let config = {
        tableName: 'users',
        timestamps: false
    }

    let User = sequelize.define(alias, cols, config);

    User.associate = function(models){
        
    }
  
    return User;
}