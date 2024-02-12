import * as userModel from "../models/userModel";
import { IncomingMessage, ServerResponse } from "node:http";
import { User } from "../types";
import { getPostBody } from "../utils/getPostBody";
import {
  badRequestResponse,
  notFoundRequestResponse,
  requestWasSucceed,
} from "../utils/http";

const isUser = (obj: any): obj is Omit<User, "id"> => {
  return (
    typeof obj === "object" &&
    "username" in obj &&
    "age" in obj &&
    "hobbies" in obj &&
    typeof obj.username === "string" &&
    typeof obj.age === "number" &&
    Array.isArray(obj.hobbies) &&
    obj.hobbies.every((hobby: unknown) => {
      return typeof hobby === "string";
    })
  );
};
// get all users
export const getAllUsers = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const users = await userModel.getUsers();
  return requestWasSucceed(res, users);
};

// add new user to users
export const addNewUser = async (req: IncomingMessage, res: ServerResponse) => {
  const user = await getPostBody(req);

  if (isUser(user)) {
    const newAddUser = await userModel.addNewUser(user);
    requestWasSucceed(res, newAddUser, 201);
    return;
  }
  return badRequestResponse(res, "Body does not contain required fields");
};

// get user by ID
export const getUserById = async (
  req: IncomingMessage,
  res: ServerResponse,
  params: Record<string, string>
) => {
  const id = params?.["user_id"];
  if (typeof id !== "string") {
    return badRequestResponse(res, "UserId is invalid");
  }
  const userById = await userModel.getUserById(id);
  if (!userById) {
    return notFoundRequestResponse(res, `User with id ${id} not found`);
  }
  return requestWasSucceed(res, userById);
};
//Update User
export const updateUserProperty = async (
  req: IncomingMessage,
  res: ServerResponse,
  params: Record<string, string>
) => {
  const id = params?.["user_id"];
  if (typeof id !== "string") {
    return badRequestResponse(res, "invalid user id");
  }
  let propertyForUserUpdate;
  try {
    propertyForUserUpdate = await getPostBody(req);
  } catch (error) {
    return badRequestResponse(res, "invalid user data");
  }

  if (!isUser(propertyForUserUpdate)) {
    return badRequestResponse(res, "invalid user data");
  }
  const user = {
    username: propertyForUserUpdate.username,
    age: propertyForUserUpdate.age,
    hobbies: propertyForUserUpdate.hobbies,
    id: id,
  };
  const wasUserUpdated = await userModel.updateUserProperty(user);
  if (!wasUserUpdated) {
    return notFoundRequestResponse(res, "User not found");
  }
  return requestWasSucceed(res, user);
};

// delete user by ID
export const deleteUserById = async (
  req: IncomingMessage,
  res: ServerResponse,
  params: Record<string, string>
) => {
  const id = params?.["user_id"];
  if (typeof id !== "string") {
    return badRequestResponse(res, "UserId is invalid");
  }

  const wasUserDeleted = await userModel.deleteUser(id);

  if (wasUserDeleted) {
    res.statusCode = 204;
    res.setHeader("Content-Type", "text/json");
    res.write(
      JSON.stringify({
        message: "User was deleted",
      })
    );
    res.end();
    return;
  }
  return notFoundRequestResponse(res, `User with id ${id} not found`);
};
