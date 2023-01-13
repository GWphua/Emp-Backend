import { Sequelize } from "sequelize";

const sequelize = new Sequelize('employee', 'postgres','Phua0107', {
  host: 'localhost',
  dialect: 'postgres'
});

try {
  sequelize.authenticate().then(() =>
    console.log("Connection has been established successfully.")
  );
} catch (error) {
  console.error("Unable to connect to the database: ", error);
}