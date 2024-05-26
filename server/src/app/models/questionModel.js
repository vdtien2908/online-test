'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class QuestionModel extends Model {
        static associate(models) {
            // define association here
            QuestionModel.hasMany(models.AnswerModel, {
                foreignKey: 'questionId',
            });

            QuestionModel.hasMany(models.ResultDetailModel, {
                foreignKey: 'questionId',
            });

            QuestionModel.hasMany(models.TestDetailModel, {
                foreignKey: 'questionId',
            });

            QuestionModel.belongsTo(models.UserModel, {
                foreignKey: 'userId',
            });

            QuestionModel.belongsTo(models.ChapterModel, {
                foreignKey: 'chapterId',
            });
        }
    }
    QuestionModel.init(
        {
            content: DataTypes.STRING,
            lever: DataTypes.INTEGER,
            chapterId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
            status: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'QuestionModel',
            tableName: 'questions',
        }
    );
    return QuestionModel;
};
