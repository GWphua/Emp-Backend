import { RequestHandler } from "express";
import { ErrorResponse } from "../model/errorResponse";
import { UserRequest } from "../model/userRequest";
import { userWithDepartment } from "../services/departmentService";
import { createUserData, getAllUserData } from "../services/userService";

export const getAllUsers: RequestHandler = async (req, res, next) => {
  const databaseUsers = await getAllUserData();

  const users = await Promise.all(
    databaseUsers.map(
      async (databaseUser) => (await userWithDepartment(databaseUser))!
    )
  );

  res.status(200).json(users);
};

export const createUser: RequestHandler = async (req, res, next) => {
  const request = req.body as UserRequest;
  const createdUser = await createUserData(
    request.username,
    request.password,
    request.department
  );

  if (createdUser == null) {
    res.status(400).json(new ErrorResponse("User Details are invalid."));
    return;
  }

  const userDef = await userWithDepartment(createdUser);

  if (userDef == null) {
    res.status(400).json(new ErrorResponse("User Details are invalid."));
  } else {
    res.status(200).json(userDef);
  }
};
