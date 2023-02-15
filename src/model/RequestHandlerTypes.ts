import { Request } from "express";
import { UserJwtPayload } from "./UserJwtPayload";

export interface UserRequest extends Request {
  user?: UserJwtPayload;
}
