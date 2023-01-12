import express, { NextFunction, Request, Response, Router } from 'express';
import employeeRouter from './routes/employees'
import { json } from 'body-parser';

const app = express();

app.use(json());

app.use('/employee', employeeRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({message:err.message});
});

app.listen(3000, () => {
  console.log("Application listening at http://localhost:3000");
});