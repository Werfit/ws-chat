import type { User } from "../types";
import { users } from "./storage";

const createUser = (id: User["id"], name: User["username"]) => {
  if (users.has(id)) {
    throw new Error(`User with id [${id}] already exists`);
  }

  const usernameExists = users.values().some((user) => user.username === name);
  if (usernameExists) {
    throw new Error(`User with name [${name}] already exists`);
  }

  const user: User = {
    id,
    username: name,
  };

  users.set(id, user);
  return user;
};

const getUser = (id: User["id"]): User => {
  if (!users.has(id)) {
    throw new Error(`User with id [${id}] doesn't exist`);
  }

  return users.get(id) as User;
};

const deleteUser = (id: User["id"]) => {
  return users.delete(id);
};

export { createUser, getUser, deleteUser };
