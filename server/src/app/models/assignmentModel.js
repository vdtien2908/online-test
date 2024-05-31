'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AssignmentModel extends Model {
        static associate(models) {
            // define association here
            AssignmentModel.belongsTo(models.SubjectModel, {
                foreignKey: 'subjectId',
            });

            AssignmentModel.belongsTo(models.UserModel, {
                foreignKey: 'userId',
            });
        }
    }
    AssignmentModel.init(
        {
            userId: {
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            subjectId: {
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            modelName: 'AssignmentModel',
            tableName: 'assignments',
        }
    );
    return AssignmentModel;
};
