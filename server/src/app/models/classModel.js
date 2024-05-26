'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ClassModel extends Model {
        static associate(models) {
            // define association here
            ClassModel.belongsTo(models.SubjectModel, {
                foreignKey: 'subjectId',
            });

            ClassModel.belongsTo(models.UserModel, {
                foreignKey: 'creator',
            });

            ClassModel.hasMany(models.AssignExamQuestionModel, {
                foreignKey: 'classId',
            });

            ClassModel.hasMany(models.ClassDetailModel, {
                foreignKey: 'classId',
            });
        }
    }
    ClassModel.init(
        {
            className: DataTypes.STRING,
            invitationCode: DataTypes.TEXT,
            totalMember: DataTypes.INTEGER,
            note: DataTypes.STRING,
            schoolYear: DataTypes.STRING,
            semester: DataTypes.INTEGER,
            creator: DataTypes.INTEGER,
            subjectId: DataTypes.INTEGER,
            status: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'ClassModel',
            tableName: 'class',
        }
    );
    return ClassModel;
};
