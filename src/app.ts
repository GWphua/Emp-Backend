import express, { Router } from 'express';
import employeeRouter from './routes/employees'
import { json } from 'body-parser';

const app = express();
app.use(json());
app.use('/employee', employeeRouter);

app.listen(3000, () => {
  console.log("Application listening at http://localhost:3000");
});