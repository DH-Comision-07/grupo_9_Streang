module.exports = function(sequelize, dataTypes){
    let alias = "Platforms";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING(45),
            allowNull: false
        }
    }
    let config = {
        timestamps: false,
        tableName: "platforms"
    }

    let Platform = sequelize.define(alias, cols, config);

    return Platform;

}