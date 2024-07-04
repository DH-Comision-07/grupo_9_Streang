module.exports = function(sequelize, dataTypes) {
    let alias = "Contact";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(40),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(70),
            allowNull: false
        },
        subject:{
            type: dataTypes.STRING(70),
            allowNull: true
        },
        message: {
            type: dataTypes.TEXT,
            allowNull: false
        }
    }

    let config = {
        tableName: 'contact',
        timestamps: false
    }

    let Contact = sequelize.define(alias, cols, config);

    return Contact;
}