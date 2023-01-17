import { RequestHandler } from "express";
import Joi from "joi";
import { ErrorResponse } from "../model/errorResponse";

export const validateEmployeeRequest: RequestHandler<any> = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    salary: Joi.number().integer().strict().required(),
    department: Joi.string().valid("PS", "HR").required(),
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
