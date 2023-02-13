import bcrypt from "bcryptjs";
import { RequestHandler } from "express";
import { ErrorResponse } from "../model/errorResponse";
import { UserRequest } from "../model/userRequest";
import { userWithDepartment } from "../services/departmentService";
import { createUserData, existingUserWithUsername, getAllUserData } from "../services/userService";

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
  const userData = req.body as UserRequest;

  const hashedPassword = await bcrypt.hash(userData.password, 12);
  console.log(hashedPassword);

  // Check if user is already in database, and throw error.
  const userWithSameUsername = await existingUserWithUsername(userData.username);
  if (userWithSameUsername != null) {
    res.status(400).json(new ErrorResponse("Username already exists."));
    return;
  }

  const createdUser = await createUserData(
    userData.username,
    hashedPassword,
    userData.department
  );

  const userDef = await userWithDepartment(createdUser);

  if (userDef == null) {
    res.status(400).json(new ErrorResponse("User Details are invalid."));
  } else {
    res.status(200).json(userDef);
  }
};
