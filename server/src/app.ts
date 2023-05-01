import { Socket, Server } from "socket.io";
import { logger } from "./utils/logger";
import { EventNames } from "./messages/events";
import { OutgoingMessageData, AuthorizationData } from "./types/event-data";
import {
  authorize,
  disconnectUser,
  registerNewMessage,
} from "./services/communication";
import { getRoomMessages, getUserRoom } from "./services/rooms";

const disconnectDueToError = (socket: Socket, errorMessage?: string) => {
  if (errorMessage) {
    logger.error(errorMessage);
  }

  logger.info(`Socket disconnected: ${socket.id}`);

  socket.emit(EventNames.error, errorMessage);
};

const handleConnection = (socket: Socket, data: AuthorizationData) => {
  logger.info(`User authorizing: ${socket.id}`);

  const { username, roomId } = data;

  try {
    authorize(socket.id, username, roomId);
    const messages = getRoomMessages(roomId);

    socket.join(roomId);
    socket.emit(EventNames.authorization, { username, roomId });

    socket.emit(EventNames.messagesStatus, messages);
    logger.info(`User authorized: ${socket.id}`);
  } catch (e) {
    const error = e as Error;
    disconnectDueToError(socket, error.message);
  }
};

const handleOutgoingMessage = (socket: Socket, data: OutgoingMessageData) => {
  logger.info(`Incoming message from: ${socket.id}`);

  try {
    const message = registerNewMessage(socket.id, data.content);
    const room = getUserRoom(socket.id);

    socket.emit(EventNames.ownIncomingMessage, message);
    socket.to(room.id).emit(EventNames.incomingMessage, message);
  } catch (e) {
    const error = e as Error;
    disconnectDueToError(socket, error.message);
  }
};

const handleDisconnection = (socket: Socket) => {
  logger.info(`Socket connection closed: ${socket.id}`);
  disconnectUser(socket.id);
};

const handleLogout = (socket: Socket) => {
  logger.info(`User logout: ${socket.id}`);
  disconnectUser(socket.id);
};

const connect = (socket: Socket) => {
  logger.info(`New socket connection was created: ${socket.id}`);

  socket.on(EventNames.authorization, handleConnection.bind(null, socket));

  socket.on(
    EventNames.outgoingMessage,
    handleOutgoingMessage.bind(null, socket)
  );

  socket.on(EventNames.logout, handleLogout.bind(null, socket));
  socket.on(EventNames.disconnection, handleDisconnection.bind(null, socket));
};

const run = (io: Server) => {
  io.on(EventNames.connection, connect);
};

export { run };
