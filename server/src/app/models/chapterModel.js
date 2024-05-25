'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ChapterModel extends Model {
        static associate(models) {
            // define association here
            ChapterModel.belongsTo(models.SubjectModel, {
                foreignKey: 'subjectId',
            });

            ChapterModel.hasMany(models.QuestionModel, {
                foreignKey: 'chapterId',
            });
        }
    }
    ChapterModel.init(
        {
            chapterName: DataTypes.STRING,
            subjectId: DataTypes.INTEGER,
            status: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'ChapterModel',
            tableName: 'chapters',
        }
    );
    return ChapterModel;
};
