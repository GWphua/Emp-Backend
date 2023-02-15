import bcrypt from "bcryptjs";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { ErrorResponse } from "../model/errorResponse";
import { UserJwtPayload } from "../model/UserJwtPayload";
import { UserLoginRequest, UserSignUpRequest } from "../model/userRequest";
import { UserSignUpResponse } from "../model/userResponse";
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

export const signup: RequestHandler = async (req, res, next) => {
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
  const userResponse = new UserSignUpResponse(
    userDef.username,
    userDef.department
  );

  res.status(200).json(userResponse);
};

const secret = "secretkey";

export const login: RequestHandler = async (req, res, next) => {
  const userData = req.body as UserLoginRequest;

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

    // Generate JWT
    const payload = {
      username: user.username,
      department: user.department,
    } as UserJwtPayload;
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    res.status(200).json({ loggedIn: true, token: token });
  } else {
    console.log("LOGIN FAILED> PASSWORD WRITE PROPERLY LAH")
    res.status(401).json(new ErrorResponse("Incorrect credentials!"));
  }
};

export const authorizeUser: RequestHandler = (req, res, next) => {
  const token = req.cookies.token;

  try {
    const decoded = jwt.verify(token, secret);
    const payload = (decoded as jwt.JwtPayload).payload as UserJwtPayload;

    res.status(200).json({ authorized: true, department: payload.department });
  } catch (error) {
    console.log("RAN HERE!!!");
    res
      .status(401)
      .json(new ErrorResponse("Unauthorized JWT token. Please login again!"));
  }
};
