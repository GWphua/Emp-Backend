import express, { NextFunction, Request, Response, Router } from "express";
import employeeRouter from "./routes/employees";
import { json } from "body-parser";
import { sequelize } from "../sequelize";

var cors = require("cors");

const app = express();

app.use(cors());

app.use(json());

app.use("/employee", employeeRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000, async () => {
  console.log("Application listening at http://localhost:3000");
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
});
