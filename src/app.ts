import { json } from "body-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import session from "express-session";
import { sequelize } from "../sequelize";
import employeeRouter from "./routes/employees";
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();

app.use(cors());

app.use(json());

app.use(
  session({
    // Used internally for securing the session, and also making sure the session cannot be faked.
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);

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
