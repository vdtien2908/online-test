'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('results', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            testScore: Sequelize.INTEGER,
            examTime: Sequelize.DATE,
            testTime: Sequelize.TIME,
            numberOfCorrectAnswer: Sequelize.INTEGER,
            numberOfTabSwitch: Sequelize.INTEGER,
            testId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'tests',
                    key: 'id',
                },
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
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
        await queryInterface.dropTable('results');
    },
};
