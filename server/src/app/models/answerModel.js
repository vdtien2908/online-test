'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AnswerModel extends Model {
        static associate(models) {
            // define association here
            AnswerModel.belongsTo(models.QuestionModel, {
                foreignKey: 'questionId',
            });
        }
    }
    AnswerModel.init(
        {
            content: DataTypes.STRING,
            isAnswer: DataTypes.BOOLEAN,
            questionId: DataTypes.INTEGER,
            status: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'AnswerModel',
            tableName: 'answers',
        }
    );
    return AnswerModel;
};
