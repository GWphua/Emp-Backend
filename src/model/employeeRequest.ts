import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().required(),
  salary: Joi.number().integer(),
  department: Joi.string().valid("PS", "HR"),
});

export class EmployeeRequest {
  constructor(
    public name: string,
    public salary: number,
    public department: "HR" | "PS"
  ) {}

  public isValidRequest(): boolean {
    try {
      schema.validate(this);
    } catch {
      return false;
    }
    return true;
  }
}
