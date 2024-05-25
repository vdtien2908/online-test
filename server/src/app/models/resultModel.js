'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ResultModel extends Model {
        static associate(models) {
            // define association here
            ResultModel.hasMany(models.ResultDetailModel, {
                foreignKey: 'resultId',
            });

            ResultModel.belongsTo(models.UserModel, {
                foreignKey: 'userId',
            });

            ResultModel.belongsTo(models.TestModel, {
                foreignKey: 'testId',
            });
        }
    }
    ResultModel.init(
        {
            testScore: DataTypes.INTEGER,
            examTime: DataTypes.DATE,
            testTime: DataTypes.TIME,
            numberOfCorrectAnswer: DataTypes.INTEGER,
            numberOfTabSwitch: DataTypes.INTEGER,
            testId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
            status: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'ResultModel',
            tableName: 'results',
        }
    );
    return ResultModel;
};
