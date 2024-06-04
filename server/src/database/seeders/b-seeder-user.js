'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'users',
            [
                {
                    email: 'admin@gmail.com',
                    code: '23131231',
                    fullName: 'Admin',
                    gender: 1,
                    dob: '2002-08-29 14:58:58',
                    phoneNumber: '0333669832',
                    password:
                        '$2b$10$WM6ixYmN/5X.7jmQnGvrK.cT8toiU8jR.ohGJ7NwktFySpjE9gnQy',
                    roleId: 1,
                    createdAt: '2024-06-04 14:58:58',
                    updatedAt: '2024-06-04 14:58:58',
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', null, {});
    },
};
