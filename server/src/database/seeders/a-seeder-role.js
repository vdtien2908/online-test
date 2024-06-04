'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'roles',
            [
                {
                    roleName: 'Admin',
                    status: false,
                    createdAt: '2023-12-30 14:58:58',
                    updatedAt: '2023-12-30 14:58:58',
                },
                {
                    roleName: 'Sinh viên',
                    status: false,
                    createdAt: '2023-12-30 14:58:58',
                    updatedAt: '2023-12-30 14:58:58',
                },
                {
                    roleName: 'Giảng viên',
                    status: false,
                    createdAt: '2023-12-30 14:58:58',
                    updatedAt: '2023-12-30 14:58:58',
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('roles', null, {});
    },
};
