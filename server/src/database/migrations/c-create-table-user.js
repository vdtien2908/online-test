'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            email: Sequelize.STRING,
            fullName: Sequelize.STRING,
            gender: Sequelize.BOOLEAN,
            dob: Sequelize.DATE,
            phoneNumber: Sequelize.STRING,
            password: Sequelize.STRING,
            refreshToken: Sequelize.STRING,
            passwordChangeAt: Sequelize.STRING,
            passwordResetToken: Sequelize.STRING,
            passwordResetExpires: Sequelize.STRING,
            roleId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'roles',
                    key: 'id',
                },
            },
            status: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
    },
};
