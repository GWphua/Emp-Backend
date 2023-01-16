import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../sequelize";

export class Employee extends Model {
  declare id: number;
  declare name: string;
  declare salary: number;
  declare department: "HR" | "PS";
}

Employee.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    salary: { type: DataTypes.NUMBER, allowNull: false },
    department: { type: DataTypes.ENUM("HR", "PS"), allowNull: false },
  },
  {
    sequelize,
    modelName: "Employee",
  }
);

(async () => {
  await sequelize.sync();
})();
