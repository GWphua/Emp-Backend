import bcrypt from "bcryptjs";
import { RequestHandler } from "express";
import { ErrorResponse } from "../model/errorResponse";
import { UserLogInRequest, UserSignUpRequest } from "../model/userRequest";
import { userWithDepartment } from "../services/departmentService";
import {
  createUserData,
  existingUserWithUsername,
  getAllUserData,
} from "../services/userService";

export const getAllUsers: RequestHandler = async (req, res, next) => {
  const databaseUsers = await getAllUserData();

  const users = await Promise.all(
    databaseUsers.map(
      async (databaseUser) => (await userWithDepartment(databaseUser))!
    )
  );

  res.status(200).json(users);
};

export const signUp: RequestHandler = async (req, res, next) => {
  const userData = req.body as UserSignUpRequest;

  const userWithSameUsername = await existingUserWithUsername(
    userData.username
  );

  if (userWithSameUsername != null) {
    res.status(400).json(new ErrorResponse("Username already exists."));
    return;
  }

  const hashedPassword = await bcrypt.hash(userData.password, 12);
  const createdUser = await createUserData(
    userData.username,
    hashedPassword,
    userData.department
  );

  const userDef = await userWithDepartment(createdUser);

  res.status(200).json(userDef);
};

export const login: RequestHandler = async (req, res, next) => {
  const userData = req.body as UserLogInRequest;

  const existingUser = await existingUserWithUsername(userData.username);

  if (existingUser == null) {
    res.status(400).json(new ErrorResponse("Username is invalid!"));
    return;
  }

  const passwordsAreEqual = await bcrypt.compare(
    userData.password,
    existingUser.password
  );

  if (passwordsAreEqual) {
    const user = await userWithDepartment(existingUser);

    req.session.user = {
      username: user.username,
      department: user.department,
    };
    req.session.isAuthenticated = true;
    req.session.save(() => res.status(200).json("Logged In"));
  } else {
    res.status(400).json(new ErrorResponse("Incorrect password!"));
  }
};
