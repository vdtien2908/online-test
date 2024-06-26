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

            QuestionModel.belongsTo(models.SubjectModel, {
                foreignKey: 'subjectId',
            });
        }
    }
    QuestionModel.init(
        {
            content: DataTypes.STRING,
            lever: DataTypes.INTEGER,
            subjectId: DataTypes.INTEGER,
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
