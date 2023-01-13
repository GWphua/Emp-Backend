import { Sequelize } from "sequelize";
import config from "./src/Database/config/config";

require('dotenv').config();

const dbConfig = (config as any)[process.env.NODE_ENV || ''];
export const sequelize = new Sequelize(dbConfig);
