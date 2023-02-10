"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Employees", "department_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "Departments",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    const employees = await queryInterface.sequelize.query(
      `SELECT * FROM public."Employees"`
    );

    for (const row of employees[0]) {
      const department = await queryInterface.sequelize.query(
        `SELECT id FROM public."Departments" WHERE department = '${row.department}'`
      );

      await queryInterface.sequelize.query(
        `UPDATE public."Employees" SET "department_id" = ${department[0][0].id} WHERE id = ${row.id}`
      );
    }

    await queryInterface.removeColumn("Employees", "department");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Employees", "department", {
      type: Sequelize.ENUM("HR", "PS", "ADMIN"),
      references: {
        model: "Departments",
        key: "department",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    const employees = await queryInterface.sequelize.query(
      `SELECT * FROM public."Employees"`
    );

    for (const row of employees[0]) {
      const department = await queryInterface.sequelize.query(
        `SELECT department FROM public."Departments" WHERE id = '${row.department_id}'`
      );

      await queryInterface.sequelize.query(
        `UPDATE public."Employees" SET "department" = ${department[0][0].department} WHERE id = ${row.id}`
      );
    }

    await queryInterface.removeColumn("Employees", "department_id");
  },
};
