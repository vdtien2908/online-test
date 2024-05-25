'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ResultDetailModel extends Model {
        static associate(models) {
            // define association here
            ResultDetailModel.belongsTo(models.QuestionModel, {
                foreignKey: 'questionId',
            });

            ResultDetailModel.belongsTo(models.ResultModel, {
                belongsTo: 'resultId',
            });
        }
    }
    ResultDetailModel.init(
        {
            resultId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            questionId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            selectedAnswer: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'ResultDetailModel',
            tableName: 'resultDetails',
        }
    );
    return ResultDetailModel;
};
