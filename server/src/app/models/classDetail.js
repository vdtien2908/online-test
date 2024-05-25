'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ClassDetailModel extends Model {
        static associate(models) {
            // define association here
            ClassDetailModel.belongsTo(models.ClassModel, {
                foreignKey: 'classId',
            });

            ClassDetailModel.belongsTo(models.UserModel, {
                foreignKey: 'userId',
            });
        }
    }
    ClassDetailModel.init(
        {
            classId: {
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            userId: {
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            modelName: 'ClassDetailModel',
            tableName: 'classDetails',
        }
    );
    return ClassDetailModel;
};
