import type { Message, Room, User } from "../types";
import { rooms, userRoomMap } from "./storage";

const getOrCreateRoom = (id: Room["id"]): Room => {
  if (rooms.has(id)) {
    return rooms.get(id) as Room;
  }

  const room: Room = {
    id,
    messages: [],
  };

  rooms.set(id, room);
  return room;
};

const deleteRoom = (id: Room["id"]): Boolean => {
  return rooms.delete(id);
};

const getRoomMessages = (id: Room["id"]): Message[] => {
  if (!rooms.has(id)) {
    throw new Error(`Room with id [${id}] doesn't exist`);
  }

  return rooms.get(id)!.messages;
};

const getUserRoom = (userId: User["id"]): Room => {
  if (!userRoomMap.has(userId)) {
    throw new Error(`This user didn't join any room [${userId}]`);
  }

  const roomId = userRoomMap.get(userId) as string;
  return rooms.get(roomId) as Room;
};

const deleteUserRoom = (userId: User["id"]) => {
  const roomId = userRoomMap.get(userId) as string;
  deleteRoom(roomId);
  userRoomMap.delete(userId);
};

const getRoomUserIds = (roomId: Room["id"]) => {
  return userRoomMap
    .keys()
    .filter((userId) => userRoomMap.get(userId) === roomId);
};

const joinUser = (roomId: Room["id"], user: User) => {
  if (!rooms.has(roomId)) {
    throw new Error(`Room with id [${roomId}] doesn't exist`);
  }

  userRoomMap.set(user.id, roomId);
};

export {
  getOrCreateRoom,
  deleteUserRoom,
  getUserRoom,
  deleteRoom,
  getRoomMessages,
  joinUser,
  getRoomUserIds,
};
