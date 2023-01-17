require('dotenv').config();
import { Sequelize } from "sequelize";
import config from "./config/config";

console.log(process.env.NODE_ENV);
const dbConfig = (config as any)[process.env.NODE_ENV || ''];
console.log(config);

export const sequelize = new Sequelize(dbConfig);
