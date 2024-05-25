'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RoleDetailModel extends Model {
        static associate(models) {
            // define association here
            RoleDetailModel.belongsTo(models.RoleModel, {
                foreignKey: 'roleId',
            });

            RoleDetailModel.belongsTo(models.FunctionModel, {
                foreignKey: 'functionId',
            });
        }
    }
    RoleDetailModel.init(
        {
            roleId: {
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            functionId: {
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            modelName: 'RoleDetailModel',
            tableName: 'roleDetails',
        }
    );
    return RoleDetailModel;
};
