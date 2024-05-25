'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AssignExamQuestionModel extends Model {
        static associate(models) {
            // define association here
            AssignExamQuestionModel.belongsTo(models.ClassModel, {
                foreignKey: 'classId',
            });

            AssignExamQuestionModel.belongsTo(models.TestModel, {
                foreignKey: 'testId',
            });
        }
    }
    AssignExamQuestionModel.init(
        {
            testId: {
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            classId: {
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            modelName: 'AssignExamQuestionModel',
            tableName: 'assignExamQuestions',
        }
    );
    return AssignExamQuestionModel;
};
