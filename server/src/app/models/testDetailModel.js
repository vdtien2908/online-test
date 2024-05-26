'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TestDetailModel extends Model {
        static associate(models) {
            // define association here
            TestDetailModel.belongsTo(models.QuestionModel, {
                foreignKey: 'questionId',
            });

            TestDetailModel.belongsTo(models.TestModel, {
                foreignKey: 'testId',
            });
        }
    }
    TestDetailModel.init(
        {
            testId: {
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            questionId: {
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            sortOrder: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'TestDetailModel',
            tableName: 'testDetails',
        }
    );
    return TestDetailModel;
};
