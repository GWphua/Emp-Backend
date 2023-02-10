import { RequestHandler } from "express";

export const getAllUsers: RequestHandler = async (req, res, next) => {
  res.status(200).json(await getAllUser());
};
