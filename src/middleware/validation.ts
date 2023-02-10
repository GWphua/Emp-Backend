import { RequestHandler } from "express";
import Joi from "joi";
import { ErrorResponse } from "../model/errorResponse";
import { getAllDepartment } from "../services/departmentService";

export const validateEmployeeRequest: RequestHandler<any> = async (
  req,
  res,
  next
) => {
  const departments = await getAllDepartment();
  console.log(departments);

  const schema = Joi.object({
    name: Joi.string().required(),
    salary: Joi.number().integer().strict().required(),
    department: Joi.string()
      .valid(...departments)
      .required(),
  });

  const value = schema.validate(req.body);
  if (value.error) {
    res
      .status(400)
      .json(new ErrorResponse("Please ensure fields are entered correctly"));
  } else {
    next();
  }
};

// check if is number.
export const validateEmployeeId: RequestHandler<{ emp_id: string }> = (
  req,
  res,
  next
) => {
  const schema = Joi.number().greater(0);
  const value = schema.validate(+req.params.emp_id);

  if (value.error) {
    res
      .status(400)
      .json(
        new ErrorResponse(
          "Please ensure request parameters are entered correctly"
        )
      );
  } else {
    next();
  }
};
