'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TestModel extends Model {
        static associate(models) {
            // define association here
            TestModel.hasMany(models.TestDetailModel, {
                foreignKey: 'testId',
            });

            TestModel.hasMany(models.ResultModel, {
                foreignKey: 'testId',
            });

            TestModel.hasMany(models.AssignExamQuestionModel, {
                foreignKey: 'testId',
            });

            TestModel.belongsTo(models.UserModel, {
                foreignKey: 'userId',
            });
        }
    }
    TestModel.init(
        {
            subjectName: DataTypes.STRING,
            title: DataTypes.STRING,
            examTime: DataTypes.DATE,
            startTime: DataTypes.TIME,
            endTime: DataTypes.TIME,
            typeTest: DataTypes.BOOLEAN,
            seeTestScores: DataTypes.BOOLEAN,
            reviewTheTest: DataTypes.BOOLEAN,
            submitTestWhenChangeTab: DataTypes.BOOLEAN,
            numberOfEasyQuestion: DataTypes.INTEGER,
            numberOfBasicQuestion: DataTypes.INTEGER,
            numberOfDifficultQuestion: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
            status: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'TestModel',
            tableName: 'tests',
        }
    );
    return TestModel;
};
