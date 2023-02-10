import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { DepartmentType } from "../src/model/departmentDef";

export class Employee extends Model {
  declare id: number;
  declare name: string;
  declare salary: number;
  declare department_id: number;
}

Employee.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    salary: { type: DataTypes.NUMBER, allowNull: false },
    department_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "Employees",
  }
);

(async () => {
  await sequelize.sync();
})();
