module.exports = function(sequelize, dataTypes) {
    let alias = "Format";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false, 
            primaryKey: true,
            autoIncremet: true
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        }
    }
    let config = {
        timestamps: false,
        tableName: "formats"
    }

    let Format = sequelize.define(alias, cols, config);

    return Format;
}