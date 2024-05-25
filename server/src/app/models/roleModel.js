'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RoleModel extends Model {
        static associate(models) {
            // define association here
            RoleModel.hasMany(models.UserModel, {
                foreignKey: 'roleId',
            });

            RoleModel.hasMany(models.RoleDetailModel, {
                foreignKey: 'roleId',
            });
        }
    }
    RoleModel.init(
        {
            roleName: DataTypes.STRING,
            status: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'RoleModel',
            tableName: 'roles',
        }
    );
    return RoleModel;
};
