'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SubjectModel extends Model {
        static associate(models) {
            // define association here
            SubjectModel.hasMany(models.ChapterModel, {
                foreignKey: 'subjectId',
            });

            SubjectModel.hasMany(models.ClassModel, {
                foreignKey: 'subjectId',
            });

            SubjectModel.hasMany(models.AssignmentModel, {
                foreignKey: 'subjectId',
            });
        }
    }
    SubjectModel.init(
        {
            subjectName: DataTypes.STRING,
            numberCredits: DataTypes.INTEGER,
            numberOfPracticalLessons: DataTypes.INTEGER,
            numberOfTheoryLessons: DataTypes.INTEGER,
            status: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'SubjectModel',
            tableName: 'subjects',
        }
    );
    return SubjectModel;
};
