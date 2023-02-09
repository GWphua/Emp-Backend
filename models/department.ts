import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { DepartmentType } from "../src/model/departmentDef";

export class Department extends Model {
  declare id: number;
  declare department: DepartmentType;
}

Department.init(
  {
    department: { type: DataTypes.ENUM("HR", "PS", "ADMIN"), allowNull: false },
  },
  {
    sequelize,
    modelName: "Departments",
  }
);

(async () => {
  await sequelize.sync();
})();
