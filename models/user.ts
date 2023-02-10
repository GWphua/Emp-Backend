import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";

export class User extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
  declare department_id: number;
}

User.init(
  {
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    department_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "Users",
  }
);

(async () => {
  await sequelize.sync();
})();
