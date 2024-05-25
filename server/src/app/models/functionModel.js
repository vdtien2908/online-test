'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class FunctionModel extends Model {
        static associate(models) {
            // define association here
            FunctionModel.hasMany(models.RoleDetailModel, {
                foreignKey: 'functionId',
            });
        }
    }
    FunctionModel.init(
        {
            functionName: DataTypes.STRING,
            status: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'FunctionModel',
            tableName: 'functions',
        }
    );
    return FunctionModel;
};
