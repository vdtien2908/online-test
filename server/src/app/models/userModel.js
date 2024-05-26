'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserModel extends Model {
        static associate(models) {
            // define association here
            UserModel.hasMany(models.QuestionModel, {
                foreignKey: 'userId',
            });

            UserModel.hasMany(models.ResultModel, {
                foreignKey: 'userId',
            });

            UserModel.hasMany(models.TestModel, {
                foreignKey: 'userId',
            });

            UserModel.hasMany(models.ClassDetailModel, {
                foreignKey: 'userId',
            });

            UserModel.hasMany(models.AssignmentModel, {
                foreignKey: 'lecturerId',
            });

            UserModel.hasMany(models.ClassModel, {
                foreignKey: 'creator',
            });

            UserModel.belongsTo(models.RoleModel, {
                foreignKey: 'roleId',
            });
        }
    }
    UserModel.init(
        {
            email: DataTypes.STRING,
            fullName: DataTypes.STRING,
            gender: DataTypes.BOOLEAN,
            dob: DataTypes.DATE,
            phoneNumber: DataTypes.STRING,
            password: DataTypes.STRING,
            refreshToken: DataTypes.STRING,
            passwordChangeAt: DataTypes.STRING,
            passwordResetToken: DataTypes.STRING,
            passwordResetExpires: DataTypes.STRING,
            roleId: DataTypes.INTEGER,
            status: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'UserModel',
            tableName: 'users',
        }
    );
    return UserModel;
};
