import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { DepartmentType } from "../src/model/departmentDef";


export class Employee extends Model {
  declare id: number;
  declare name: string;
  declare salary: number;
  declare department: DepartmentType;
}

Employee.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    salary: { type: DataTypes.NUMBER, allowNull: false },
    department: { type: DataTypes.ENUM("HR", "PS", "ADMIN"), allowNull: false },
  },
  {
    sequelize,
    modelName: "Employees",
  }
);

(async () => {
  await sequelize.sync();
})();
