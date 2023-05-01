import { User, Room, Message } from "../types";
import {
  deleteUserRoom,
  getOrCreateRoom,
  getUserRoom,
  joinUser,
} from "./rooms";
import { createUser, deleteUser, getUser } from "./users";

const authorize = (
  userId: User["id"],
  username: User["username"],
  roomId: Room["id"]
) => {
  if (!username) {
    throw new Error("User has no username");
  }

  if (!roomId) {
    throw new Error("User doesn't try to join any room");
  }

  const room = getOrCreateRoom(roomId);
  const user = createUser(userId, username);
  joinUser(room.id, user);
};

const registerNewMessage = (
  userId: User["id"],
  messageContent: Message["content"]
) => {
  const user = getUser(userId);
  const room = getUserRoom(user.id);

  const message = {
    content: messageContent,
    username: user.username,
  };

  room.messages.push(message);
  return message;
};

const retrieveRoomMessages = (userId: User["id"]): Message[] => {
  const user = getUser(userId);
  const room = getUserRoom(user.id);

  return room.messages;
};

const disconnectUser = (userId: User["id"]) => {
  deleteUserRoom(userId);
  deleteUser(userId);
};

export { authorize, registerNewMessage, retrieveRoomMessages, disconnectUser };
