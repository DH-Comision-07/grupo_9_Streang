module.exports = function(sequelize, DataTypes){
    let alias = "Comments";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        product_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user:{
            type: DataTypes.STRING(45),
            allowNull: false
        },
        comment:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        avatar:{
            type: DataTypes.STRING(45),
            allowNull: false
        },
        date:{
            type: DataTypes.DATE,
            allowNull: false
        }
    }

    let config = {
        tableName: "comments",
        timestamps: false
    }
    let Comment = sequelize.define(alias, cols, config);
    return Comment;
}