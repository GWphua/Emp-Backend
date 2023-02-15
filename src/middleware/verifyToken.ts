import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { ErrorResponse } from "../model/errorResponse";
import { UserRequest } from "../model/RequestHandlerTypes";
import { UserJwtPayload } from "../model/UserJwtPayload";

const secret = "secretkey";

export const verifyToken: RequestHandler = (req: UserRequest, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json(new ErrorResponse("No token provided!"));
  }

  if (!token.startsWith("Bearer ")) {
    return res.status(401).json(new ErrorResponse("Invalid token header!"));
  }

  try {
    const jwtToken = token.split(" ")[1];
    
    const decoded = jwt.verify(jwtToken, secret);
   
    req.user = decoded as UserJwtPayload;
    next();
  } catch (error) {
    return res.status(401).json(new ErrorResponse("Invalid token!"));
  }
};
