"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "Employees",
      [
        {
          name: "GW",
          salary: 1700,
          department: "HR",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "CAS",
          salary: 1000,
          department: "PS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Users", null, {});
  },
};
