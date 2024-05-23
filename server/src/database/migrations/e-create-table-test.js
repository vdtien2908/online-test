'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tests', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            subjectName: Sequelize.STRING,
            title: Sequelize.STRING,
            examTime: Sequelize.DATE,
            startTime: Sequelize.TIME,
            endTime: Sequelize.TIME,
            typeTest: Sequelize.BOOLEAN,
            seeTestScores: Sequelize.BOOLEAN,
            reviewTheTest: Sequelize.BOOLEAN,
            submitTestWhenChangeTab: Sequelize.BOOLEAN,
            numberOfEasyQuestion: Sequelize.INTEGER,
            numberOfBasicQuestion: Sequelize.INTEGER,
            numberOfDifficultQuestion: Sequelize.INTEGER,
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
        await queryInterface.dropTable('tests');
    },
};
