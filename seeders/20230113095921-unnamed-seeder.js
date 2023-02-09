"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "Departments",
      [
        {
          department: "HR",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          department: "PS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          department: "ADMIN",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Departments", null, {});
  },
};
