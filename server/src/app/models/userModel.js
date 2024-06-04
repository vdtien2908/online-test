'use strict';
const { Model } = require('sequelize');
import bcrypt from 'bcrypt';
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
                foreignKey: 'userId',
            });

            UserModel.hasMany(models.ClassModel, {
                foreignKey: 'creator',
            });

            UserModel.belongsTo(models.RoleModel, {
                foreignKey: 'roleId',
            });
        }

        // Check password
        async isCorrectPassword(password) {
            return await bcrypt.compare(password, this.password);
        }
    }
    UserModel.init(
        {
            code: DataTypes.STRING,
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
            hooks: {
                beforeCreate: async (user) => {
                    if (user.password) {
                        const salt = await bcrypt.genSalt(10);
                        user.password = await bcrypt.hash(user.password, salt);
                    }
                },
                beforeUpdate: async (user) => {
                    if (user.changed('password')) {
                        const salt = await bcrypt.genSalt(10);
                        user.password = await bcrypt.hash(user.password, salt);
                    }
                },
            },
        }
    );

    return UserModel;
};
