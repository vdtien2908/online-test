'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('class', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            className: Sequelize.STRING,
            invitationCode: Sequelize.TEXT,
            totalMember: Sequelize.INTEGER,
            note: Sequelize.STRING,
            schoolYear: Sequelize.STRING,
            semester: Sequelize.INTEGER,
            creator: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            subjectId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'subjects',
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
        await queryInterface.dropTable('class');
    },
};
