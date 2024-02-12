import { users } from "../data/users";
import { User } from "../types";
import { v4 as uuidv4 } from "uuid";

export const getUsers = async (): Promise<User[]> => {
  return users;
};
export const addNewUser = async (user: Omit<User, "id">): Promise<User> => {
  const newUser = {
    username: user.username,
    age: user.age,
    hobbies: user.hobbies,
    id: uuidv4(),
  };
  users.push(newUser);
  return newUser;
};

export const getUserById = async (id: string): Promise<User | null> => {
  return (
    users.find((item) => {
      return item.id === id;
    }) || null
  );
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const index = users.findIndex((item) => {
    return item.id === id;
  });
  if (index === -1) {
    return false;
  }
  users.splice(index, 1);
  return true;
};

export const updateUserProperty = async (user: User): Promise<boolean> => {
  const index = users.findIndex((item) => {
    return item.id === user.id;
  });
  if (index === -1) {
    return false;
  }
  users[index] = user;
  return true;
};
